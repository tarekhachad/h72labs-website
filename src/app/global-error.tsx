"use client";

/**
 * The outermost error boundary — the one `error.tsx` cannot be.
 *
 * `app/error.tsx` wraps the root layout's *children*, so it can only render once
 * that layout has succeeded. If the layout itself throws — a font load, the inline
 * theme script, anything above the page — React unmounts the whole tree and the
 * visitor gets Next's unstyled default: "Application error: a client-side
 * exception has occurred", black on white, no nav, no way back. That is precisely
 * the outcome `error.tsx` exists to prevent, and `error.tsx` cannot prevent it.
 *
 * Because the layout is gone, this file must supply its own <html> and <body>.
 * That is also why it cannot use the site's components or tokens: `globals.css`
 * is imported by the layout that just failed, so `--ground`, `--ink` and the Fira
 * faces may never have loaded. Everything here is therefore inlined and
 * self-sufficient — deliberately, not lazily. It is the one file on the site
 * allowed to hardcode a hex value, because the token that would supply it is
 * exactly what may be missing.
 *
 * Kept deliberately plain: a page rendered when the stylesheet may be absent
 * should not pretend to be designed. It states what happened and offers a way out.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#ffffff",
          color: "#111827",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
        }}
      >
        <main style={{ border: "1px solid #111827", maxWidth: "34rem", width: "100%" }}>
          <p
            style={{
              margin: 0,
              borderBottom: "1px solid #111827",
              background: "#f7f7f8",
              padding: "6px 20px",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#666b75",
            }}
          >
            H72_LABS — Error
          </p>

          <div style={{ padding: "20px" }}>
            <h1 style={{ margin: "0 0 10px", fontSize: "1.35rem", letterSpacing: "-0.02em" }}>
              Something went wrong.
            </h1>
            <p style={{ margin: "0 0 18px", lineHeight: 1.6, color: "#666b75" }}>
              The site failed to load. It is not something you did.
            </p>

            <button
              type="button"
              onClick={reset}
              style={{
                border: "1px solid #111827",
                borderRadius: 0,
                background: "transparent",
                color: "inherit",
                cursor: "pointer",
                padding: "7px 14px",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "12px",
              }}
            >
              Try again
            </button>
          </div>

          {error.digest && (
            <p
              style={{
                margin: 0,
                borderTop: "1px solid #111827",
                background: "#f7f7f8",
                padding: "8px 20px",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "11px",
                color: "#666b75",
              }}
            >
              Ref {error.digest} · contact@h72labs.com
            </p>
          )}
        </main>
      </body>
    </html>
  );
}
