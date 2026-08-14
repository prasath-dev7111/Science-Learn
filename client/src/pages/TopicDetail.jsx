import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { topicContent, subjects } from "../data/scienceData";
import { useApp } from "../context/AppContext";

function TopicDetail() {
  const { name, topic } = useParams();
  const { progress, markTopicComplete, notes, saveNote, deleteNote, bookmarks, toggleBookmark } = useApp();

  const [activeTab, setActiveTab] = useState("learn");
  const [flippedCard, setFlippedCard] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);

  const data = topicContent[name]?.[topic];
  const subject = subjects.find(s => s.id === name);
  const isDone = !!progress[`${name}-${topic}`];
  const isBookmarked = bookmarks.includes(`${name}-${topic}`);
  const topicNotes = notes[`${name}-${topic}`] || [];

  if (!data || !subject) return (
    <div className="page-container" style={{ textAlign: "center", paddingTop: "4rem" }}>
      <h2>Topic not found</h2>
      <Link to={`/subject/${name}`} className="btn btn-primary" style={{ marginTop: "1rem" }}>← Back to {name}</Link>
    </div>
  );

  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    saveNote(name, topic, noteText.trim());
    setNoteText("");
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const handleMarkDone = () => {
    markTopicComplete(name, topic);
  };

  const difficultyColor = {
    Beginner: "var(--accent-green)",
    Intermediate: "var(--accent-orange)",
    Advanced: "var(--accent-pink)"
  };

  return (
    <div className="page-container">
      {/* Breadcrumb */}
      <div style={styles.breadcrumb} className="fade-up">
        <Link to="/" style={styles.crumb}>Home</Link>
        <span style={styles.crumbSep}>›</span>
        <Link to={`/subject/${name}`} style={styles.crumb}>{subject.name}</Link>
        <span style={styles.crumbSep}>›</span>
        <span style={styles.crumbCurrent}>{data.title}</span>
      </div>

      {/* Topic Header */}
      <div style={styles.header} className="fade-up-1">
        <div style={styles.headerLeft}>
          <span style={{ fontSize: "2.5rem" }}>{data.emoji}</span>
          <div>
            <div style={styles.headerBadges}>
              <span style={{ ...styles.diffBadge, color: difficultyColor[data.difficulty], background: `${difficultyColor[data.difficulty]}18` }}>
                {data.difficulty}
              </span>
              <span style={styles.timeBadge}>⏱ {data.readTime} read</span>
              {isDone && <span style={styles.doneBadge}>✓ Completed</span>}
            </div>
            <h1 style={{ ...styles.title, color: subject.color }}>{data.title}</h1>
          </div>
        </div>

        <div style={styles.headerActions}>
          <button
            onClick={() => toggleBookmark(name, topic)}
            className="btn btn-outline"
            style={{
              color: isBookmarked ? "var(--accent-orange)" : undefined,
              borderColor: isBookmarked ? "var(--accent-orange)" : undefined,
              padding: "0.5rem 0.75rem",
            }}
          >
            {isBookmarked ? "🔖 Saved" : "🏷️ Save"}
          </button>
          {!isDone && (
            <button onClick={handleMarkDone} className="btn btn-success" style={{ padding: "0.5rem 1rem" }}>
              ✓ Mark Done
            </button>
          )}
          <Link to={`/quiz/${name}/${topic}`} className="btn btn-primary" style={{ padding: "0.5rem 1rem" }}>
            Take Quiz →
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabWrap} className="fade-up-2">
        {["learn", "flashcards", "notes"].map(t => (
          <button
            key={t}
            className={`tab-btn ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
          >
            {t === "learn" ? "📖 Learn" : t === "flashcards" ? "🃏 Flashcards" : `📝 Notes ${topicNotes.length ? `(${topicNotes.length})` : ""}`}
          </button>
        ))}
      </div>

      {/* LEARN TAB */}
      {activeTab === "learn" && (
        <div style={styles.learnGrid}>
          {/* Main Content */}
          <div style={styles.mainContent}>
            <div className="card fade-up-3">
              <h3 style={styles.sectionTitle}>Overview</h3>
              <p style={styles.description}>{data.description}</p>
            </div>

            {/* Formulas */}
            {data.formula && data.formula.length > 0 && (
              <div className="card fade-up-4">
                <h3 style={styles.sectionTitle}>📐 Key Formulas</h3>
                <div style={styles.formulaGrid}>
                  {data.formula.map((f, i) => (
                    <div key={i} style={styles.formulaBox}>
                      <code style={styles.formula}>{f}</code>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            <div className="card fade-up-5">
              <h3 style={styles.sectionTitle}>🎬 Video Lesson</h3>
              <div style={styles.videoWrap}>
                <iframe
                  src={data.video}
                  title={data.title}
                  style={{ width: "100%", height: "100%", border: "none", borderRadius: 8 }}
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div style={styles.sidebar}>
            {/* Key Points */}
            <div className="card fade-up-3">
              <h3 style={styles.sectionTitle}>🎯 Key Points</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {data.keyPoints.map((kp, i) => (
                  <div key={i} style={styles.keyPoint}>
                    <span style={{ ...styles.keyBullet, background: subject.color }}>{i + 1}</span>
                    <span style={{ fontSize: "0.875rem", lineHeight: 1.5 }}>{kp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="card">
              <h3 style={styles.sectionTitle}>Quick Actions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button onClick={() => setActiveTab("flashcards")} className="btn btn-outline" style={{ justifyContent: "center" }}>
                  🃏 Study Flashcards ({data.flashcards.length})
                </button>
                <button onClick={() => setActiveTab("notes")} className="btn btn-outline" style={{ justifyContent: "center" }}>
                  📝 Add Notes
                </button>
                <Link to={`/quiz/${name}/${topic}`} className="btn btn-primary" style={{ justifyContent: "center" }}>
                  📝 Take Quiz
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FLASHCARDS TAB */}
      {activeTab === "flashcards" && (
        <div className="fade-up">
          <div style={styles.flashcardInfo}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              🃏 Click on a card to reveal the answer. Study all {data.flashcards.length} cards.
            </p>
          </div>
          <div style={styles.flashcardsGrid}>
            {data.flashcards.map((card, i) => (
              <div
                key={i}
                className={`flashcard-wrap ${flippedCard === i ? "flipped" : ""}`}
                onClick={() => setFlippedCard(flippedCard === i ? null : i)}
              >
                <div className="flashcard-inner">
                  <div className="flashcard-front">
                    <div style={styles.cardNum}>Card {i + 1} of {data.flashcards.length}</div>
                    <div style={{ fontSize: "1rem", fontWeight: 600, color: subject.color }}>Question</div>
                    <p style={{ margin: "0.75rem 0 0", fontSize: "0.95rem", lineHeight: 1.6 }}>{card.front}</p>
                    <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>Click to flip →</div>
                  </div>
                  <div className="flashcard-back">
                    <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent-cyan)" }}>Answer</div>
                    <p style={{ margin: "0.75rem 0 0", fontSize: "0.95rem", lineHeight: 1.6 }}>{card.back}</p>
                    <div style={{ marginTop: "1rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>Click to flip back</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* NOTES TAB */}
      {activeTab === "notes" && (
        <div className="fade-up">
          <div className="card" style={{ marginBottom: "1rem" }}>
            <h3 style={styles.sectionTitle}>✍️ Add a Note</h3>
            <textarea
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="Write your notes, key takeaways, or questions here..."
              style={styles.noteTextarea}
              rows={4}
            />
            <button
              onClick={handleSaveNote}
              className="btn btn-primary"
              disabled={!noteText.trim()}
              style={{ marginTop: "0.75rem" }}
            >
              {noteSaved ? "✓ Saved!" : "Save Note"}
            </button>
          </div>

          {topicNotes.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <h4 style={{ fontWeight: 600, color: "var(--text-muted)", fontSize: "0.875rem" }}>
                YOUR NOTES ({topicNotes.length})
              </h4>
              {topicNotes.map(n => (
                <div key={n.id} className="note-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p style={{ margin: 0, lineHeight: 1.6 }}>{n.text}</p>
                    <button
                      onClick={() => deleteNote(name, topic, n.id)}
                      style={styles.deleteBtn}
                      title="Delete note"
                    >✕</button>
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                    {new Date(n.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
              <p>No notes yet. Start adding notes to remember key concepts!</p>
            </div>
          )}
        </div>
      )}

      {/* Next topic hint */}
      <div style={styles.nextHint} className="card">
        <Link to={`/subject/${name}`} style={styles.nextLink}>← Back to {subject.name} topics</Link>
        <Link to={`/quiz/${name}/${topic}`} className="btn btn-primary" style={{ fontSize: "0.875rem" }}>
          Test Yourself with Quiz →
        </Link>
      </div>
    </div>
  );
}

const styles = {
  breadcrumb: { display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "1.25rem", fontSize: "0.8rem" },
  crumb: { color: "var(--text-muted)", textDecoration: "none" },
  crumbSep: { color: "var(--text-muted)" },
  crumbCurrent: { color: "var(--text)", fontWeight: 500 },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1.5rem",
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: "1.5rem",
  },
  headerLeft: { display: "flex", alignItems: "flex-start", gap: "1rem" },
  headerBadges: { display: "flex", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" },
  headerActions: { display: "flex", gap: "0.5rem", flexWrap: "wrap" },
  title: { fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", fontWeight: 700, margin: 0 },
  diffBadge: { padding: "0.2rem 0.6rem", borderRadius: 999, fontSize: "0.72rem", fontWeight: 700 },
  timeBadge: { background: "var(--bg-card2)", padding: "0.2rem 0.6rem", borderRadius: 999, fontSize: "0.72rem", color: "var(--text-muted)" },
  doneBadge: { background: "rgba(104,211,145,0.15)", color: "var(--accent-green)", padding: "0.2rem 0.6rem", borderRadius: 999, fontSize: "0.72rem", fontWeight: 700 },
  tabWrap: { display: "flex", background: "var(--bg-card2)", borderRadius: 10, padding: "0.25rem", width: "fit-content", marginBottom: "1.5rem", gap: "0.25rem" },
  learnGrid: { display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem", alignItems: "start" },
  mainContent: { display: "flex", flexDirection: "column", gap: "1.25rem" },
  sidebar: { display: "flex", flexDirection: "column", gap: "1.25rem" },
  sectionTitle: { fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.75rem", color: "var(--text)" },
  description: { color: "var(--text-muted)", lineHeight: 1.8, margin: 0 },
  formulaGrid: { display: "flex", flexDirection: "column", gap: "0.5rem" },
  formulaBox: {
    background: "var(--bg-card2)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    padding: "0.6rem 1rem",
  },
  formula: { fontFamily: "'Space Mono', monospace", fontSize: "0.875rem", color: "var(--accent-cyan)" },
  videoWrap: {
    width: "100%",
    height: 320,
    borderRadius: 8,
    overflow: "hidden",
    background: "#000",
  },
  keyPoint: { display: "flex", alignItems: "flex-start", gap: "0.6rem" },
  keyBullet: {
    minWidth: 20,
    height: 20,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.65rem",
    fontWeight: 700,
    color: "#0a0e1a",
    marginTop: 2,
  },
  flashcardInfo: { marginBottom: "1rem" },
  flashcardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.25rem",
  },
  cardNum: { fontSize: "0.7rem", color: "var(--text-muted)", marginBottom: "0.5rem" },
  noteTextarea: {
    width: "100%",
    background: "var(--bg-card2)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "0.75rem 1rem",
    color: "var(--text)",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "0.9rem",
    lineHeight: 1.6,
    resize: "vertical",
    outline: "none",
    transition: "border-color 0.2s",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "var(--text-muted)",
    fontSize: "0.8rem",
    padding: "0.1rem 0.3rem",
    borderRadius: 4,
    flexShrink: 0,
    marginLeft: "0.5rem",
  },
  nextHint: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  nextLink: { color: "var(--text-muted)", textDecoration: "none", fontSize: "0.875rem" },
};

export default TopicDetail;
