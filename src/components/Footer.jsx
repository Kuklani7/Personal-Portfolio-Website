import { ArrowUp, CodeXml } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import { profile } from "../data/profile"

function Footer() {
  return (
    <footer className="site-footer py-8">
      <div className="container-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a href="#home" className="inline-flex min-h-11 items-center gap-2 font-heading text-sm font-medium text-ink"><CodeXml size={17} className="text-accent" />{profile.name}</a>
          <p className="mt-1 text-xs">© {new Date().getFullYear()} {profile.name}. Built with React.</p>
        </div>
        <div className="flex items-center gap-6">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub (opens in a new tab)"><FaGithub size={18} /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn (opens in a new tab)"><FaLinkedin size={18} /></a>
          <a href="#home" className="social-link">Back to top <ArrowUp size={15} /></a>
        </div>
      </div>
    </footer>
  )
}
export default Footer
