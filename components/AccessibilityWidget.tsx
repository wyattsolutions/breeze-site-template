"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import {
  X,
  Type,
  Eye,
  BookOpen,
  MoveVertical,
  ALargeSmall,
  Link2,
  Pause,
  Minus,
  RotateCcw,
  SunMoon,
} from "lucide-react"
import "./accessibility-widget.css"

/* ─── Types ──────────────────────────────── */

interface A11yPreferences {
  textSize: "default" | "large" | "xl" | "xxl"
  highContrast: boolean
  dyslexiaFont: boolean
  lineSpacing: boolean
  letterSpacing: boolean
  highlightLinks: boolean
  pauseAnimations: boolean
  readingGuide: boolean
}

const DEFAULTS: A11yPreferences = {
  textSize: "default",
  highContrast: false,
  dyslexiaFont: false,
  lineSpacing: false,
  letterSpacing: false,
  highlightLinks: false,
  pauseAnimations: false,
  readingGuide: false,
}

const STORAGE_KEY = "a11y-preferences"

const TEXT_SIZES: { value: A11yPreferences["textSize"]; label: string }[] = [
  { value: "default", label: "A" },
  { value: "large", label: "A+" },
  { value: "xl", label: "A++" },
  { value: "xxl", label: "A+++" },
]

/* ─── Apply preferences to <html> ────────── */

function applyToDOM(p: A11yPreferences) {
  const html = document.documentElement

  // Text size
  if (p.textSize === "default") {
    html.removeAttribute("data-a11y-text-size")
  } else {
    html.setAttribute("data-a11y-text-size", p.textSize)
  }

  // Boolean data attributes
  const boolAttrs: [keyof A11yPreferences, string][] = [
    ["highContrast", "data-a11y-contrast"],
    ["dyslexiaFont", "data-a11y-font"],
    ["lineSpacing", "data-a11y-line-spacing"],
    ["letterSpacing", "data-a11y-letter-spacing"],
    ["highlightLinks", "data-a11y-highlight-links"],
    ["pauseAnimations", "data-a11y-motion"],
  ]

  for (const [key, attr] of boolAttrs) {
    if (p[key]) {
      const val =
        attr === "data-a11y-contrast"
          ? "high"
          : attr === "data-a11y-font"
            ? "dyslexia"
            : attr === "data-a11y-motion"
              ? "reduced"
              : "true"
      html.setAttribute(attr, val)
    } else {
      html.removeAttribute(attr)
    }
  }
}

/* ─── Toggle Row ─────────────────────────── */

function ToggleRow({
  icon: Icon,
  label,
  active,
  onToggle,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  active: boolean
  onToggle: () => void
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </div>
      <button
        role="switch"
        aria-checked={active}
        aria-label={`${label}: ${active ? "on" : "off"}`}
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          active ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            active ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )
}

/* ─── Main Widget ────────────────────────── */

export function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [prefs, setPrefs] = useState<A11yPreferences>(DEFAULTS)
  const [guideY, setGuideY] = useState(-100)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // Load saved preferences on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<A11yPreferences>
        const merged = { ...DEFAULTS, ...parsed }
        setPrefs(merged)
        applyToDOM(merged)
      }
    } catch {
      // Bad data in localStorage
    }
  }, [])

  // Update a single preference
  const updatePref = useCallback(
    <K extends keyof A11yPreferences>(key: K, value: A11yPreferences[K]) => {
      setPrefs((prev) => {
        const next = { ...prev, [key]: value }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        applyToDOM(next)
        return next
      })
    },
    [],
  )

  // Reset all preferences
  const resetAll = useCallback(() => {
    setPrefs(DEFAULTS)
    localStorage.removeItem(STORAGE_KEY)
    applyToDOM(DEFAULTS)
  }, [])

  // Reading guide: track cursor Y
  useEffect(() => {
    if (!prefs.readingGuide) return
    const onMove = (e: MouseEvent) => setGuideY(e.clientY)
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [prefs.readingGuide])

  // Focus trap + Escape when panel is open
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener("keydown", onKeyDown)

    const timer = setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("button")?.focus()
    }, 50)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      clearTimeout(timer)
    }
  }, [isOpen])

  const hasActive =
    prefs.textSize !== "default" ||
    prefs.highContrast ||
    prefs.dyslexiaFont ||
    prefs.lineSpacing ||
    prefs.letterSpacing ||
    prefs.highlightLinks ||
    prefs.pauseAnimations ||
    prefs.readingGuide

  return (
    <div data-a11y-widget="">
      {/* ── Floating Trigger ── */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
        className="fixed bottom-6 right-6 z-[9999] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <Eye className="h-6 w-6" />
        {hasActive && (
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-amber-400" />
        )}
      </button>

      {/* ── Panel ── */}
      {isOpen && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility settings panel"
          aria-modal="true"
          className="fixed bottom-20 right-6 z-[9999] w-80 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border bg-background shadow-2xl max-md:inset-x-0 max-md:bottom-0 max-md:right-auto max-md:w-full max-md:max-h-[80vh] max-md:rounded-b-none max-md:rounded-t-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-5 py-4">
            <h2 className="text-base font-semibold text-foreground">
              Accessibility Settings
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close accessibility settings"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Controls */}
          <div className="space-y-0 px-5 py-3">
            {/* Text Size (stepped) */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Type className="h-5 w-5 shrink-0 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Text Size
                </span>
              </div>
              <div className="flex gap-1">
                {TEXT_SIZES.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updatePref("textSize", value)}
                    aria-label={`Text size: ${value}`}
                    aria-pressed={prefs.textSize === value}
                    className={`flex h-8 items-center justify-center rounded-md px-2 text-xs font-bold transition-colors ${
                      prefs.textSize === value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <ToggleRow
              icon={SunMoon}
              label="High Contrast"
              active={prefs.highContrast}
              onToggle={() => updatePref("highContrast", !prefs.highContrast)}
            />
            <ToggleRow
              icon={BookOpen}
              label="Dyslexia Font"
              active={prefs.dyslexiaFont}
              onToggle={() => updatePref("dyslexiaFont", !prefs.dyslexiaFont)}
            />
            <ToggleRow
              icon={MoveVertical}
              label="Line Spacing"
              active={prefs.lineSpacing}
              onToggle={() => updatePref("lineSpacing", !prefs.lineSpacing)}
            />
            <ToggleRow
              icon={ALargeSmall}
              label="Letter Spacing"
              active={prefs.letterSpacing}
              onToggle={() =>
                updatePref("letterSpacing", !prefs.letterSpacing)
              }
            />
            <ToggleRow
              icon={Link2}
              label="Highlight Links"
              active={prefs.highlightLinks}
              onToggle={() =>
                updatePref("highlightLinks", !prefs.highlightLinks)
              }
            />
            <ToggleRow
              icon={Pause}
              label="Pause Animations"
              active={prefs.pauseAnimations}
              onToggle={() =>
                updatePref("pauseAnimations", !prefs.pauseAnimations)
              }
            />
            <ToggleRow
              icon={Minus}
              label="Reading Guide"
              active={prefs.readingGuide}
              onToggle={() =>
                updatePref("readingGuide", !prefs.readingGuide)
              }
            />

            {/* Reset */}
            {hasActive && (
              <button
                onClick={resetAll}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
                Reset All
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Reading Guide Overlay ── */}
      {prefs.readingGuide && (
        <div
          className="pointer-events-none fixed inset-x-0 top-0 z-[9998] h-10"
          style={{
            transform: `translateY(${guideY - 20}px)`,
            background:
              "linear-gradient(180deg, transparent 0%, hsla(var(--primary) / 0.15) 30%, hsla(var(--primary) / 0.15) 70%, transparent 100%)",
            transition: "transform 75ms linear",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}
