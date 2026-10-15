import { ArrowRight, Braces, ChartColumn, Database, FileText } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import Reveal from "./Reveal"
import HeroIntro from "./HeroIntro"
import AmbientHero from "./AmbientHero"
import HeroVisual from "./HeroVisual"
import { profile } from "../data/profile"

function Hero() {
  return (
    <AmbientHero>
      <div className="container-shell hero-grid">
        <HeroIntro>
          <div className="availability"><span className="availability-dot" />Available for new opportunities</div>
          <p className="mt-8 mb-5 font-mono text-xs text-slate-400">Software Development <span className="px-1 text-blue-400">/</span> Data Analytics</p>
          <h1 id="hero-heading" className="hero-title">
            Building <span className="text-gradient">intelligent software</span> that solves real-world problems.
          </h1>
          <p className="body-copy mt-6 max-w-xl text-base sm:text-lg">
            I specialize in developing efficient applications, reliable systems,
            and intelligent solutions, with a passion for solving complex
            engineering challenges.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="button button-primary">View Projects <ArrowRight size={17} /></a>
            <a href="#contact" className="button button-secondary">Contact Me</a>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-1">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link"><FaGithub size={17} />GitHub<span className="sr-only"> (opens in a new tab)</span></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin size={17} />LinkedIn<span className="sr-only"> (opens in a new tab)</span></a>
            {profile.resumeUrl ? (
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="social-link"><FileText size={16} />Résumé<span className="sr-only"> (opens in a new tab)</span></a>
            ) : (
              <a href={`mailto:${profile.email}?subject=Resume%20request`} className="social-link"><FileText size={16} />Request résumé</a>
            )}
          </div>
        </HeroIntro>
        <Reveal className="min-w-0">
          <HeroVisual />
          <p className="mt-5 text-center font-mono text-[10px] text-slate-400">Where engineering meets curiosity.</p>
        </Reveal>
      </div>
      <div className="container-shell hero-footnote">
        <span className="mr-auto text-slate-300">Built with purpose. Driven by curiosity.</span>
        <span className="flex items-center gap-2"><Braces size={14} />Development</span>
        <span className="flex items-center gap-2"><Database size={14} />Data</span>
        <span className="flex items-center gap-2"><ChartColumn size={14} />Analytics</span>
      </div>
    </AmbientHero>
  )
}
export default Hero
