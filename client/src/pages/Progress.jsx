import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { subjects, topicContent } from "../data/scienceData";

function Progress() {
  const { progress, quizScores, notes, bookmarks, getXP, getLevel } = useApp();

  const xp = getXP();
  const lvl = getLevel();

  const allTopics = [];
  subjects.forEach(s => {
    Object.entries(topicContent[s.id] || {}).forEach(([key, data]) => {
      allTopics.push({
        subjectId: s.id,
        subjectName: s.name,
        subjectEmoji: s.emoji,
        subjectColor: s.color,
        topicKey: key,
        title: data.title,
        emoji: data.emoji,
        difficulty: data.difficulty,
        isDone: !!progress[`${s.id}-${key}`],
        quizScore: quizScores[`${s.id}-${key}`],
        noteCount: (notes[`${s.id}-${key}`] || []).length,
        isBookmarked: bookmarks.includes(`${s.id}-${key}`),
      });
    });
  });

  const doneTopics = allTopics.filter(t => t.isDone).length;
  const totalTopics = allTopics.length;

  return (
    <div className="page-container">
      <h1 style={styles.title} className="fade-up">📈 My Progress</h1>

      {/* Overview cards */}
      <div style={styles.overviewGrid} className="fade-up-1">
        <div style={styles.bigStat}>
          <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--accent-blue)" }}>{doneTopics}/{totalTopics}</div>
          <div style={{ fontWeight: 600, marginTop: "0.25rem" }}>Topics Completed</div>
          <div className="progress-track" style={{ marginTop: "0.75rem" }}>
            <div className="progress-fill" style={{ width: `${Math.round((doneTopics/totalTopics)*100)}%` }} />
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.4rem" }}>{Math.round((doneTopics/totalTopics)*100)}% overall</div>
        </div>
        <div style={styles.bigStat}>
          <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--accent-purple)" }}>Lv.{lvl.level}</div>
          <div style={{ fontWeight: 600, marginTop: "0.25rem" }}>{lvl.name}</div>
          <div style={{ fontSize: "0.875rem", color: "var(--accent-purple)", fontWeight: 700, marginTop: "0.5rem" }}>⚡ {xp} XP</div>
        </div>
        <div style={styles.bigStat}>
          <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--accent-orange)" }}>{Object.keys(quizScores).length}</div>
          <div style={{ fontWeight: 600, marginTop: "0.25rem" }}>Quizzes Taken</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
            Avg: {Object.values(quizScores).length ? Math.round(Object.values(quizScores).reduce((a,v) => a + (v.score/v.total)*100, 0) / Object.values(quizScores).length) : 0}%
          </div>
        </div>
        <div style={styles.bigStat}>
          <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--accent-cyan)" }}>{bookmarks.length}</div>
          <div style={{ fontWeight: 600, marginTop: "0.25rem" }}>Bookmarks</div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>saved topics</div>
        </div>
      </div>

      {/* All topics table */}
      <div className="card fade-up-2">
        <h3 style={{ fontWeight: 700, marginBottom: "1.25rem" }}>All Topics</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {allTopics.map((t, i) => (
            <div key={i} style={styles.topicRow}>
              <div style={styles.topicLeft}>
                <span style={{ fontSize: "1.1rem" }}>{t.emoji}</span>
                <div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{t.title}</span>
                    {t.isDone && <span style={{ fontSize: "0.65rem", background: "rgba(104,211,145,0.15)", color: "var(--accent-green)", padding: "0.1rem 0.4rem", borderRadius: 999, fontWeight: 700 }}>✓</span>}
                    {t.isBookmarked && <span style={{ fontSize: "0.65rem" }}>🔖</span>}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: t.subjectColor, fontWeight: 600 }}>{t.subjectEmoji} {t.subjectName}</div>
                </div>
              </div>
              <div style={styles.topicRight}>
                {t.quizScore && (
                  <span style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: t.quizScore.score / t.quizScore.total >= 0.7 ? "var(--accent-green)" : "var(--accent-orange)",
                    background: "var(--bg-card2)",
                    padding: "0.15rem 0.5rem",
                    borderRadius: 999,
                  }}>
                    📝 {t.quizScore.score}/{t.quizScore.total}
                  </span>
                )}
                {t.noteCount > 0 && (
                  <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>📒 {t.noteCount}</span>
                )}
                <Link
                  to={`/subject/${t.subjectId}/${t.topicKey}`}
                  style={{ fontSize: "0.78rem", color: "var(--accent-blue)", textDecoration: "none", fontWeight: 600 }}
                >
                  {t.isDone ? "Review" : "Study"} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1.5rem",
  },
  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  bigStat: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: "1.5rem",
  },
  topicRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.65rem 0.75rem",
    background: "var(--bg-card2)",
    borderRadius: 10,
    gap: "1rem",
  },
  topicLeft: { display: "flex", alignItems: "center", gap: "0.75rem", flex: 1 },
  topicRight: { display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 },
};

export default Progress;
