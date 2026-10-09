
export interface AIResponse {
  text: string;
  isLive: boolean;
  source: 'gemini-live' | 'expert-demo-engine';
}

export async function askLearnovaAI(
  prompt: string,
  systemContext: string,
  apiKey?: string,
  syllabusText?: string
): Promise<AIResponse> {
  const syllabusSection = syllabusText && syllabusText.trim().length > 0
    ? `\n\nUser-pasted syllabus / course outline:\n${syllabusText.trim()}`
    : '';

  // If API key exists, call Gemini REST API securely
  if (apiKey && apiKey.trim().length > 0) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: `${systemContext}${syllabusSection}\n\nUser Question/Prompt: ${prompt}` }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (generatedText) {
          return {
            text: generatedText,
            isLive: true,
            source: 'gemini-live'
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to Expert Demo Engine:', err);
    }
  }

  // Deterministic Expert AI Fallback for Hackathon Demo Mode
  return {
    text: getExpertDemoResponse(prompt, systemContext, syllabusText),
    isLive: false,
    source: 'expert-demo-engine'
  };
}

function getExpertDemoResponse(prompt: string, context: string, syllabusText?: string): string {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('left join') || lowerPrompt.includes('null') || lowerPrompt.includes('unmatched')) {
    return `### Learnova AI Explanation (DBMS: SQL LEFT JOIN Mechanics)

**Key Insight:** A \`LEFT JOIN\` ensures no record from your primary (left) table is lost.

Imagine two spreadsheets: **Students** (ID, Name) and **Course Enrollments** (StudentID, CourseName).

1. When student *Alex* (ID: 101) has registered for "Computer Networks", the LEFT JOIN matches ID 101 and shows:
   \`Alex | Computer Networks\`
2. When student *Sam* (ID: 102) has **not** registered for any course yet, the LEFT JOIN retains Sam and inserts \`NULL\`:
   \`Sam | NULL\`

> **Why this matters for your learning goal:** In technical interviews, interviewers love testing whether you understand that \`LEFT JOIN\` returns NULLs for missing right-table values, whereas \`INNER JOIN\` silently discards Sam entirely!`;
  }

  if (lowerPrompt.includes('inner join') || lowerPrompt.includes('match')) {
    return `### Learnova AI Explanation (DBMS: INNER JOIN Logic)

An **INNER JOIN** operates like a strict filter. It only outputs rows where the matching condition (\`ON TableA.key = TableB.key\`) is **TRUE** for both tables.

- If Table A has 10 students and Table B has 4 grade records for matching IDs, the INNER JOIN outputs exactly **4 rows**.
- Unmatched students and unassigned grades are completely omitted from the final query result.`;
  }

  if (lowerPrompt.includes('difference') || lowerPrompt.includes('vs')) {
    return `### Quick Comparison: INNER vs LEFT JOIN

| Feature | INNER JOIN | LEFT JOIN |
| :--- | :--- | :--- |
| **Unmatched Rows** | Omitted completely | Preserved from Left table with \`NULL\` |
| **Result Size** | Always \`<= Min(RowsA, RowsB)\` | Always \`>= Rows in Left Table\` |
| **Use Case** | Strict filtering | Reporting with complete master records |`;
  }

  if (syllabusText && syllabusText.trim().length > 0) {
    return `### Learnova AI Explanation from your pasted syllabus

I can explain the topic based on the syllabus you pasted:

**Your syllabus content:**\n${syllabusText.trim().slice(0, 500)}${syllabusText.trim().length > 500 ? '...' : ''}

**How to understand it:**
- Start with the core concept behind each unit or chapter.
- Map the terms to a simple real-world example.
- Identify the main skill the syllabus expects you to master.
- Explain the topic in layers: definition, example, and common mistakes.

**Suggested explanation prompt:**\n"Explain the most important topic in this syllabus in simple language with a real-world example and a short summary."`;
  }

  return `### Learnova AI Guidance

Based on your context in **${context.split('\n')[0] || 'your current lesson'}**:

- **Step 1:** Break the concept into its fundamental primitives (Keys, Predicates, and Tables).
- **Step 2:** Test the concept with a small 2-row mental spreadsheet.
- **Step 3:** Watch out for common edge cases like \`NULL\` comparisons in \`WHERE\` clauses!

*Feel free to click "Explain It Another Way" or ask a specific follow-up question!*`;
}
