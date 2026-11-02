import { useEffect, useId, useRef, useState } from "react"
import { ArrowRight, ArrowUpRight, CornerDownLeft, Terminal } from "lucide-react"
import { useReducedMotion } from "motion/react"
import useTheme from "../hooks/useTheme"
import Spotlight from "./Spotlight"
import { completeCommand, createWelcomeEntry, interpretCommand, normalizeCommand } from "../utils/terminalCommands"
import "../styles/terminal.css"

function OutputLine({ line }) {
  return (
    <div className={`terminal-line terminal-tone-${line.tone}${line.label ? " terminal-help-line" : ""}`}>
      {line.label && <span className="terminal-command-name">{line.label}{" "}</span>}
      {line.href ? (
        <a href={line.href} target={line.external ? "_blank" : undefined} rel={line.external ? "noopener noreferrer" : undefined}>
          {line.text}{line.external && <><ArrowUpRight size={12} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></>}
        </a>
      ) : <span>{line.text}</span>}
    </div>
  )
}

function TerminalEntry({ entry, bootCancelled }) {
  const reduced = useReducedMotion()
  const welcome = entry.id === 0
  return (
    <div className={`terminal-entry${welcome ? " terminal-welcome" : ""}${welcome && (bootCancelled || reduced) ? " terminal-boot-cancelled" : ""}`}>
      {entry.command && <div className="terminal-echo"><span aria-hidden="true">❯</span><span className="sr-only">Command: </span><span className={welcome ? "terminal-boot-command" : undefined}>{entry.command}</span></div>}
      {entry.lines.map((line, index) => (
        <div key={index} className={welcome ? "terminal-welcome-line" : undefined} style={welcome ? { "--terminal-line": index } : undefined}>
          <OutputLine line={line} />
        </div>
      ))}
    </div>
  )
}

export default function InteractiveTerminal() {
  const { theme } = useTheme()
  const reduced = useReducedMotion()
  const [entries, setEntries] = useState(() => [createWelcomeEntry()])
  const [input, setInput] = useState("")
  const [announcement, setAnnouncement] = useState("")
  const [bootCancelled, setBootCancelled] = useState(false)
  const inputRef = useRef(null)
  const outputRef = useRef(null)
  const nextId = useRef(1)
  const history = useRef([])
  const historyIndex = useRef(null)
  const draft = useRef("")
  const instructionsId = useId()
  const headingId = useId()

  useEffect(() => {
    // Scroll only the transcript, never the page or another section.
    outputRef.current.scrollTop = outputRef.current.scrollHeight
  }, [entries])

  function append(entry) { setEntries(current => [...current, entry].slice(-60)) }

  function execute(value) {
    const result = interpretCommand(value, { theme })
    if (!result) return
    setBootCancelled(true)
    const command = value.trim()
    const id = nextId.current++
    const previous = history.current.at(-1)
    if (!previous || normalizeCommand(previous) !== normalizeCommand(command)) {
      history.current = [...history.current, command].slice(-100)
    }
    historyIndex.current = null
    draft.current = ""
    setInput("")
    if (result.action === "clear") setEntries([])
    else append({ id, command, lines: result.lines })
    setAnnouncement(`Command ${id}. ${result.summary}`)

    if (result.action === "external") window.open(result.href, "_blank", "noopener,noreferrer")
    if (result.action === "navigate") {
      const section = document.getElementById(result.section)
      if (section) {
        window.history.pushState(null, "", `#${result.section}`)
        section.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" })
        // A navigation command transfers keyboard focus to its destination.
        const heading = section.querySelector("h2")
        if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }) }
      }
    } else inputRef.current.focus({ preventScroll: true })
  }

  function onKeyDown(event) {
    if (event.nativeEvent.isComposing || event.altKey || event.ctrlKey || event.metaKey || (event.shiftKey && event.key !== "Tab")) return
    if (event.key === "ArrowUp" && history.current.length) {
      event.preventDefault()
      if (historyIndex.current === null) { draft.current = input; historyIndex.current = history.current.length }
      historyIndex.current = Math.max(0, historyIndex.current - 1)
      setInput(history.current[historyIndex.current])
    } else if (event.key === "ArrowDown" && historyIndex.current !== null) {
      event.preventDefault()
      historyIndex.current++
      if (historyIndex.current >= history.current.length) { historyIndex.current = null; setInput(draft.current) }
      else setInput(history.current[historyIndex.current])
    } else if (event.key === "Tab" && !event.shiftKey) {
      const { matches, completion } = completeCommand(input)
      // Empty, unknown, and already-complete input retain normal Tab navigation.
      if (!matches.length || (matches.length === 1 && input === completion)) return
      event.preventDefault()
      historyIndex.current = null
      setInput(completion)
      if (matches.length > 1) {
        append({ id: nextId.current++, lines: [{ text: `Suggestions: ${matches.join(" · ")}`, tone: "info" }] })
        setAnnouncement(`Suggestions: ${matches.join(", ")}. Shift+Tab moves focus away.`)
      }
    }
  }

  return (
    <Spotlight as="article" className="developer-terminal" aria-labelledby={headingId}>
      <header className="terminal-titlebar">
        <div className="terminal-window-dots" aria-hidden="true"><span /><span /><span /></div>
        <h2 id={headingId}>rachit@portfolio:~</h2>
        <Terminal size={15} className="terminal-header-icon" aria-hidden="true" />
      </header>
      <div ref={outputRef} className="terminal-output" role="region" aria-label="Terminal output" tabIndex={0}>
        {entries.map(entry => <TerminalEntry key={entry.id} entry={entry} bootCancelled={bootCancelled} />)}
      </div>
      <form className="terminal-form" onSubmit={event => { event.preventDefault(); execute(input) }}>
        <label className="sr-only" htmlFor={`${headingId}-input`}>Portfolio terminal command</label>
        <div className="terminal-input-row">
          <span className="terminal-prompt" aria-hidden="true">~ <span>❯</span></span>
          <input ref={inputRef} id={`${headingId}-input`} value={input} onChange={event => { setBootCancelled(true); historyIndex.current = null; setInput(event.target.value) }} onKeyDown={onKeyDown}
            type="text" autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck={false} maxLength={240}
            placeholder="Type a command…" aria-describedby={instructionsId} />
          <button type="submit" className="terminal-submit" aria-label="Run command"><CornerDownLeft size={16} /></button>
        </div>
      </form>
      <div className="terminal-quick-commands" role="group" aria-label="Try a command">
        <span>Try</span>{["help", "projects", "contact"].map(command => <button key={command} type="button" onClick={() => execute(command)} aria-label={`Run ${command} command`}>{command}<ArrowRight size={10} aria-hidden="true" /></button>)}
      </div>
      <footer className="terminal-status"><span><i aria-hidden="true" />PORTFOLIO TERMINAL</span><span>↑↓ history · Tab complete</span></footer>
      <p id={instructionsId} className="sr-only">Press Enter to run a command. Use Up and Down arrows for history. Tab completes a matching prefix. An empty or complete command, or Shift+Tab, moves focus normally. This terminal accepts predefined portfolio commands.</p>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
    </Spotlight>
  )
}
