import { CodeXml } from "lucide-react"

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-8 text-slate-400">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2 font-semibold text-white">
          <CodeXml size={19} />
          Your Name
        </div>

        <p className="text-sm">
          © 2026 Your Name. Built with React.
        </p>

        <a
          href="#home"
          className="text-sm font-medium transition hover:text-white"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}

export default Footer