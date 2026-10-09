import type { Question } from '../types/learning';

export const SAMPLE_QUESTIONS: Question[] = [
  // --- DBMS & SQL JOINs ---
  {
    id: 'diag-sql-1',
    topicId: 'dbms-sql-joins',
    conceptId: 'relational-basics',
    conceptName: 'Primary Keys & Foreign Keys',
    questionText: 'What is the main purpose of a Foreign Key in a relational database?',
    options: [
      'To uniquely identify each record in its own table',
      'To establish a link between data in two tables by referencing a Primary Key',
      'To encrypt sensitive columns stored in the database',
      'To automatically speed up SELECT queries without indexing'
    ],
    correctAnswerIndex: 1,
    explanation: 'A Foreign Key points to a Primary Key in another table, enforcing referential integrity and linking related records.',
    misconceptionMap: {
      0: 'Identifying unique records within its own table is the role of a Primary Key, not a Foreign Key.',
      2: 'Foreign keys relate tables; they do not perform data encryption.',
      3: 'While indexes help performance, foreign keys primarily maintain relational integrity between tables.'
    },
    difficulty: 'Easy',
    hint: 'Think about how two different tables connect to each other.'
  },
  {
    id: 'diag-sql-2',
    topicId: 'dbms-sql-joins',
    conceptId: 'left-right-join',
    conceptName: 'LEFT JOIN Mechanics',
    questionText: 'If a student has not registered for any courses, what will appear in the `CourseName` column when running `SELECT Students.Name, Courses.CourseName FROM Students LEFT JOIN Courses ON Students.ID = Courses.StudentID`?',
    options: [
      'An empty string ""',
      'The row will be completely excluded from the result',
      'NULL',
      'An error message: "Unmatched Foreign Key"'
    ],
    correctAnswerIndex: 2,
    explanation: 'In SQL, when a LEFT JOIN finds no matching record in the right table, it populates all right-table columns with NULL.',
    misconceptionMap: {
      0: 'SQL uses `NULL` to signify missing or unknown relational values, not an empty string.',
      1: 'Excluding unmatched rows is what INNER JOIN does! LEFT JOIN preserves the left-side student row regardless.',
      3: 'SQL handles unmatched rows gracefully by returning NULL, not by throwing an error.'
    },
    difficulty: 'Easy',
    hint: 'How does SQL represent missing data in joined tables?'
  },
  {
    id: 'diag-sql-3',
    topicId: 'dbms-sql-joins',
    conceptId: 'inner-join',
    conceptName: 'INNER JOIN Filtering',
    questionText: 'Consider Table X (3 rows) and Table Y (4 rows). If ONLY 2 records have matching IDs between X and Y, how many rows will `SELECT * FROM X INNER JOIN Y ON X.id = Y.id` return?',
    options: [
      '2 rows',
      '3 rows',
      '4 rows',
      '7 rows'
    ],
    correctAnswerIndex: 0,
    explanation: 'INNER JOIN returns strictly the matching rows between both tables. Since only 2 records match, exactly 2 rows are returned.',
    misconceptionMap: {
      1: '3 is the total rows in Table X, but INNER JOIN filters out unmatched rows.',
      2: '4 is the total rows in Table Y, but unmatched rows are omitted in INNER JOIN.',
      3: '7 is 3 + 4, which is how UNION ALL operates, not INNER JOIN.'
    },
    difficulty: 'Medium',
    hint: 'INNER JOIN only keeps rows where the matching condition is TRUE for both sides.'
  },
  {
    id: 'diag-sql-4',
    topicId: 'dbms-sql-joins',
    conceptId: 'full-outer-join',
    conceptName: 'FULL OUTER JOIN vs UNION',
    questionText: 'Which SQL statement retrieves ALL records from both Table A and Table B, matching rows where possible and inserting NULLs where unmatched?',
    options: [
      'SELECT * FROM TableA CROSS JOIN TableB',
      'SELECT * FROM TableA FULL OUTER JOIN TableB ON TableA.id = TableB.id',
      'SELECT * FROM TableA INNER JOIN TableB ON TableA.id = TableB.id',
      'SELECT * FROM TableA WHERE TableA.id = TableB.id'
    ],
    correctAnswerIndex: 1,
    explanation: 'FULL OUTER JOIN combines the behavior of LEFT JOIN and RIGHT JOIN, preserving all records from both tables.',
    misconceptionMap: {
      0: 'CROSS JOIN produces a Cartesian product (every row paired with every row) without checking matching keys.',
      2: 'INNER JOIN discards unmatched records from both tables.',
      3: 'Syntax error: referencing TableB in WHERE without specifying a FROM/JOIN clause.'
    },
    difficulty: 'Medium',
    hint: 'Look for the join type that combines both Left and Right outer join behaviors.'
  },
  {
    id: 'diag-sql-5',
    topicId: 'dbms-sql-joins',
    conceptId: 'join-performance',
    conceptName: 'WHERE Clause Predicate Pushdown Misconception',
    questionText: 'Why can adding `WHERE TableB.status = \'active\'` convert a `LEFT JOIN TableB` into an effective `INNER JOIN`?',
    options: [
      'Because SQL query engines automatically replace LEFT JOIN keywords with INNER JOIN for speed.',
      'Because unmatched rows produce NULL for TableB, and `NULL = \'active\'` evaluates to FALSE, filtering out those left rows!',
      'Because WHERE clauses can only be written before JOIN clauses.',
      'Because status columns cannot be filtered in relational databases.'
    ],
    correctAnswerIndex: 1,
    explanation: 'When TableB is unmatched, its columns are NULL. A WHERE filter requiring `TableB.status = \'active\'` evaluates to FALSE for NULLs, effectively dropping the unmatched left rows!',
    misconceptionMap: {
      0: 'The engine does not rewrite keywords arbitrarily; it evaluates predicates according to SQL standard logic rules.',
      2: 'JOIN clauses always come before WHERE clauses in standard SQL syntax.',
      3: 'Status columns can easily be filtered; the key is understanding how NULL comparison works.'
    },
    difficulty: 'Hard',
    hint: 'What happens when you test if a NULL value equals a string in SQL?'
  },

  // --- DSA Binary Trees ---
  {
    id: 'prac-dsa-1',
    topicId: 'dsa-trees',
    conceptId: 'binary-trees',
    conceptName: 'Tree Traversals',
    questionText: 'In an In-Order traversal of a Binary Search Tree (BST), in what order are node values visited?',
    options: [
      'Root, Left, Right',
      'Left, Root, Right (Sorted ascending order)',
      'Left, Right, Root',
      'Random order depending on memory allocation'
    ],
    correctAnswerIndex: 1,
    explanation: 'In-Order traversal visits Left subtree -> Root -> Right subtree. For a valid BST, this yields all values in sorted ascending order.',
    misconceptionMap: {
      0: 'Root -> Left -> Right is Pre-Order traversal.',
      2: 'Left -> Right -> Root is Post-Order traversal.',
      3: 'BST traversals are strictly deterministic based on tree structure.'
    },
    difficulty: 'Easy',
    hint: 'In-order means "in ascending numerical order" for a BST.'
  },

  // --- Generative AI ---
  {
    id: 'prac-genai-1',
    topicId: 'gen-ai-llms',
    conceptId: 'embeddings',
    conceptName: 'Vector Embeddings',
    questionText: 'How do vector embeddings capture semantic relationship between two words (e.g., "king" and "queen")?',
    options: [
      'By counting the number of letters in each word',
      'By calculating cosine similarity between high-dimensional vector representations',
      'By storing both words in an ASCII alphabetized array',
      'By running a SQL INNER JOIN query on a dictionary table'
    ],
    correctAnswerIndex: 1,
    explanation: 'Embeddings map words to vectors in high-dimensional space where semantically similar words have a smaller angle (higher cosine similarity).',
    misconceptionMap: {
      0: 'Letter count does not capture semantic meaning (e.g. "cat" vs "dog").',
      2: 'Alphabetical sorting tracks spelling, not semantic context.',
      3: 'SQL joins match exact keys, not numerical vector distances.'
    },
    difficulty: 'Medium',
    hint: 'Think about directional arrows and geometric angles in multi-dimensional vector space.'
  }
];
