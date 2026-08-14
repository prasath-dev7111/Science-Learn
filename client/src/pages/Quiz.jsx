import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { quizData, topicContent, subjects } from "../data/scienceData";
import { useApp } from "../context/AppContext";

function Quiz() {
  const { name, topic } = useParams();
  const { saveQuizScore } = useApp();

  const questions = quizData[name]?.[topic] || [];
  const data = topicContent[name]?.[topic];
  const subject = subjects.find(s => s.id === name);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(20);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (!timerActive || answered || showResult || questions.length === 0) return;
    if (timer === 0) { handleTimeout(); return; }
    const t = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, timerActive, answered, showResult]);

  const handleTimeout = () => {
    setSelected(null);
    setAnswered(true);
    setTimerActive(false);
    setAnswers(prev => [...prev, { question: questions[current].question, selected: null, correct: questions[current].answer, isCorrect: false }]);
  };

  const handleAnswer = (opt) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    setTimerActive(false);
    const isCorrect = opt === questions[current].answer;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, { question: questions[current].question, selected: opt, correct: questions[current].answer, isCorrect }]);
  };

  const handleNext = () => {
    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setSelected(null);
      setAnswered(false);
      setTimer(20);
      setTimerActive(true);
    } else {
      setShowResult(true);
      saveQuizScore(name, topic, score + (selected === questions[current]?.answer ? 0 : 0), questions.length);
    }
  };

  const handleFinish = () => {
    setShowResult(true);
    const finalScore = answers.filter(a => a.isCorrect).length;
    saveQuizScore(name, topic, finalScore, questions.length);
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
    setTimer(20);
    setTimerActive(true);
  };

  const getScoreMsg = (pct) => {
    if (pct === 100) return { msg: "Perfect Score! 🏆", color: "var(--accent-green)", emoji: "🎉" };
    if (pct >= 80) return { msg: "Excellent Work! 🌟", color: "var(--accent-green)", emoji: "⭐" };
    if (pct >= 60) return { msg: "Good Job! 👍", color: "var(--accent-orange)", emoji: "👏" };
    if (pct >= 40) return { msg: "Keep Practicing! 💪", color: "var(--accent-orange)", emoji: "📚" };
    return { msg: "Review & Try Again 📖", color: "var(--accent-pink)", emoji: "💡" };
  };

  if (!subject) return <div className="page-container"><p>Subject not found</p></div>;

  if (questions.length === 0) return (
    <div className="page-container" style={{ textAlign: "center", paddingTop: "4rem" }}>
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
      <h2 style={{ marginBottom: "0.5rem" }}>No Quiz Available</h2>
      <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
        This topic doesn't have a quiz yet. Check back soon!
      </p>
      <Link to={`/subject/${name}`} className="btn btn-primary">← Back to {subject.name}</Link>
    </div>
  );

  // RESULT SCREEN
  if (showResult) {
    const finalScore = answers.filter(a => a.isCorrect).length;
    const pct = Math.round((finalScore / questions.length) * 100);
    const { msg, color, emoji } = getScoreMsg(pct);

    return (
      <div className="page-container fade-up" style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>{emoji}</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color }}>{msg}</h1>
          <p style={{ color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Quiz: <strong style={{ color: "var(--text)" }}>{data?.title || topic}</strong>
          </p>
        </div>

        {/* Score circle */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <div style={{ ...styles.scoreCircle, borderColor: color }}>
            <div style={{ fontSize: "2.5rem", fontWeight: 900, color }}>{pct}%</div>
            <div style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>{finalScore}/{questions.length} correct</div>
          </div>
        </div>

        {/* XP earned */}
        <div style={styles.xpEarned}>
          <span>⚡ XP Earned: </span>
          <strong style={{ color: "var(--accent-purple)" }}>+{finalScore * 5} XP</strong>
        </div>

        {/* Review answers */}
        <h3 style={{ fontWeight: 700, marginBottom: "1rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>ANSWER REVIEW</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
          {answers.map((a, i) => (
            <div key={i} style={{ ...styles.reviewCard, borderColor: a.isCorrect ? "var(--accent-green)" : "var(--accent-pink)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "1rem" }}>{a.isCorrect ? "✅" : "❌"}</span>
                <strong style={{ fontSize: "0.9rem" }}>{a.question}</strong>
              </div>
              {!a.isCorrect && (
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  {a.selected ? <span>Your answer: <span style={{ color: "var(--accent-pink)" }}>{a.selected}</span></span> : <span style={{ color: "var(--accent-pink)" }}>Time's up!</span>}
                  <br />
                  <span>Correct: <span style={{ color: "var(--accent-green)" }}>{a.correct}</span></span>
                </div>
              )}
              {/* Explanation */}
              {questions[i]?.explanation && (
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.4rem", fontStyle: "italic" }}>
                  💡 {questions[i].explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={restart} className="btn btn-primary">🔄 Retry Quiz</button>
          <Link to={`/subject/${name}/${topic}`} className="btn btn-outline">📖 Review Topic</Link>
          <Link to={`/subject/${name}`} className="btn btn-outline">← {subject.name} Topics</Link>
        </div>
      </div>
    );
  }

  // QUESTION SCREEN
  const q = questions[current];
  const timerPct = (timer / 20) * 100;
  const timerColor = timer > 10 ? "var(--accent-green)" : timer > 5 ? "var(--accent-orange)" : "var(--accent-pink)";

  return (
    <div className="page-container fade-up" style={{ maxWidth: 700, margin: "0 auto" }}>
      {/* Header */}
      <div style={styles.quizHeader}>
        <Link to={`/subject/${name}/${topic}`} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem" }}>
          ← {data?.title || topic}
        </Link>
        <div style={styles.quizMeta}>
          <span style={styles.questionCount}>
            {current + 1} / {questions.length}
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontSize: "0.8rem", color: timerColor, fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>
              {timer}s
            </span>
            <div style={styles.timerTrack}>
              <div style={{ ...styles.timerFill, width: `${timerPct}%`, background: timerColor }} />
            </div>
          </div>
          <span style={styles.scorePill}>⭐ {score}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-track" style={{ marginBottom: "2rem" }}>
        <div className="progress-fill" style={{ width: `${((current) / questions.length) * 100}%`, background: subject.gradient }} />
      </div>

      {/* Question */}
      <div style={styles.questionCard}>
        <div style={{ ...styles.qSubject, color: subject.color }}>
          {subject.emoji} {subject.name} › {data?.title}
        </div>
        <h2 style={styles.questionText}>{q.question}</h2>
      </div>

      {/* Options */}
      <div style={styles.optionsGrid}>
        {q.options.map((opt, i) => {
          const isSelected = selected === opt;
          const isCorrect = opt === q.answer;
          const letters = ["A", "B", "C", "D"];
          let btnClass = "answer-btn";
          if (answered) {
            if (isCorrect) btnClass += " correct";
            else if (isSelected && !isCorrect) btnClass += " wrong";
          }

          return (
            <button
              key={i}
              className={btnClass}
              onClick={() => handleAnswer(opt)}
              disabled={answered}
              style={{ cursor: answered ? "default" : "pointer" }}
            >
              <span style={{
                ...styles.optionLetter,
                background: answered && isCorrect ? "var(--accent-green)" : answered && isSelected ? "var(--accent-pink)" : "var(--bg-card2)",
                color: answered && (isCorrect || isSelected) ? "#0a0e1a" : "var(--text-muted)",
              }}>
                {letters[i]}
              </span>
              {opt}
              {answered && isCorrect && <span style={{ marginLeft: "auto" }}>✓</span>}
              {answered && isSelected && !isCorrect && <span style={{ marginLeft: "auto" }}>✗</span>}
            </button>
          );
        })}
      </div>

      {/* Explanation & Next */}
      {answered && (
        <div style={styles.explanationBox} className="fade-up">
          <div style={styles.explanationHeader}>
            <span>{selected === q.answer ? "✅ Correct!" : selected === null ? "⏰ Time's up!" : "❌ Incorrect"}</span>
            {q.explanation && <span style={{ fontWeight: 400, fontSize: "0.875rem", color: "var(--text-muted)" }}>💡 {q.explanation}</span>}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
              Correct answer: <strong style={{ color: "var(--accent-green)" }}>{q.answer}</strong>
            </span>
            <button
              onClick={current + 1 < questions.length ? handleNext : handleFinish}
              className="btn btn-primary"
            >
              {current + 1 < questions.length ? "Next Question →" : "See Results 🎉"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  quizHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  quizMeta: { display: "flex", alignItems: "center", gap: "0.75rem" },
  questionCount: {
    background: "var(--bg-card2)",
    border: "1px solid var(--border)",
    borderRadius: 999,
    padding: "0.2rem 0.7rem",
    fontSize: "0.8rem",
    fontWeight: 700,
    fontFamily: "'Space Mono', monospace",
  },
  timerTrack: { width: 60, height: 6, background: "var(--bg-card2)", borderRadius: 999, overflow: "hidden" },
  timerFill: { height: "100%", borderRadius: 999, transition: "width 1s linear, background 0.5s" },
  scorePill: {
    background: "rgba(183,148,244,0.15)",
    color: "var(--accent-purple)",
    padding: "0.2rem 0.6rem",
    borderRadius: 999,
    fontSize: "0.8rem",
    fontWeight: 700,
  },
  questionCard: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 16,
    padding: "1.75rem",
    marginBottom: "1.25rem",
  },
  qSubject: { fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.75rem" },
  questionText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "1.3rem",
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.4,
  },
  optionsGrid: { display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1rem" },
  optionLetter: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: 700,
    flexShrink: 0,
    transition: "all 0.2s",
  },
  explanationBox: {
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    padding: "1.25rem",
    marginTop: "0.5rem",
  },
  explanationHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "0.4rem",
    fontWeight: 700,
    fontSize: "1rem",
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: "50%",
    border: "4px solid",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--bg-card)",
  },
  xpEarned: {
    textAlign: "center",
    background: "rgba(183,148,244,0.08)",
    border: "1px solid rgba(183,148,244,0.2)",
    borderRadius: 10,
    padding: "0.6rem 1rem",
    marginBottom: "1.5rem",
    fontSize: "0.9rem",
  },
  reviewCard: {
    background: "var(--bg-card)",
    border: "1px solid",
    borderRadius: 10,
    padding: "0.75rem 1rem",
  },
};

export default Quiz;
