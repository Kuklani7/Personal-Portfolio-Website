import { motion } from "motion/react"
import {
  ArrowRight,
  ChartColumn,
  Braces,
  Database,
  GitBranch,
  BriefcaseBusiness,
} from "lucide-react"

function Hero() {
  return (
    <section
      id="home"
      className="tech-grid flex min-h-screen items-center border-b border-slate-200 pt-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-20 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Available for new opportunities
          </div>

          <p className="mb-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Software Development × Data Analytics
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-slate-950 md:text-6xl">
            Building software that turns{" "}
            <span className="text-gradient">complex data</span> into useful
            experiences.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            I am a developer and data professional who enjoys creating
            responsive applications, reliable systems, and insightful
            analytics.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-600"
            >
              View Projects
              <ArrowRight size={18} />
            </a>

            <a
              href="#contact"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-500 hover:text-blue-600"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              aria-label="GitBranch placeholder"
              className="rounded-lg border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
            >
              <GitBranch size={20} />
            </button>

            <button
              type="button"
              aria-label="BriefcaseBusiness placeholder"
              className="rounded-lg border border-slate-200 bg-white p-3 text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
            >
              <BriefcaseBusiness size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-5 rounded-3xl bg-gradient-to-r from-blue-200 to-cyan-200 opacity-50 blur-3xl" />

          <div className="relative overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-3 font-mono text-xs text-slate-400">
                portfolio.js
              </span>
            </div>

            <div className="space-y-2 p-7 font-mono text-sm leading-7 text-slate-300">
              <p>
                <span className="text-purple-400">const</span>{" "}
                <span className="text-cyan-300">candidate</span> = {"{"}
              </p>
              <p className="pl-5">
                focus:{" "}
                <span className="text-green-300">
                  "software + data analytics"
                </span>
                ,
              </p>
              <p className="pl-5">
                mindset: <span className="text-green-300">"problem solver"</span>,
              </p>
              <p className="pl-5">
                status: <span className="text-green-300">"always learning"</span>,
              </p>
              <p>{"}"}</p>
            </div>

            <div className="grid grid-cols-3 border-t border-slate-800">
              <div className="border-r border-slate-800 p-5 text-center">
                <Braces className="mx-auto mb-2 text-cyan-400" size={22} />
                <p className="text-xs text-slate-400">Development</p>
              </div>

              <div className="border-r border-slate-800 p-5 text-center">
                <Database className="mx-auto mb-2 text-purple-400" size={22} />
                <p className="text-xs text-slate-400">Data</p>
              </div>

              <div className="p-5 text-center">
                <ChartColumn className="mx-auto mb-2 text-green-400" size={22} />
                <p className="text-xs text-slate-400">Analytics</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero