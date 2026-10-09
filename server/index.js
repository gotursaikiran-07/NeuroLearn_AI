import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;
const DB_FILE = path.join(__dirname, 'learnova_db.json');

// Initialize database file if it doesn't exist
function initDb() {
  if (!fs.existsSync(DB_FILE)) {
    const initialDb = {
      users: [
        {
          id: 'user-demo-1',
          email: 'alex.rivera@learnova.ai',
          passwordHash: 'demo123',
          name: 'Alex Rivera',
          role: 'Computer Science Student',
          subject: 'Computer Science',
          topic: 'DBMS & SQL JOINs',
          proficiency: 'Beginner',
          goal: 'Prepare for interviews',
          explanationStyle: 'Story-based explanations',
          sessionDuration: 15,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          masteryScore: 65,
          streakDays: 3,
          totalQuestionsAnswered: 5,
          totalCorrectAnswers: 2,
          totalSessionsCompleted: 4,
          conceptMasteryMap: {
            'relational-basics': {
              conceptId: 'relational-basics',
              conceptName: 'Relational Model & Keys',
              questionsAttempted: 1,
              correctCount: 1,
              accuracy: 100,
              masteryScore: 85,
              status: 'Strong'
            },
            'left-right-join': {
              conceptId: 'left-right-join',
              conceptName: 'LEFT & RIGHT JOINs',
              questionsAttempted: 2,
              correctCount: 0,
              accuracy: 0,
              masteryScore: 35,
              status: 'Needs Attention'
            }
          }
        },
        {
          id: 'user-demo-2',
          email: 'priya.sharma@learnova.ai',
          passwordHash: 'demo123',
          name: 'Priya Sharma',
          role: 'Data Science Specialist',
          subject: 'Computer Science',
          topic: 'Advanced SQL & Indexing',
          proficiency: 'Intermediate',
          goal: 'Improve problem-solving',
          explanationStyle: 'Step-by-step technical explanations',
          sessionDuration: 25,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          masteryScore: 82,
          streakDays: 7,
          totalQuestionsAnswered: 18,
          totalCorrectAnswers: 15,
          totalSessionsCompleted: 9,
          conceptMasteryMap: {}
        }
      ],
      logs: []
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2));
    console.log(`[Learnova DB] Created initial database file at ${DB_FILE}`);
  }
}

function readDb() {
  initDb();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[Learnova DB] Read error:', err);
    return { users: [], logs: [] };
  }
}

function writeDb(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
    return true;
  } catch (err) {
    console.error('[Learnova DB] Write error:', err);
    return false;
  }
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });

  req.on('end', async () => {
    let parsedBody = {};
    if (body) {
      try {
        parsedBody = JSON.parse(body);
      } catch (e) {
        // Ignore non-json body
      }
    }

    // Router
    if (pathname === '/api/health' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', service: 'Learnova DB Backend API', timestamp: new Date() }));
      return;
    }

    if (pathname === '/api/resources/youtube' && req.method === 'GET') {
      const query = (url.searchParams.get('q') || '').trim().slice(0, 120);
      if (!query) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'A search query is required' }));
        return;
      }

      if (!process.env.YOUTUBE_API_KEY) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, configured: false, items: [] }));
        return;
      }

      try {
        const youtubeUrl = new URL('https://www.googleapis.com/youtube/v3/search');
        youtubeUrl.search = new URLSearchParams({
          part: 'snippet',
          type: 'video',
          maxResults: '5',
          q: query,
          key: process.env.YOUTUBE_API_KEY
        }).toString();

        const youtubeResponse = await fetch(youtubeUrl);
        if (!youtubeResponse.ok) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, message: 'YouTube search is temporarily unavailable' }));
          return;
        }

        const youtubeData = await youtubeResponse.json();
        const items = (youtubeData.items || [])
          .filter((item) => item.id?.videoId)
          .map((item) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            channelTitle: item.snippet.channelTitle,
            thumbnailUrl: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url
          }));

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, configured: true, items }));
      } catch (error) {
        res.writeHead(502, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'YouTube search is temporarily unavailable' }));
      }
      return;
    }

    // User Registration
    if (pathname === '/api/auth/register' && req.method === 'POST') {
      const db = readDb();
      const { email, password, name, subject, goal } = parsedBody;

      if (!email || !name) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Email and Name are required' }));
        return;
      }

      const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'An account with this email already exists' }));
        return;
      }

      const newUser = {
        id: `user-${Date.now()}`,
        email: email.toLowerCase(),
        passwordHash: password || 'default123',
        name,
        role: goal || 'Learner',
        subject: subject || 'Computer Science',
        topic: 'DBMS & SQL JOINs',
        proficiency: 'Beginner',
        goal: goal || 'Understand fundamentals',
        explanationStyle: 'Simple language with real-world examples',
        sessionDuration: 15,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        masteryScore: 0,
        streakDays: 1,
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
        totalSessionsCompleted: 0,
        conceptMasteryMap: {}
      };

      db.users.push(newUser);
      writeDb(db);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Account registered successfully in database',
        user: newUser
      }));
      return;
    }

    // User Login
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const db = readDb();
      const { email, password } = parsedBody;

      const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
      if (!user) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'Invalid email or password' }));
        return;
      }

      // Update last login timestamp
      user.lastLoginAt = new Date().toISOString();
      writeDb(db);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Login successful',
        user
      }));
      return;
    }

    // List Registered Users (Database Inspection)
    if (pathname === '/api/users' && req.method === 'GET') {
      const db = readDb();
      const safeUsers = db.users.map(({ passwordHash, ...u }) => u);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, count: safeUsers.length, users: safeUsers }));
      return;
    }

    // Save/Sync User Progress
    if (pathname === '/api/user/progress' && req.method === 'PUT') {
      const db = readDb();
      const { email, profile } = parsedBody;

      const userIndex = db.users.findIndex(u => u.email.toLowerCase() === (email || '').toLowerCase());
      if (userIndex !== -1) {
        db.users[userIndex] = {
          ...db.users[userIndex],
          ...profile,
          lastLoginAt: new Date().toISOString()
        };
        writeDb(db);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Progress saved to database', user: db.users[userIndex] }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'User record not found in database' }));
      }
      return;
    }

    // 404 Route
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'API Endpoint Not Found' }));
  });
});

initDb();
server.listen(PORT, () => {
  console.log(`[Learnova DB Server] Database server listening on http://localhost:${PORT}`);
});
