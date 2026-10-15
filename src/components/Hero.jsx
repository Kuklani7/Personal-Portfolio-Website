import { ArrowRight, Braces, ChartColumn, Database, FileText, GitBranch, Terminal } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"
import Reveal from "./Reveal"
import { profile } from "../data/profile"

function Hero() {
  return (
    <section id="home" aria-labelledby="hero-heading" className="hero-section">
      <div className="container-shell hero-grid">
        <Reveal>
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
        </Reveal>
        <Reveal className="editor-wrap">
          <div className="editor">
            <div className="editor-titlebar">
              <div aria-hidden="true" className="editor-dots"><span className="bg-[#f18080]" /><span className="bg-[#e8c477]" /><span className="bg-[#70bfa3]" /></div>
              <span>rachit / workspace</span><Terminal size={13} aria-hidden="true" />
            </div>
            <div className="editor-tab"><Braces size={13} className="text-blue-400" /> engineer.js</div>
            <div className="editor-code" aria-label="Code illustration of Rachit's engineering focus">
              <div className="code-line"><code className="syntax-comment">// Thoughtful code. Useful solutions.</code></div>
              <div className="code-line"><code><span className="syntax-keyword">const</span> <span className="syntax-name">engineer</span> = {"{"}</code></div>
              <div className="code-line"><code>{"  "}name: <span className="syntax-string">"Rachit Kuklani"</span>,</code></div>
              <div className="code-line"><code>{"  "}focus: [</code></div>
              <div className="code-line"><code>{"    "}<span className="syntax-string">"Software development"</span>,</code></div>
              <div className="code-line"><code>{"    "}<span className="syntax-string">"Data analytics"</span></code></div>
              <div className="code-line"><code>{"  "}],</code></div>
              <div className="code-line"><code>{"  "}mindset: <span className="syntax-string">"Problem solver"</span>,</code></div>
              <div className="code-line"><code>{"  "}status: <span className="syntax-string">"Always learning"</span></code></div>
              <div className="code-line"><code>{"};"}</code></div>
            </div>
            <div className="editor-status"><span className="flex items-center gap-1.5"><GitBranch size={12} />main</span><span>JavaScript · UTF-8</span></div>
          </div>
          <p className="mt-5 text-center font-mono text-[10px] text-slate-400">Where engineering meets curiosity.</p>
        </Reveal>
      </div>
      <div className="container-shell hero-footnote">
        <span className="mr-auto text-slate-300">Built with purpose. Driven by curiosity.</span>
        <span className="flex items-center gap-2"><Braces size={14} />Development</span>
        <span className="flex items-center gap-2"><Database size={14} />Data</span>
        <span className="flex items-center gap-2"><ChartColumn size={14} />Analytics</span>
      </div>
    </section>
  )
}
export default Hero
