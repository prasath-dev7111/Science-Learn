import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem("progress")) || {}; }
    catch { return {}; }
  });
  const [quizScores, setQuizScores] = useState(() => {
    try { return JSON.parse(localStorage.getItem("quizScores")) || {}; }
    catch { return {}; }
  });
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem("notes")) || {}; }
    catch { return {}; }
  });
  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("bookmarks")) || []; }
    catch { return []; }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const login = (email) => {
    setUser(email);
    localStorage.setItem("user", email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const markTopicComplete = (subject, topic) => {
    const key = `${subject}-${topic}`;
    const updated = { ...progress, [key]: true };
    setProgress(updated);
    localStorage.setItem("progress", JSON.stringify(updated));
  };

  const saveQuizScore = (subject, topic, score, total) => {
    const key = `${subject}-${topic}`;
    const updated = { ...quizScores, [key]: { score, total, date: new Date().toISOString() } };
    setQuizScores(updated);
    localStorage.setItem("quizScores", JSON.stringify(updated));
    markTopicComplete(subject, topic);
  };

  const saveNote = (subject, topic, noteText) => {
    const key = `${subject}-${topic}`;
    const topicNotes = notes[key] || [];
    const updated = {
      ...notes,
      [key]: [...topicNotes, { text: noteText, date: new Date().toISOString(), id: Date.now() }]
    };
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  };

  const deleteNote = (subject, topic, noteId) => {
    const key = `${subject}-${topic}`;
    const updated = {
      ...notes,
      [key]: (notes[key] || []).filter(n => n.id !== noteId)
    };
    setNotes(updated);
    localStorage.setItem("notes", JSON.stringify(updated));
  };

  const toggleBookmark = (subject, topic) => {
    const key = `${subject}-${topic}`;
    const updated = bookmarks.includes(key)
      ? bookmarks.filter(b => b !== key)
      : [...bookmarks, key];
    setBookmarks(updated);
    localStorage.setItem("bookmarks", JSON.stringify(updated));
  };

  const getTotalProgress = () => {
    const total = 3 * 7; // 3 subjects, avg ~7 topics each -> use actual
    const completed = Object.keys(progress).length;
    return { completed, total: 20, pct: Math.round((completed / 20) * 100) };
  };

  const getXP = () => {
    let xp = 0;
    Object.keys(progress).forEach(() => xp += 10);
    Object.values(quizScores).forEach(s => xp += s.score * 5);
    Object.values(notes).forEach(arr => xp += arr.length * 2);
    return xp;
  };

  const getLevel = () => {
    const xp = getXP();
    if (xp < 50) return { level: 1, name: "Curious Learner", next: 50 };
    if (xp < 150) return { level: 2, name: "Science Explorer", next: 150 };
    if (xp < 300) return { level: 3, name: "Lab Apprentice", next: 300 };
    if (xp < 500) return { level: 4, name: "Science Enthusiast", next: 500 };
    return { level: 5, name: "Science Master", next: 999 };
  };

  return (
    <AppContext.Provider value={{
      user, login, logout,
      theme, toggleTheme,
      progress, markTopicComplete,
      quizScores, saveQuizScore,
      notes, saveNote, deleteNote,
      bookmarks, toggleBookmark,
      getTotalProgress, getXP, getLevel
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
