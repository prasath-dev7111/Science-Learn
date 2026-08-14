# 🔬 SciLearn v2.0 — Interactive Science Learning Platform

A fully upgraded, production-ready science learning platform built with **React**, **Node.js**, and **MongoDB**.

---

## ✨ What's New in v2.0

### 🎨 UI/UX Overhaul
- Beautiful dark/light theme with a premium design system
- Smooth animations and transitions throughout
- Responsive on all screen sizes
- Custom fonts (Playfair Display + Outfit)

### 📚 Learning Features
- **20 Topics** across Physics, Chemistry & Biology
- **Detailed content** with key points and formulas for every topic
- **YouTube video lessons** embedded on every topic
- **Interactive Flashcards** — flip-card style (5 cards per topic)
- **Personal Notes** — write, save, and delete notes per topic
- **Bookmarks** — save topics for later review
- **Mark as Done** — track your completion

### 📝 Enhanced Quiz System
- **Full quiz coverage** — every topic has 3–5 questions
- **20-second countdown timer** per question
- **Instant feedback** — correct/wrong highlighted immediately
- **Explanations** — every answer has an explanation
- **Score review** — see all answers after completion
- **Retry quiz** option

### 🏆 Gamification
- **XP Points** — earn XP for completing topics, quizzes, and notes
- **5 Levels** — Curious Learner → Science Master
- **Progress tracking** — visual charts per subject

### 🔐 Upgraded Backend
- **JWT Authentication** — secure token-based auth
- **bcrypt password hashing** — passwords are never stored in plain text
- **Demo account** — try without registering
- **Progress saved** to MongoDB (with localStorage fallback)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

```bash
# 1. Install all dependencies
cd "science learn web"
npm run install-all

# OR manually:
cd Server && npm install
cd ../client && npm install
```

### Running the App

```bash
# Terminal 1 — Start the backend server
cd Server
npm run dev
# Server runs on http://localhost:5000

# Terminal 2 — Start the React frontend
cd client
npm start
# App opens at http://localhost:3000
```

### Environment Setup (optional)

```bash
cd Server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

---

## 📁 Project Structure

```
science-learn-web/
├── client/                     # React frontend
│   ├── src/
│   │   ├── App.js              # Root app with routing
│   │   ├── index.css           # Design system & global styles
│   │   ├── context/
│   │   │   └── AppContext.jsx  # Global state (auth, progress, notes, XP)
│   │   ├── data/
│   │   │   └── scienceData.js  # All topic content, flashcards, quiz data
│   │   ├── components/
│   │   │   └── Navbar.jsx      # Navbar with XP display & theme toggle
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Landing page with subject cards
│   │   │   ├── Auth.jsx        # Login & Register pages
│   │   │   ├── Dashboard.jsx   # User dashboard with stats
│   │   │   ├── Subject.jsx     # Topic listing with progress
│   │   │   ├── TopicDetail.jsx # Learn + Flashcards + Notes tabs
│   │   │   ├── Quiz.jsx        # Timer quiz with feedback
│   │   │   └── Progress.jsx    # Full progress overview
│   │   └── services/
│   │       └── api.jsx         # Axios API client
│   └── package.json
│
└── Server/                     # Node.js backend
    ├── index.js                # Express server entry point
    ├── models/
    │   └── User.js             # User schema with bcrypt
    ├── routes/
    │   └── auth.js             # Auth + progress API routes
    ├── middleware/
    │   └── auth.js             # JWT auth middleware
    ├── .env.example            # Environment variables template
    └── package.json
```

---

## 🔐 Demo Account

Use these credentials to try the app without registering:
- **Email:** `demo@scilearn.com`
- **Password:** `demo123`

---

## 📊 Subjects & Topics

### ⚡ Physics (7 topics)
Motion, Force, Energy, Work, Gravity, Waves, Electricity

### 🧪 Chemistry (6 topics)
Atoms, Molecules, Periodic Table, Chemical Reactions, Acids & Bases, Organic Chemistry

### 🧬 Biology (6 topics — wait, 6 in original, upgraded to full set)
Cells, Human Body, Plants, Genetics, Evolution, Digestive System

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6 |
| Styling | Custom CSS with CSS Variables |
| State | React Context API + localStorage |
| Backend | Node.js, Express 4 |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Fonts | Google Fonts (Playfair Display, Outfit) |

---

## 🌟 Features Summary

| Feature | Status |
|---------|--------|
| 3 Science Subjects | ✅ |
| 20 Topics with full content | ✅ |
| YouTube video per topic | ✅ |
| Flashcard system | ✅ |
| Quiz with timer & explanations | ✅ |
| Personal notes | ✅ |
| Bookmarks | ✅ |
| Progress tracking | ✅ |
| XP & Level system | ✅ |
| Dark/Light theme | ✅ |
| JWT Auth + bcrypt | ✅ |
| Demo account | ✅ |
| Responsive design | ✅ |
| Protected routes | ✅ |
