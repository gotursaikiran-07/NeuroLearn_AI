import type { Subject } from '../types/learning';

export interface TopicInfo {
  id: string;
  name: string;
  description: string;
  iconName: string;
  concepts: {
    id: string;
    name: string;
    description: string;
  }[];
}

export interface SubjectInfo {
  name: Subject;
  description: string;
  iconName: string;
  topics: TopicInfo[];
}

export const SUBJECTS_DATA: SubjectInfo[] = [
  {
    name: 'Computer Science',
    description: 'Master core computer science algorithms, database systems, AI, and systems architecture.',
    iconName: 'Code',
    topics: [
      {
        id: 'dbms-sql-joins',
        name: 'DBMS & SQL JOINs',
        description: 'Understand relational database concepts, primary keys, and table join mechanics.',
        iconName: 'Database',
        concepts: [
          { id: 'relational-basics', name: 'Relational Model & Keys', description: 'Tables, Primary Keys, and Foreign Keys.' },
          { id: 'inner-join', name: 'INNER JOIN Operations', description: 'Matching rows across multi-table queries.' },
          { id: 'left-right-join', name: 'LEFT & RIGHT JOINs', description: 'Preserving unmatched rows from left or right tables.' },
          { id: 'full-outer-join', name: 'FULL OUTER & CROSS JOINs', description: 'Complete cartesian products and full row preservation.' },
          { id: 'join-performance', name: 'Query Optimization & Indexing', description: 'How indexes impact join performance and query plans.' },
        ],
      },
      {
        id: 'dsa-trees',
        name: 'Data Structures & Algorithms',
        description: 'Learn arrays, linked lists, binary search trees, and algorithm optimization.',
        iconName: 'GitBranch',
        concepts: [
          { id: 'array-basics', name: 'Array Operations & Big-O', description: 'Memory layout, indexing, and runtime complexity.' },
          { id: 'binary-trees', name: 'Binary Trees & Traversals', description: 'In-order, Pre-order, and Post-order tree traversals.' },
          { id: 'bst-search', name: 'Binary Search Trees (BST)', description: 'Insertion, deletion, and log(N) searching.' },
          { id: 'graph-bfs-dfs', name: 'Graph Traversal (BFS & DFS)', description: 'Breadth-first search and depth-first search algorithms.' },
        ],
      },
      {
        id: 'gen-ai-llms',
        name: 'Generative AI & LLMs',
        description: 'Understand transformers, embeddings, prompt engineering, and RAG architectures.',
        iconName: 'Cpu',
        concepts: [
          { id: 'embeddings', name: 'Vector Embeddings', description: 'Representing words and semantic meaning in vector space.' },
          { id: 'attention', name: 'Self-Attention Mechanism', description: 'How transformer architectures weight relationships between tokens.' },
          { id: 'rag-basics', name: 'Retrieval-Augmented Generation', description: 'Connecting LLMs to external vector store knowledge bases.' },
        ],
      },
      {
        id: 'os-concurrency',
        name: 'Operating Systems',
        description: 'Process management, virtual memory, threads, and concurrency control.',
        iconName: 'Terminal',
        concepts: [
          { id: 'process-threads', name: 'Processes vs Threads', description: 'Memory space, context switching, and execution units.' },
          { id: 'deadlocks', name: 'Deadlocks & Synchronization', description: 'Mutexes, semaphores, and avoiding resource deadlocks.' },
        ],
      },
      {
        id: 'networks-tcp',
        name: 'Computer Networks',
        description: 'OSI model, TCP/IP stack, DNS, HTTP/3, and routing protocols.',
        iconName: 'Network',
        concepts: [
          { id: 'tcp-handshake', name: 'TCP 3-Way Handshake', description: 'Connection establishment, SYN, SYN-ACK, ACK.' },
          { id: 'http-status', name: 'HTTP Protocol & REST', description: 'Stateless communication, request methods, and response codes.' },
        ],
      },
      {
        id: 'ml-basics',
        name: 'Machine Learning',
        description: 'Supervised vs unsupervised learning, regression, classification, and model evaluation.',
        iconName: 'Brain',
        concepts: [
          { id: 'linear-reg', name: 'Linear & Logistic Regression', description: 'Gradient descent, cost functions, and decision boundaries.' },
          { id: 'overfitting', name: 'Overfitting & Regularization', description: 'Bias-variance tradeoff, L1/L2 regularization.' },
        ],
      }
    ],
  },
  {
    name: 'Mathematics',
    description: 'Explore linear algebra, calculus, discrete math, and probability.',
    iconName: 'Calculator',
    topics: [
      {
        id: 'math-calculus',
        name: 'Calculus & Derivatives',
        description: 'Rates of change, differentiation rules, and real-world optimization.',
        iconName: 'TrendingUp',
        concepts: [
          { id: 'limits-concept', name: 'Limits & Continuity', description: 'Understanding approaching values and continuous functions.' },
          { id: 'derivatives-power', name: 'Power Rule & Chain Rule', description: 'Differentiating polynomial and composite functions.' },
        ],
      }
    ]
  },
  {
    name: 'Physics',
    description: 'Understand mechanics, thermodynamics, electromagnetism, and quantum principles.',
    iconName: 'Zap',
    topics: [
      {
        id: 'physics-mechanics',
        name: 'Classical Mechanics',
        description: 'Newton\'s laws of motion, work, energy, and momentum conservation.',
        iconName: 'Compass',
        concepts: [
          { id: 'newton-laws', name: 'Newton\'s Laws of Motion', description: 'Inertia, F=ma, and action-reaction pairs.' },
        ]
      }
    ]
  },
  {
    name: 'Biology',
    description: 'Cell biology, genetics, molecular structures, and evolutionary systems.',
    iconName: 'Dna',
    topics: [
      {
        id: 'bio-genetics',
        name: 'Cell Biology & Genetics',
        description: 'DNA replication, RNA transcription, and Mendelian genetics.',
        iconName: 'Activity',
        concepts: [
          { id: 'dna-structure', name: 'DNA Structure & Replication', description: 'Double helix, base pairing, and DNA polymerase.' }
        ]
      }
    ]
  },
  {
    name: 'English',
    description: 'Grammar mastery, rhetoric, critical reading, and persuasive writing.',
    iconName: 'BookOpen',
    topics: [
      {
        id: 'english-rhetoric',
        name: 'Rhetoric & Essay Structure',
        description: 'Thesis construction, persuasive arguments, and analytical synthesis.',
        iconName: 'PenTool',
        concepts: [
          { id: 'thesis-building', name: 'Formulating Strong Thesis Statements', description: 'Creating clear, arguable claims for analytical essays.' }
        ]
      }
    ]
  }
];
