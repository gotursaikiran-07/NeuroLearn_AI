import type { Lesson } from '../types/learning';

export const SAMPLE_LESSONS: Record<string, Lesson> = {
  'dbms-sql-joins': {
    id: 'lesson-sql-joins',
    topicId: 'dbms-sql-joins',
    conceptId: 'left-right-join',
    title: 'Mastering SQL JOINs: INNER, LEFT, and RIGHT Operations',
    objective: 'Understand how relational databases combine rows from multiple tables using matching key columns, and learn when to use INNER vs LEFT JOIN.',
    prerequisites: ['relational-basics'],
    explanations: {
      'Simple language with real-world examples': {
        introduction: 'Imagine you manage a university campus with two separate spreadsheets: one lists Students (ID, Name) and the other lists Course Enrollments (Student ID, Course Name). A SQL JOIN is like stitching these two spreadsheets side-by-side using the Student ID as the common link!',
        coreConcept: 'SQL JOINs combine columns from one or more tables based on a shared column (usually a Primary Key in one table and a Foreign Key in another). The most common types are INNER JOIN (returns ONLY matching rows from both sides) and LEFT JOIN (returns ALL rows from the left table, plus matches from the right table).',
        analogy: 'Think of a VIP party guest list (Left Table) and a list of people who actually showed up at the venue (Right Table). An INNER JOIN shows only guests who were invited AND showed up. A LEFT JOIN shows EVERY invited guest, showing "NULL" (absent) next to those who did not show up!',
        workedExample: {
          problem: 'You have a Students table and a Grades table. You want a report showing ALL students and their grades if available, without excluding students who have not received grades yet.',
          solution: 'SELECT Students.Name, Grades.Score FROM Students LEFT JOIN Grades ON Students.StudentID = Grades.StudentID;',
          explanation: 'Because we used LEFT JOIN, every student in the Students table appears. If a student has no entry in Grades, the Score column will simply display NULL instead of omitting the student altogether.'
        },
        misconceptions: [
          'Misconception: A LEFT JOIN will delete rows from the right table if they do not match. Reality: LEFT JOIN never alters table data; it only includes NULL values in the query output for unmatched right-table columns.',
          'Misconception: INNER JOIN and LEFT JOIN return the same number of rows. Reality: INNER JOIN drops unmatched rows, so its result set is often smaller.'
        ],
        summary: [
          'JOINs merge rows from two tables using a key column (e.g. StudentID).',
          'INNER JOIN keeps ONLY exact matches on both sides.',
          'LEFT JOIN keeps ALL rows from the left table, filling missing right-side data with NULL.',
          'Always verify the ON condition matches the correct key columns.'
        ]
      },
      'Story-based explanations': {
        introduction: 'Welcome to the Kingdom of Relational Data! In this kingdom, King Relational maintains two legendary scrolls: the Scroll of Citizens (Left Scroll) and the Scroll of Royal Badges (Right Scroll).',
        coreConcept: 'When King Relational wants to host the Grand Banquet, he needs to identify which Citizen holds which Royal Badge. To pair them up, the Royal Scribe performs a "Magic Join Operation" matching the Citizen Seal Number with the Badge Owner Seal.',
        analogy: 'When performing an INNER JOIN, the Scribe only summons citizens who actively hold a badge to the grand hall. But when performing a LEFT JOIN, EVERY citizen enters the hall; those without a badge are handed an empty wooden token marked "NULL".',
        workedExample: {
          problem: 'The King wants to see every Citizen name alongside their Badge Title, ensuring no citizen is forgotten.',
          solution: 'SELECT Citizens.Name, Badges.Title FROM Citizens LEFT JOIN Badges ON Citizens.SealNumber = Badges.OwnerSeal;',
          explanation: 'The LEFT JOIN ensures every citizen from the left scroll is announced. Citizens without badges simply have "NULL" listed under their Badge Title.'
        },
        misconceptions: [
          'Misconception: The order of tables in a LEFT JOIN does not matter. Reality: Swapping the tables completely changes which scroll preserves all its rows!'
        ],
        summary: [
          'Left Table = The Master List (never loses rows in LEFT JOIN).',
          'Right Table = The Optional List (returns NULL when no match exists).',
          'The ON clause is the bridge connecting the two scrolls.'
        ]
      },
      'Step-by-step technical explanations': {
        introduction: 'Relational algebra defines join operations as a Cartesian product followed by a predicate selection. In SQL, engine query planners implement joins using algorithms like Nested Loop Join, Hash Join, or Merge Join.',
        coreConcept: 'An INNER JOIN evaluates predicate condition R.A = S.B for tables R and S, retaining tuples (r, s) where predicate is true. A LEFT OUTER JOIN produces all tuples of INNER JOIN plus tuples r in R that have no matching s in S, padding attributes of S with NULL values.',
        analogy: 'Consider two sorted pointers traversing two arrays. An Inner Join advances both pointers together when values match. A Left Outer Join advances the left pointer continuously, emitting unmatched tuples padded with NULLs when the right pointer trails behind.',
        workedExample: {
          problem: 'Query all customer transactions including customers with 0 transactions using SQL relational syntax.',
          solution: "SELECT c.customer_id, c.name, t.amount FROM customers c LEFT OUTER JOIN transactions t ON c.customer_id = t.customer_id WHERE c.status = 'active';",
          explanation: 'The execution plan scans the filtered index on customers, builds a hash table on customer_id, and probes transactions. Unmatched hash keys output NULL for t.amount.'
        },
        misconceptions: [
          'Filtering in the WHERE clause on a LEFT JOINed table can accidentally convert it into an INNER JOIN if WHERE t.amount > 0 rejects NULLs!'
        ],
        summary: [
          'Algebraic foundation: R ⟕ R.A=S.B S',
          'Query optimization depends on index coverage on foreign key columns.',
          'Watch out for predicate placement in ON vs WHERE clauses.'
        ]
      },
      'Concise revision notes': {
        introduction: 'SQL JOIN Quick Reference Guide for Exam & Interview Prep.',
        coreConcept: 'INNER JOIN = Intersection (Matches only). LEFT JOIN = All Left + Matching Right. RIGHT JOIN = All Right + Matching Left. FULL JOIN = Everything.',
        analogy: 'Venn Diagram: Inner = Middle overlap. Left = Left circle + Middle overlap.',
        workedExample: {
          problem: 'Find unmatched records in Left Table.',
          solution: 'SELECT * FROM TableA a LEFT JOIN TableB b ON a.id = b.id WHERE b.id IS NULL;',
          explanation: 'Filtering WHERE b.id IS NULL isolates records in TableA that have zero corresponding matches in TableB.'
        },
        misconceptions: [
          'ON clause specifies how tables link; WHERE clause filters the result set after linking.'
        ],
        summary: [
          'INNER = overlapping rows only.',
          'LEFT = all left rows, NULL for missing right rows.',
          'IS NULL filter isolates orphaned records.'
        ]
      }
    },
    knowledgeCheck: [
      {
        id: 'q-join-1',
        topicId: 'dbms-sql-joins',
        conceptId: 'left-right-join',
        conceptName: 'LEFT JOIN Operations',
        questionText: 'Given Table A with 5 rows and Table B with 3 matching rows, how many rows will a SELECT * FROM TableA LEFT JOIN TableB ON TableA.id = TableB.id query return?',
        options: ['3 rows', '5 rows', '8 rows', '15 rows'],
        correctAnswerIndex: 1,
        explanation: 'A LEFT JOIN guarantees that ALL rows from the left table (Table A) are returned. Since Table A has 5 rows, the query will return at least 5 rows.',
        misconceptionMap: {
          0: 'You selected 3 rows, which is what an INNER JOIN would return! Remember, LEFT JOIN preserves all 5 rows from the left table even if some do not match.',
          2: 'You added 5 + 3 = 8 rows. A JOIN matches corresponding rows rather than appending tables vertically (which is UNION).',
          3: 'You multiplied 5 * 3 = 15. That would be a CROSS JOIN (Cartesian product) without an ON condition!'
        },
        difficulty: 'Easy',
        hint: 'Think about which table is on the LEFT side of the JOIN keywords.'
      }
    ]
  }
};
