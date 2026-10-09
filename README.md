# Learnova AI — AI Personalized Learning Platform

> **Tagline:** Learn at Your Pace. Grow with Intelligence.

Learnova AI is a venture-grade, AI-powered personalized EdTech web application built to solve the fundamental flaw of modern education: **treating every student identically regardless of their understanding, pace, or learning style.**

---

## 🌟 Hackathon Highlights & Core Capabilities

- ⚡ **Instant Judge Demo Mode:** 1-click execution that immediately preloads a realistic learner scenario (DBMS: SQL JOINs, Beginner Interview Prep) without requiring account creation or API keys.
- 🎨 **Multi-Style Explanation Engine:** Transform any lesson on-the-fly into **Simple Language**, **Story Mode**, **Step-by-Step Technical**, or **Concise Revision Notes**.
- 🔊 **Built-in Text-To-Speech (TTS):** Integrated browser Web Speech API allowing students to listen to explanations with audio playback controls.
- 🎯 **Misconception-Aware Diagnostic Assessment:** Evaluates baseline knowledge, detects precise misunderstandings behind wrong quiz choices, and estimates mastery.
- 🧠 **Adaptive Practice Arena:** Dynamically scales question difficulty (Easy → Medium → Hard) based on consecutive accuracy streaks.
- 📊 **Transparent Knowledge Gap Detector:** Classifies concepts into *Needs Attention*, *Improving*, *Strong*, or *Mastered* with 1-click remediation shortcuts.
- 🛡️ **Responsible & Private AI:** 100% Zero-PII storage in local browser memory, transparent model limitations, and optional live Gemini 1.5/2.0 API connection.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation & Launch

```bash
# 1. Install dependencies
npm install

# 2. Launch the development server
npm run dev
```

Open your browser at `http://localhost:5173`.

---

## 🛠️ Technology Stack

- **Frontend Framework:** React 18 + TypeScript + Vite
- **Styling & UI:** Tailwind CSS v4 + `@tailwindcss/vite` plugin + Custom Glassmorphism System
- **Icons:** Lucide React
- **Analytics & Data Visuals:** Recharts
- **Routing:** React Router DOM (v6)
- **AI Integration:** Dual-mode AI Service (Optional Live Gemini API via REST + Deterministic Expert AI Engine for zero-config offline demo)
- **Audio & Accessibility:** Native Web Speech API

---

## 📖 Recommended Hackathon Demonstration Flow (3-Minute Script)

1. **Step 1: Public Landing Page**
   - Click **"Explore Instant Demo"** or **"Start My Learning Journey"** from the hero section.

2. **Step 2: Onboarding & Diagnostic Quiz**
   - Complete the 5-step wizard (selects DBMS & SQL JOINs, Beginner level, Interview Prep, Story-Based style).
   - Complete the 5 diagnostic questions. Notice how incorrect options trigger specific misconception explanations (e.g. why LEFT JOIN keeps NULLs).

3. **Step 3: AI Learning Studio**
   - View the structured lesson. Click **"Explain It Another Way"** to switch between *Story Mode*, *Explain Simply*, and *Step-by-Step*.
   - Click **"Read Lesson Aloud"** to hear Web Speech TTS.
   - Use the **Ask Learnova AI** right panel to ask follow-up questions.

4. **Step 4: Intelligent Practice Arena**
   - Answer practice questions and observe the adaptive difficulty indicator shift as you maintain correct streaks.

5. **Step 5: Knowledge Gap Detector & Dashboard**
   - Open **"Gaps"** to see concepts tagged *Needs Attention*. Click **"Fix This Gap"** to navigate directly to targeted remediation.
   - Open **"Dashboard"** to see your Recharts mastery trend line and dynamically updated AI recommendations.

---

## 🔐 Environment Variables (Optional Live Gemini API)

Learnova AI works out of the box in **Demo Mode**. To enable live Gemini LLM generations:

1. Click the **Shield Icon** in the top navigation bar to open the **AI Transparency & Privacy** modal.
2. Enter your Gemini API Key (`AIzaSy...`).
3. The platform will automatically switch from `Expert AI Engine` to `Live Gemini AI`.

---

## 📄 License
Created for Hackathon Presentation. All Rights Reserved.
