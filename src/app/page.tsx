// Phase 1 shell only. Real structure is Phase 2 (ROADMAP).
// This page exists to prove the tokens resolve in both themes — nothing more.
export default function Home() {
  return (
    <main className="p-page">
      <div className="mx-auto max-w-[1120px] border border-line">
        <header className="flex items-center justify-between border-b border-line px-6 py-4">
          <span className="font-mono text-[13px] font-medium tracking-[0.2em]">
            H72_LABS
          </span>
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-dim">
            Phase 1 — shell
          </span>
        </header>

        <div className="px-6 py-16">
          <h1 className="max-w-[19ch] text-[clamp(1.7rem,3.9vw,2.75rem)] font-medium leading-[1.22] tracking-[-0.02em]">
            H72 Labs builds AI tools that turn noisy information into clarity.
          </h1>
        </div>

        <div className="border-t border-line bg-surface px-6 py-2 font-mono text-[11px] tracking-[0.14em] uppercase text-dim">
          Tokens
        </div>

        <div className="grid grid-cols-2 gap-cell border-t border-line p-cell sm:grid-cols-3 lg:grid-cols-6">
          {(["ground", "surface", "ink", "dim", "line", "accent"] as const).map((t) => (
            <div key={t} className="border border-line">
              <div className="h-16" style={{ background: `var(--${t})` }} />
              <div className="border-t border-line px-2 py-1 font-mono text-[11px] text-dim">
                --{t}
              </div>
            </div>
          ))}
        </div>

        <footer className="flex items-center justify-between border-t border-line px-6 py-3 font-mono text-[11px] tracking-[0.06em] text-dim">
          <span>Hachad Solutions LLC</span>
          <span className="text-accent">accent</span>
        </footer>
      </div>
    </main>
  );
}
