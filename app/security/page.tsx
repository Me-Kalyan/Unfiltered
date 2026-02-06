import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Security",
  description: "Security practices for Unfiltered.",
}

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-[var(--warm-bg)] px-4 py-12 text-[var(--warm-ink)] dark:bg-[#120f0d] dark:text-[#efe0cf] sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-editorial text-4xl font-semibold">Security</h1>
        <p className="mt-3 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Last updated: February 6, 2026</p>

        <div className="mt-8 space-y-6 rounded-2xl border border-[#decfbe] bg-[var(--warm-surface)] p-6 dark:border-[#342a24] dark:bg-[#1b1512]">
          <section>
            <h2 className="text-xl font-semibold">Access protection</h2>
            <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Modern authentication and secure session handling are used to protect accounts.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Data protection</h2>
            <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Data in transit is encrypted. Sensitive operations are permission-checked server side.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Incident response</h2>
            <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Security issues are triaged and remediated through a documented response process.</p>
          </section>
        </div>

        <Link href="/landing" className="mt-6 inline-block text-sm font-medium text-[#c67a53]">Back to landing</Link>
      </div>
    </main>
  )
}
