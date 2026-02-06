import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Unfiltered handles your data and protects your privacy.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--warm-bg)] px-4 py-12 text-[var(--warm-ink)] dark:bg-[#120f0d] dark:text-[#efe0cf] sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-editorial text-4xl font-semibold">Privacy Policy</h1>
        <p className="mt-3 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Last updated: February 6, 2026</p>

        <div className="mt-8 space-y-6 rounded-2xl border border-[#decfbe] bg-[var(--warm-surface)] p-6 dark:border-[#342a24] dark:bg-[#1b1512]">
          <section>
            <h2 className="text-xl font-semibold">Data we collect</h2>
            <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Account details, journal content you create, and usage metadata required to keep the product functional.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">How we use data</h2>
            <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">To provide journaling features, syncing, reminders, security protection, and support.</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold">Your controls</h2>
            <p className="mt-2 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">You can export data, update privacy settings per entry, and request deletion of your account.</p>
          </section>
        </div>

        <p className="mt-6 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">Questions about privacy? Contact support from settings.</p>
        <Link href="/landing" className="mt-6 inline-block text-sm font-medium text-[#c67a53]">Back to landing</Link>
      </div>
    </main>
  )
}
