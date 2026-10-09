import { motion } from "motion/react"
import { GitBranch, BriefcaseBusiness, Mail, Send } from "lucide-react"

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <section id="contact" className="bg-white py-24">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">Let’s connect</p>
          <h2 className="section-title">
            Interested in working together?
          </h2>

          <p className="mt-6 max-w-lg leading-8 text-slate-600">
            This contact section will eventually include your real email,
            BriefcaseBusiness profile, GitBranch profile, and a working message form.
          </p>

          <div className="mt-9 space-y-4">
            <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
              <span className="rounded-lg bg-blue-100 p-3 text-blue-600">
                <Mail size={20} />
              </span>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-semibold">your.email@example.com</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
              >
                <BriefcaseBusiness size={19} />
                BriefcaseBusiness
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
              >
                <GitBranch size={19} />
                GitBranch
              </button>
            </div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-7 shadow-sm"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">
              Name
              <input
                type="text"
                placeholder="Your name"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            Subject
            <input
              type="text"
              placeholder="What would you like to discuss?"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            Message
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="mt-2 w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700"
          >
            Send Message
            <Send size={18} />
          </button>
        </motion.form>
      </div>
    </section>
  )
}

export default Contact