import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Navbar() {
  const { user, logout, theme, toggleTheme, getXP, getLevel } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const xp = getXP();
  const lvl = getLevel();
  const isActive = (path) => location.pathname === path;

  const navLinks = user
    ? [
        { to: "/", label: "Home", icon: "🏠" },
        { to: "/dashboard", label: "Dashboard", icon: "📊" },
        { to: "/progress", label: "Progress", icon: "📈" },
      ]
    : [
        { to: "/", label: "Home", icon: "🏠" },
        { to: "/login", label: "Login", icon: "🔐" },
        { to: "/register", label: "Register", icon: "✨" },
      ];

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🔬</span>
          <span style={styles.logoText}>SciLearn</span>
        </Link>

        {/* Desktop links */}
        <div style={styles.links}>
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                ...styles.link,
                ...(isActive(l.to) ? styles.linkActive : {})
              }}
            >
              {l.icon} {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={styles.right}>
          {/* XP badge if logged in */}
          {user && (
            <div style={styles.xpBadge} title={`Level ${lvl.level}: ${lvl.name}`}>
              <span style={styles.xpLevel}>Lv.{lvl.level}</span>
              <span style={styles.xpCount}>⚡{xp} XP</span>
            </div>
          )}

          {/* Theme toggle */}
          <button onClick={toggleTheme} style={styles.themeBtn} title="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* User info / logout */}
          {user ? (
            <div style={styles.userArea}>
              <span style={styles.userEmail}>
                {user.split("@")[0]}
              </span>
              <button onClick={logout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : null}

          {/* Mobile hamburger */}
          <button
            style={styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={styles.mobileMenu}>
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {l.icon} {l.label}
            </Link>
          ))}
          {user && (
            <button
              onClick={() => { logout(); setMenuOpen(false); }}
              style={{ ...styles.mobileLink, background: "rgba(252,129,129,0.1)", color: "#fc8181", border: "none", cursor: "pointer", textAlign: "left" }}
            >
              🚪 Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    background: "var(--bg-card)",
    borderBottom: "1px solid var(--border)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(12px)",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 1.5rem",
    height: 60,
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    flexShrink: 0,
  },
  logoIcon: {
    fontSize: "1.4rem",
  },
  logoText: {
    fontFamily: "'Playfair Display', serif",
    fontWeight: 700,
    fontSize: "1.2rem",
    background: "linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  links: {
    display: "flex",
    gap: "0.25rem",
    flex: 1,
  },
  link: {
    padding: "0.4rem 0.8rem",
    borderRadius: 8,
    textDecoration: "none",
    color: "var(--text-muted)",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: "all 0.2s",
  },
  linkActive: {
    background: "rgba(99,179,237,0.12)",
    color: "var(--accent-blue)",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginLeft: "auto",
  },
  xpBadge: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "rgba(183,148,244,0.12)",
    border: "1px solid rgba(183,148,244,0.3)",
    borderRadius: 999,
    padding: "0.2rem 0.7rem",
    cursor: "default",
  },
  xpLevel: {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "var(--accent-purple)",
  },
  xpCount: {
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "var(--accent-purple)",
  },
  themeBtn: {
    background: "var(--bg-card2)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    width: 34,
    height: 34,
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  userEmail: {
    fontSize: "0.8rem",
    color: "var(--text-muted)",
    fontWeight: 500,
  },
  logoutBtn: {
    background: "rgba(252,129,129,0.12)",
    border: "1px solid rgba(252,129,129,0.3)",
    borderRadius: 8,
    padding: "0.3rem 0.7rem",
    color: "#fc8181",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  hamburger: {
    display: "none",
    background: "var(--bg-card2)",
    border: "1px solid var(--border)",
    borderRadius: 8,
    width: 34,
    height: 34,
    cursor: "pointer",
    fontSize: "1rem",
    color: "var(--text)",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": { display: "flex" }
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    padding: "0.75rem 1.5rem 1rem",
    borderTop: "1px solid var(--border)",
    gap: "0.25rem",
  },
  mobileLink: {
    padding: "0.6rem 0.8rem",
    borderRadius: 8,
    textDecoration: "none",
    color: "var(--text-muted)",
    fontSize: "0.9rem",
    fontWeight: 500,
    display: "block",
  },
};

export default Navbar;
