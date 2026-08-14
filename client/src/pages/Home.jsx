import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { subjects } from "../data/scienceData";
import { useApp } from "../context/AppContext";

function Home() {
  const { user, progress } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const getSubjectProgress = (subjectId) => {
    const topicCount = subjects.find(s => s.id === subjectId)?.topics.length || 1;
    const done = Object.keys(progress).filter(k => k.startsWith(subjectId)).length;
    return Math.round((done / topicCount) * 100);
  };

  const stats = [
    { label: "Subjects", value: "3", icon: "📚" },
    { label: "Topics", value: "20", icon: "📖" },
    { label: "Quizzes", value: "20+", icon: "📝" },
    { label: "Flashcards", value: "80+", icon: "🃏" },
  ];

  const features = [
    { icon: "🎯", title: "Smart Quizzes", desc: "Test your knowledge with instant feedback and detailed explanations" },
    { icon: "🃏", title: "Flashcards", desc: "Interactive flip-cards to memorize key concepts effectively" },
    { icon: "📝", title: "Personal Notes", desc: "Take and save notes as you study each topic" },
    { icon: "📊", title: "Progress Tracking", desc: "Visual dashboard showing your learning journey" },
    { icon: "🏆", title: "XP & Levels", desc: "Earn experience points and level up as you learn" },
    { icon: "🔖", title: "Bookmarks", desc: "Save important topics to revisit later" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroBg} />
        <div style={styles.heroContent}>
          <div className={visible ? "fade-up" : ""} style={{ opacity: visible ? 1 : 0 }}>
            <div style={styles.heroBadge}>
              🚀 Interactive Science Learning Platform
            </div>
            <h1 style={styles.heroTitle}>
              Master Science<br />
              <span className="glow-text">One Topic at a Time</span>
            </h1>
            <p style={styles.heroDesc}>
              Explore Physics, Chemistry & Biology with interactive lessons,
              quizzes, flashcards and personal progress tracking.
            </p>
            <div style={styles.heroCTA}>
              {user ? (
                <>
                  <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: "1rem", padding: "0.8rem 2rem" }}>
                    Go to Dashboard →
                  </Link>
                  <Link to="/subject/physics" className="btn btn-outline" style={{ fontSize: "1rem", padding: "0.8rem 2rem" }}>
                    Start Learning Students
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary" style={{ fontSize: "1rem", padding: "0.8rem 2rem" }}>
                    Get Started Free →
                  </Link>
                  <Link to="/login" className="btn btn-outline" style={{ fontSize: "1rem", padding: "0.8rem 2rem" }}>
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Stats strip */}
          <div style={styles.statsRow}>
            {stats.map((s, i) => (
              <div key={i} style={styles.statItem}>
                <span style={styles.statIcon}>{s.icon}</span>
                <span style={styles.statValue}>{s.value}</span>
                <span style={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section style={styles.section}>
        <div className="page-container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Choose Your Subject</h2>
            <p style={styles.sectionSub}>3 core science subjects with comprehensive topic coverage</p>
          </div>

          <div style={styles.subjectsGrid}>
            {subjects.map((s, i) => {
              const pct = getSubjectProgress(s.id);
              return (
                <Link
                  key={s.id}
                  to={`/subject/${s.id}`}
                  style={{ textDecoration: "none" }}
                  className={`fade-up-${i + 1}`}
                >
                  <div style={{ ...styles.subjectCard, "--subj": s.color }}>
                    <div style={{ ...styles.subjectGlow, background: s.gradient }} />
                    <div style={styles.subjectEmoji}>{s.emoji}</div>
                    <h3 style={{ ...styles.subjectName, color: s.color }}>{s.name}</h3>
                    <p style={styles.subjectDesc}>{s.description}</p>

                    <div style={styles.topicList}>
                      {s.topics.slice(0, 4).map(t => (
                        <span key={t} style={styles.topicChip}>{t}</span>
                      ))}
                      {s.topics.length > 4 && (
                        <span style={{ ...styles.topicChip, opacity: 0.6 }}>+{s.topics.length - 4} more</span>
                      )}
                    </div>

                    {user && (
                      <div style={styles.progressWrap}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: 4 }}>
                          <span>Progress</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="progress-track">
                          <div className="progress-fill" style={{ width: `${pct}%`, background: s.gradient }} />
                        </div>
                      </div>
                    )}

                    <div style={{ ...styles.subjectArrow, color: s.color }}>
                      Explore Topics →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ ...styles.section, background: "var(--bg-card)" }}>
        <div className="page-container">
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Everything You Need to Learn</h2>
            <p style={styles.sectionSub}>Powerful tools designed for effective science learning</p>
          </div>

          <div style={styles.featuresGrid}>
            {features.map((f, i) => (
              <div key={i} style={styles.featureCard} className={`fade-up-${(i % 3) + 1}`}>
                <div style={styles.featureIcon}>{f.icon}</div>
                <h4 style={styles.featureTitle}>{f.title}</h4>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      {!user && (
        <section style={styles.ctaBanner}>
          <div className="page-container" style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.75rem" }}>
              Ready to Start Learning?
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
              Join thousands of students exploring science interactively
            </p>
            <Link to="/register" className="btn btn-primary" style={{ fontSize: "1rem", padding: "0.8rem 2.5rem" }}>
              Create Free Account →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

const styles = {
  hero: {
    position: "relative",
    padding: "5rem 1.5rem 3rem",
    overflow: "hidden",
  },
  heroBg: {
    position: "absolute",
    inset: 0,
    background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,179,237,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroContent: {
    maxWidth: 700,
    margin: "0 auto",
    textAlign: "center",
    position: "relative",
  },
  heroBadge: {
    display: "inline-block",
    background: "rgba(99,179,237,0.1)",
    border: "1px solid rgba(99,179,237,0.3)",
    borderRadius: 999,
    padding: "0.35rem 1rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "var(--accent-blue)",
    marginBottom: "1.5rem",
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
    fontWeight: 700,
    lineHeight: 1.15,
    marginBottom: "1rem",
    color: "var(--text)",
  },
  heroDesc: {
    fontSize: "1.05rem",
    color: "var(--text-muted)",
    lineHeight: 1.7,
    maxWidth: 520,
    margin: "0 auto 2rem",
  },
  heroCTA: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "3rem",
  },
  statsRow: {
    display: "flex",
    justifyContent: "center",
    gap: "2rem",
    flexWrap: "wrap",
    paddingTop: "2rem",
    borderTop: "1px solid var(--border)",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.1rem",
  },
  statIcon: { fontSize: "1.2rem" },
  statValue: { fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-blue)" },
  statLabel: { fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 500 },
  section: { padding: "4rem 0" },
  sectionHeader: { textAlign: "center", marginBottom: "2.5rem" },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: 700,
    marginBottom: "0.5rem",
  },
  sectionSub: { color: "var(--text-muted)", fontSize: "0.95rem" },
  subjectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
  },
  subjectCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 20,
    padding: "2rem",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s ease",
    height: "100%",
  },
  subjectGlow: {
    position: "absolute",
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: "50%",
    opacity: 0.08,
    filter: "blur(24px)",
  },
  subjectEmoji: { fontSize: "2.5rem", marginBottom: "0.75rem" },
  subjectName: { fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" },
  subjectDesc: { color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" },
  topicList: { display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" },
  topicChip: {
    background: "var(--bg-card2)",
    border: "1px solid var(--border)",
    borderRadius: 999,
    padding: "0.2rem 0.6rem",
    fontSize: "0.7rem",
    fontWeight: 500,
    color: "var(--text-muted)",
  },
  progressWrap: { marginBottom: "1rem" },
  subjectArrow: {
    fontSize: "0.875rem",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    marginTop: "0.5rem",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "1.25rem",
  },
  featureCard: {
    background: "var(--bg)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: "1.5rem",
    transition: "all 0.3s",
  },
  featureIcon: { fontSize: "1.75rem", marginBottom: "0.75rem" },
  featureTitle: { fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.4rem" },
  featureDesc: { color: "var(--text-muted)", fontSize: "0.82rem", lineHeight: 1.6 },
  ctaBanner: {
    padding: "4rem 0",
    background: "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(99,179,237,0.06), transparent)",
    borderTop: "1px solid var(--border)",
  },
};

export default Home;
