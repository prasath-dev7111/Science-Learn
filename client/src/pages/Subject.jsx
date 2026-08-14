import React from "react";
import { useParams, Link } from "react-router-dom";
import { subjects, topicContent } from "../data/scienceData";
import { useApp } from "../context/AppContext";

function Subject() {
  const { name } = useParams();
  const { progress, quizScores, bookmarks, toggleBookmark } = useApp();

  const subject = subjects.find(s => s.id === name);
  if (!subject) return (
    <div className="page-container" style={{ textAlign: "center", paddingTop: "4rem" }}>
      <h2>Subject not found</h2>
      <Link to="/" className="btn btn-primary" style={{ marginTop: "1rem" }}>Go Home</Link>
    </div>
  );

  const subjectTopics = Object.entries(topicContent[name] || {});
  const completedCount = subjectTopics.filter(([t]) => progress[`${name}-${t}`]).length;
  const pct = subjectTopics.length ? Math.round((completedCount / subjectTopics.length) * 100) : 0;

  const difficultyColor = {
    Beginner: "var(--accent-green)",
    Intermediate: "var(--accent-orange)",
    Advanced: "var(--accent-pink)"
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={styles.header} className="fade-up">
        <Link to="/" style={styles.back}>← Back to Home</Link>

        <div style={styles.headerInner}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span style={{ fontSize: "2.5rem" }}>{subject.emoji}</span>
              <h1 style={{ ...styles.title, color: subject.color }}>{subject.name}</h1>
            </div>
            <p style={styles.desc}>{subject.description}</p>
          </div>

          <div style={styles.progressCard}>
            <div style={styles.progressCircle}>
              <svg viewBox="0 0 60 60" width="80" height="80">
                <circle cx="30" cy="30" r="26" fill="none" stroke="var(--border)" strokeWidth="4" />
                <circle
                  cx="30" cy="30" r="26"
                  fill="none"
                  stroke={subject.color}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${(pct / 100) * 163.4} 163.4`}
                  transform="rotate(-90 30 30)"
                  style={{ transition: "stroke-dasharray 1s ease" }}
                />
                <text x="30" y="34" textAnchor="middle" fill="var(--text)" fontSize="13" fontWeight="bold">{pct}%</text>
              </svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{completedCount}/{subjectTopics.length} topics</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>completed</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: "1.5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: 6 }}>
            <span>Overall Progress</span>
            <span>{pct}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%`, background: subject.gradient }} />
          </div>
        </div>
      </div>

      {/* Topics grid */}
      <div style={styles.grid}>
        {subjectTopics.map(([topicKey, data], i) => {
          const isDone = !!progress[`${name}-${topicKey}`];
          const quizResult = quizScores[`${name}-${topicKey}`];
          const isBookmarked = bookmarks.includes(`${name}-${topicKey}`);

          return (
            <div key={topicKey} style={styles.topicCard} className={`fade-up-${(i % 5) + 1}`}>
              <div style={styles.cardTop}>
                <span style={{ fontSize: "1.5rem" }}>{data.emoji}</span>
                <div style={styles.cardBadges}>
                  <span style={{ ...styles.diffBadge, color: difficultyColor[data.difficulty], background: `${difficultyColor[data.difficulty]}18` }}>
                    {data.difficulty}
                  </span>
                  <span style={styles.timeBadge}>⏱ {data.readTime}</span>
                  {isDone && <span style={styles.doneBadge}>✓ Done</span>}
                </div>
              </div>

              <h3 style={styles.topicTitle}>{data.title}</h3>
              <p style={styles.topicDesc}>
                {data.description.slice(0, 100)}...
              </p>

              {/* Key points preview */}
              <div style={styles.keyPointsPreview}>
                {data.keyPoints.slice(0, 2).map((kp, j) => (
                  <div key={j} style={styles.keyPoint}>
                    <span style={{ color: subject.color, fontWeight: 700, marginRight: 6 }}>›</span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{kp}</span>
                  </div>
                ))}
              </div>

              {quizResult && (
                <div style={styles.quizResult}>
                  <span>📝 Quiz: </span>
                  <span style={{ color: quizResult.score / quizResult.total >= 0.7 ? "var(--accent-green)" : "var(--accent-orange)", fontWeight: 700 }}>
                    {quizResult.score}/{quizResult.total}
                  </span>
                </div>
              )}

              <div style={styles.cardActions}>
                <Link
                  to={`/subject/${name}/${topicKey}`}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                >
                  {isDone ? "Review" : "Learn"}
                </Link>
                <Link
                  to={`/quiz/${name}/${topicKey}`}
                  className="btn btn-outline"
                  style={{ flex: 1, justifyContent: "center", fontSize: "0.85rem", padding: "0.5rem 1rem" }}
                >
                  Quiz 📝
                </Link>
                <button
                  onClick={() => toggleBookmark(name, topicKey)}
                  style={{
                    ...styles.bookmarkBtn,
                    color: isBookmarked ? "var(--accent-orange)" : "var(--text-muted)",
                    borderColor: isBookmarked ? "var(--accent-orange)" : "var(--border)",
                  }}
                  title={isBookmarked ? "Remove bookmark" : "Bookmark"}
                >
                  {isBookmarked ? "🔖" : "🏷️"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  header: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 20,
    padding: "2rem",
    marginBottom: "2rem",
  },
  back: {
    color: "var(--text-muted)",
    textDecoration: "none",
    fontSize: "0.85rem",
    display: "block",
    marginBottom: "1rem",
    transition: "color 0.2s",
  },
  headerInner: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "2rem",
    fontWeight: 700,
    margin: 0,
  },
  desc: { color: "var(--text-muted)", maxWidth: 500, marginTop: "0.5rem" },
  progressCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    flexShrink: 0,
  },
  progressCircle: {},
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.25rem",
  },
  topicCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: "1.5rem",
    transition: "all 0.3s",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardBadges: { display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "flex-end" },
  diffBadge: {
    padding: "0.15rem 0.5rem",
    borderRadius: 999,
    fontSize: "0.7rem",
    fontWeight: 600,
  },
  timeBadge: {
    background: "var(--bg-card2)",
    padding: "0.15rem 0.5rem",
    borderRadius: 999,
    fontSize: "0.7rem",
    color: "var(--text-muted)",
  },
  doneBadge: {
    background: "rgba(104,211,145,0.15)",
    color: "var(--accent-green)",
    padding: "0.15rem 0.5rem",
    borderRadius: 999,
    fontSize: "0.7rem",
    fontWeight: 700,
  },
  topicTitle: { fontSize: "1.05rem", fontWeight: 700, margin: 0 },
  topicDesc: { color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.5, margin: 0 },
  keyPointsPreview: { display: "flex", flexDirection: "column", gap: "0.2rem" },
  keyPoint: { display: "flex", alignItems: "flex-start" },
  quizResult: {
    background: "var(--bg-card2)",
    borderRadius: 8,
    padding: "0.4rem 0.75rem",
    fontSize: "0.8rem",
    color: "var(--text-muted)",
  },
  cardActions: { display: "flex", gap: "0.5rem", marginTop: "auto" },
  bookmarkBtn: {
    background: "transparent",
    border: "1px solid",
    borderRadius: 8,
    padding: "0.5rem",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "all 0.2s",
    flexShrink: 0,
  },
};

export default Subject;
