import { NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FaqPage from './pages/FaqPage'
import QnaPage from './pages/QnaPage'
import PrivacyPage from './pages/PrivacyPage'
import AboutPage from './pages/AboutPage'
import './App.css'

export default function App() {
  return (
    <div>
      <nav className="topnav">
        <div className="brand">BandarAkun</div>
        <div className="links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/qna">QnA</NavLink>
          <NavLink to="/faq">FAQ</NavLink>
          <NavLink to="/privacy-policy">Privacy Policy</NavLink>
          <NavLink to="/about">About Me</NavLink>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/qna" element={<QnaPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}
