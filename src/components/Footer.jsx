import { ArrowUp, CodeXml } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { profile } from "../data/profile"

export default function Footer() {
  return (
    <footer className="site-footer refined-footer">
      <div className="container-shell footer-inner">
        <div><a href="#home" className="footer-brand"><CodeXml size={18} />{profile.name}</a><p>© {new Date().getFullYear()} {profile.name}. Built with React.</p></div>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub (opens in a new tab)"><FaGithub size={18} /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn (opens in a new tab)"><FaLinkedin size={18} /></a>
          <a href="#home" className="social-link">Back to top<ArrowUp size={15} /></a>
        </div>
      </div>
    </footer>
  )
}
