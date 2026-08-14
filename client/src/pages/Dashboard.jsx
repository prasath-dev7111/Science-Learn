import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { subjects, topicContent } from "../data/scienceData";

function Dashboard() {
  const { user, progress, quizScores, notes, bookmarks, getXP, getLevel, getTotalProgress } = useApp();

  const xp = getXP();
  const lvl = getLevel();
  const totalProg = getTotalProgress();
  const xpToNext = lvl.next - xp;
  const xpPct = Math.min(100, Math.round(((xp - (lvl.level > 1 ? [0,50,150,300,500][lvl.level-1] : 0)) / (lvl.next - (lvl.level > 1 ? [0,50,150,300,500][lvl.level-1] : 0))) * 100));

  const allQuizzes = Object.entries(quizScores);
  const avgScore = allQuizzes.length
    ? Math.round(allQuizzes.reduce((a, [, v]) => a + (v.score / v.total) * 100, 0) / allQuizzes.length)
    : 0;

  const totalNotes = Object.values(notes).reduce((a, arr) => a + arr.length, 0);

  const recentActivity = [];
  allQuizzes.slice(-3).forEach(([key, val]) => {
    const [subj, ...topicParts] = key.split("-");
    const topicKey = topicParts.join("-");
    const topicName = topicContent[subj]?.[topicKey]?.title || topicKey;
    recentActivity.push({
      type: "quiz",
      label: `Quiz: ${topicName}`,
      score: `${val.score}/${val.total}`,
      subj,
      date: new Date(val.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
    });
  });

  const bookmarkedItems = bookmarks.slice(0, 4).map(key => {
    const [subj, ...rest] = key.split("-");
    const topicKey = rest.join("-");
    const s = subjects.find(s => s.id === subj);
    return { key, subj, topicKey, name: topicContent[subj]?.[topicKey]?.title || topicKey, subjectName: s?.name, color: s?.color, emoji: s?.emoji };
  });

  const levelColors = ["", "var(--accent-blue)", "var(--accent-cyan)", "var(--accent-green)", "var(--accent-orange)", "var(--accent-purple)"];

  return (
    <div className="page-container">
      {/* Welcome header */}
      <div style={styles.welcomeBar} className="fade-up">
        <div>
          <h1 style={styles.welcomeTitle}>
            Welcome back, <span style={{ color: "var(--accent-blue)" }}>{user?.split("@")[0]} 👋</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Ready to continue your science journey?</p>
        </div>
        <Link to="/" className="btn btn-outline" style={{ fontSize: "0.875rem" }}>
          📚 Browse Subjects
        </Link>
      </div>

      {/* Stats row */}
      <div style={styles.statsGrid} className="fade-up-1">
        {[
          { label: "Topics Completed", value: totalProg.completed, icon: "✅", color: "var(--accent-green)", sub: `of ${totalProg.total} total` },
          { label: "Overall Progress", value: `${totalProg.pct}%`, icon: "📈", color: "var(--accent-blue)", sub: "learning progress" },
          { label: "Quizzes Taken", value: allQuizzes.length, icon: "📝", color: "var(--accent-orange)", sub: `avg ${avgScore}% score` },
          { label: "Notes Saved", value: totalNotes, icon: "📒", color: "var(--accent-purple)", sub: "across all topics" },
        ].map((stat, i) => (
          <div key={i} style={styles.statCard} className="card">
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{stat.icon}</div>
            <div style={{ fontSize: "1.75rem", fontWeight: 900, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, marginTop: "0.15rem" }}>{stat.label}</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      <div style={styles.mainGrid}>
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Level & XP card */}
          <div className="card fade-up-2">
            <div style={styles.levelRow}>
              <div style={styles.levelBadge}>
                <span style={{ fontSize: "1.75rem" }}>🏆</span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>LEVEL {lvl.level}</div>
                  <div style={{ fontWeight: 800, color: levelColors[lvl.level] }}>{lvl.name}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--accent-purple)" }}>⚡ {xp} XP</div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {xpToNext > 0 ? `${xpToNext} XP to Level ${lvl.level + 1}` : "Max Level!"}
                </div>
              </div>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 6 }}>
                <span>Level Progress</span>
                <span>{xpPct}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${xpPct}%`, background: `linear-gradient(90deg, ${levelColors[lvl.level]}, var(--accent-cyan))` }} />
              </div>
            </div>
            <div style={styles.xpBreakdown}>
              <div style={styles.xpItem}><span>📚 Topics done</span><span style={{ color: "var(--accent-green)" }}>+{totalProg.completed * 10} XP</span></div>
              <div style={styles.xpItem}><span>📝 Quiz answers</span><span style={{ color: "var(--accent-orange)" }}>+{allQuizzes.reduce((a,[,v]) => a + v.score, 0) * 5} XP</span></div>
              <div style={styles.xpItem}><span>📒 Notes taken</span><span style={{ color: "var(--accent-purple)" }}>+{totalNotes * 2} XP</span></div>
            </div>
          </div>

          {/* Subject progress */}
          <div className="card fade-up-3">
            <h3 style={styles.cardTitle}>📊 Subject Progress</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {subjects.map(s => {
                const topicKeys = Object.keys(topicContent[s.id] || {});
                const done = topicKeys.filter(t => progress[`${s.id}-${t}`]).length;
                const pct = topicKeys.length ? Math.round((done / topicKeys.length) * 100) : 0;
                return (
                  <div key={s.id}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: 6 }}>
                      <span style={{ fontWeight: 600 }}>{s.emoji} {s.name}</span>
                      <span style={{ color: "var(--text-muted)" }}>{done}/{topicKeys.length} topics · {pct}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${pct}%`, background: s.gradient }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent activity */}
          <div className="card fade-up-4">
            <h3 style={styles.cardTitle}>🕐 Recent Quizzes</h3>
            {recentActivity.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {recentActivity.map((a, i) => (
                  <div key={i} style={styles.activityItem}>
                    <span style={{ fontSize: "0.9rem" }}>{a.type === "quiz" ? "📝" : "✅"}</span>
                    <span style={{ flex: 1, fontSize: "0.875rem" }}>{a.label}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{a.date}</span>
                    {a.score && (
                      <span style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: parseInt(a.score) / parseInt(a.score.split("/")[1]) >= 0.7 ? "var(--accent-green)" : "var(--accent-orange)",
                        background: "var(--bg-card2)",
                        padding: "0.15rem 0.5rem",
                        borderRadius: 999,
                      }}>{a.score}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>No quizzes taken yet. Start learning!</p>
            )}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Quick access subjects */}
          <div className="card fade-up-2">
            <h3 style={styles.cardTitle}>🚀 Quick Start</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {subjects.map(s => (
                <Link key={s.id} to={`/subject/${s.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ ...styles.subjectQuickCard, borderColor: `${s.color}30` }}>
                    <span style={{ fontSize: "1.25rem" }}>{s.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: s.color }}>{s.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{s.topics.length} topics</div>
                    </div>
                    <span style={{ color: "var(--text-muted)", marginLeft: "auto" }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Bookmarks */}
          <div className="card fade-up-3">
            <h3 style={styles.cardTitle}>🔖 Bookmarked Topics</h3>
            {bookmarkedItems.length > 0 ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {bookmarkedItems.map(b => (
                  <Link key={b.key} to={`/subject/${b.subj}/${b.topicKey}`} style={{ textDecoration: "none" }}>
                    <div style={styles.bookmarkItem}>
                      <span>{b.emoji}</span>
                      <div>
                        <div style={{ fontSize: "0.875rem", fontWeight: 600 }}>{b.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{b.subjectName}</div>
                      </div>
                    </div>
                  </Link>
                ))}
                {bookmarks.length > 4 && (
                  <Link to="/progress" style={{ fontSize: "0.8rem", color: "var(--accent-blue)", textDecoration: "none" }}>
                    View all {bookmarks.length} bookmarks →
                  </Link>
                )}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
                No bookmarks yet. Bookmark topics while learning!
              </p>
            )}
          </div>

          {/* Tips */}
          <div className="card fade-up-4" style={{ background: "rgba(99,179,237,0.05)", borderColor: "rgba(99,179,237,0.2)" }}>
            <h3 style={styles.cardTitle}>💡 Learning Tips</h3>
            <ul style={{ paddingLeft: "1.25rem", color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 2 }}>
              <li>Study flashcards for 10 minutes daily</li>
              <li>Take quizzes immediately after reading</li>
              <li>Write notes in your own words</li>
              <li>Review bookmarked topics weekly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  welcomeBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  welcomeTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.75rem",
    fontWeight: 700,
    margin: 0,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  statCard: { textAlign: "center", padding: "1.25rem 1rem" },
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "1.25rem",
    alignItems: "start",
  },
  levelRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  levelBadge: { display: "flex", alignItems: "center", gap: "0.75rem" },
  xpBreakdown: {
    marginTop: "1rem",
    borderTop: "1px solid var(--border)",
    paddingTop: "0.75rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
  },
  xpItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.8rem",
    color: "var(--text-muted)",
  },
  cardTitle: { fontWeight: 700, fontSize: "0.95rem", marginBottom: "1rem" },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.5rem 0",
    borderBottom: "1px solid var(--border)",
  },
  subjectQuickCard: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.65rem 0.85rem",
    background: "var(--bg-card2)",
    border: "1px solid",
    borderRadius: 10,
    transition: "all 0.2s",
  },
  bookmarkItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    padding: "0.5rem 0.75rem",
    background: "var(--bg-card2)",
    borderRadius: 8,
    transition: "all 0.2s",
  },
};

export default Dashboard;
