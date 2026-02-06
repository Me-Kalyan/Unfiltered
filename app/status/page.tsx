import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Status",
  description: "Current service status for Unfiltered.",
}

const services = [
  { name: "API", status: "Operational" },
  { name: "Web App", status: "Operational" },
  { name: "Sync", status: "Operational" },
  { name: "Notifications", status: "Operational" },
]

export default function StatusPage() {
  return (
    <main className="min-h-screen bg-[var(--warm-bg)] px-4 py-12 text-[var(--warm-ink)] dark:bg-[#120f0d] dark:text-[#efe0cf] sm:px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-editorial text-4xl font-semibold">System Status</h1>
        <p className="mt-3 text-sm text-[var(--warm-muted)] dark:text-[#bfa89a]">All systems currently normal</p>

        <div className="mt-8 rounded-2xl border border-[#decfbe] bg-[var(--warm-surface)] p-6 dark:border-[#342a24] dark:bg-[#1b1512]">
          <div className="space-y-3">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between rounded-xl border border-[#e6d8c9] bg-[#fffdf9] px-4 py-3 dark:border-[#342a24] dark:bg-[#17110f]">
                <span className="font-medium">{service.name}</span>
                <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">{service.status}</span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/landing" className="mt-6 inline-block text-sm font-medium text-[#c67a53]">Back to landing</Link>
      </div>
    </main>
  )
}
