"use client";

import { useCallback, useSyncExternalStore } from "react";

// MASTER.md §5.5. Committed scope, not a nice-to-have — Tarek's call against the
// recommendation to ship one mode well (UI_DESIGN §7).
//
// Three states, matching globals.css: an explicit choice stamps .light or .dark
// on <html>; no stamp means follow the OS.
//
// The source of truth is the DOM, not React state. ThemeScript stamps the class
// before first paint, so React must READ that rather than re-derive it in an
// effect — deriving it would both fight the lint rule and reintroduce the flash
// the script exists to prevent.

const KEY = "h72-theme";
const EVENT = "h72-theme-change";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  window.addEventListener(EVENT, onChange);
  return () => {
    mq.removeEventListener("change", onChange);
    window.removeEventListener(EVENT, onChange);
  };
}

function getSnapshot(): "light" | "dark" {
  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// The server has no theme to report. "light" keeps markup stable; the button's
// label is suppressed from hydration warnings below.
const getServerSnapshot = (): "light" | "dark" => "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = getSnapshot() === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.classList.toggle("light", next === "light");
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Private windows and blocked site data throw. The preference simply
      // doesn't persist; the toggle still works for this session.
    }
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "dark"}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="border border-line px-2.5 py-1 font-mono text-[11px] text-dim transition-colors hover:text-ink"
    >
      <span suppressHydrationWarning>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

/**
 * Applies the stored choice before first paint. Without this the page paints the
 * default theme and then corrects itself — a visible flash on every load.
 * Runs blocking in <head>; the string is a compile-time constant, which is what
 * makes dangerouslySetInnerHTML acceptable here.
 */
export function ThemeScript() {
  const js = `(function(){try{var v=localStorage.getItem("${KEY}");if(v==="dark"){document.documentElement.classList.add("dark")}else if(v==="light"){document.documentElement.classList.add("light")}}catch(e){}})();`;
  return <script dangerouslySetInnerHTML={{ __html: js }} />;
}
