import type { ConceptMastery, GapStatus, StudyPlanItem } from '../types/learning';

export function calculateMasteryScore(
  attempted: number,
  correct: number,
  prevScore: number = 0
): { score: number; status: GapStatus; confidence: 'Low' | 'Medium' | 'High' } {
  if (attempted === 0) {
    return { score: 0, status: 'Needs Attention', confidence: 'Low' };
  }

  const accuracy = (correct / attempted) * 100;
  // Combine historical score with current session accuracy
  const weightedScore = Math.round(prevScore * 0.3 + accuracy * 0.7);

  let status: GapStatus = 'Needs Attention';
  if (weightedScore >= 85) status = 'Mastered';
  else if (weightedScore >= 70) status = 'Strong';
  else if (weightedScore >= 50) status = 'Improving';
  else status = 'Needs Attention';

  let confidence: 'Low' | 'Medium' | 'High' = 'Low';
  if (attempted >= 5) confidence = 'High';
  else if (attempted >= 2) confidence = 'Medium';

  return { score: weightedScore, status, confidence };
}

export function generateRecommendedAction(
  conceptName: string,
  status: GapStatus,
  misconceptionTriggered?: string
): string {
  if (misconceptionTriggered) {
    return `Misconception detected: ${misconceptionTriggered}. Study targeted worked example.`;
  }

  switch (status) {
    case 'Needs Attention':
      return `Revisit core concept explanation for ${conceptName} and try 3 beginner practice questions.`;
    case 'Improving':
      return `Solid progress on ${conceptName}. Take a medium-difficulty challenge to solidify understanding.`;
    case 'Strong':
      return `Strong performance! Practice real-world interview scenarios for ${conceptName}.`;
    case 'Mastered':
      return `Concept mastered! Proceed to next prerequisite topic or assist peers.`;
  }
}

export function updateStudyPlanFromGaps(
  currentPlan: StudyPlanItem[],
  gaps: Record<string, ConceptMastery>
): StudyPlanItem[] {
  const weakConcepts = Object.values(gaps).filter(
    (g) => g.status === 'Needs Attention' || g.status === 'Improving'
  );

  if (weakConcepts.length === 0) return currentPlan;

  return currentPlan.map((item) => {
    const matchingGap = weakConcepts.find((g) => g.conceptId === item.conceptId);
    if (matchingGap && !item.completed) {
      return {
        ...item,
        reason: `Dynamically adapted because ${matchingGap.conceptName} is currently marked as '${matchingGap.status}' (${matchingGap.accuracy}% accuracy).`
      };
    }
    return item;
  });
}
