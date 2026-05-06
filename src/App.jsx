import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FaqPage from './pages/FaqPage'
import QnaPage from './pages/QnaPage'
import PrivacyPage from './pages/PrivacyPage'
import AboutPage from './pages/AboutPage'
import AdminPage from './pages/AdminPage'
import './App.css'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/qna', label: 'QnA' },
  { to: '/faq', label: 'FAQ' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/about', label: 'About' },
]

export default function App() {
  return (
    <div className="app-shell">
      <nav className="topnav">
        <div className="nav-brand-wrap">
          <NavLink to="/" className="brand-mark">
            <span className="brand-dot" />
            <div>
              <strong className="brand">BandarAkun</strong>
              <span className="brand-sub">VIP Sharing • AI • Tools • Apps</span>
            </div>
          </NavLink>
        </div>
        <div className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/qna">QnA</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/privacy-policy">Privacy Policy</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </div>
        <a href="https://wa.me/6283165514217" target="_blank" rel="noreferrer" className="nav-cta">Chat Admin</a>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qna" element={<QnaPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>

      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="eyebrow footer-eyebrow">BandarAkun</span>
            <h3>Marketplace akun VIP Sharing yang lebih jelas dan enak dipakai.</h3>
            <p>
              Fokus untuk kategori AI, Tools, dan Apps dengan tampilan katalog yang lebih rapi,
              CTA yang jelas, dan alur order yang lebih cepat.
            </p>
          </div>

          <div>
            <h4>Navigasi</h4>
            <div className="footer-links">
              {footerLinks.map((item) => (
                <NavLink key={item.to} to={item.to}>{item.label}</NavLink>
              ))}
            </div>
          </div>

          <div>
            <h4>Highlight</h4>
            <ul className="footer-points">
              <li>VIP Sharing kategori AI, Tools, Apps</li>
              <li>Filter produk + detail akses</li>
              <li>CTA cepat ke admin</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 BandarAkun. Built for faster product discovery.</span>
          <a href="https://bandar-akun.vercel.app" target="_blank" rel="noreferrer">Live Preview</a>
        </div>
      </footer>
    </div>
  )
}
