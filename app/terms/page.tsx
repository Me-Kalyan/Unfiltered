import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for Unfiltered.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--warm-bg)] px-4 py-12 text-[var(--warm-ink)] dark:bg-[#120f0d] dark:text-[#efe0cf] sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-editorial text-4xl font-semibold">Terms of Use</h1>
        <p className="mt-3 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Last updated: February 6, 2026</p>

        <div className="mt-8 space-y-6 rounded-2xl border border-[#decfbe] bg-[var(--warm-surface)] p-6 dark:border-[#342a24] dark:bg-[#1b1512]">
          <section>
            <h2 className="text-xl font-semibold">Service usage</h2>
            <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Use the service lawfully and do not attempt unauthorized access or abuse of systems.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Content ownership</h2>
            <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">You retain ownership of your journal content. You grant only limited rights needed to provide the service.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Account and billing</h2>
            <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Paid plans renew based on your billing cycle. You may cancel according to plan terms.</p>
          </section>
        </div>

        <Link href="/landing" className="mt-6 inline-block text-sm font-medium text-[#c67a53]">Back to landing</Link>
      </div>
    </main>
  )
}
