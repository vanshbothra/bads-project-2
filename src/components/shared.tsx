"use client";
import { BookOpen, Lightbulb, AlertTriangle } from "lucide-react";

/* ─── MethodBox ─────────────────────────────── */
export function MethodBox({ children, label = "Why" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3.5 text-sm text-blue-200 leading-relaxed" style={{ borderLeft: "3px solid rgba(59,130,246,0.6)" }}>
      <BookOpen className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
      <div><span className="font-semibold text-blue-400">{label}: </span>{children}</div>
    </div>
  );
}

/* ─── InsightBox ────────────────────────────── */
export function InsightBox({ children, label = "Interpretation" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3.5 text-sm text-emerald-200 leading-relaxed" style={{ borderLeft: "3px solid rgba(16,185,129,0.6)" }}>
      <Lightbulb className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
      <div><span className="font-semibold text-emerald-400">{label}: </span>{children}</div>
    </div>
  );
}

/* ─── Accent config ─────────────────────────── */
type Accent = "blue" | "emerald" | "violet" | "amber" | "cyan" | "rose" | "yellow";
const A: Record<Accent, { bg: string; text: string; border: string; glow: string; phase: string }> = {
  blue:    { bg: "bg-blue-500/10",    text: "text-blue-400",    border: "border-blue-500/20",    glow: "rgba(59,130,246,0.07)",    phase: "bg-blue-500/20 text-blue-300" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", glow: "rgba(16,185,129,0.07)",    phase: "bg-emerald-500/20 text-emerald-300" },
  violet:  { bg: "bg-violet-500/10",  text: "text-violet-400",  border: "border-violet-500/20",  glow: "rgba(139,92,246,0.07)",   phase: "bg-violet-500/20 text-violet-300" },
  amber:   { bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/20",   glow: "rgba(245,158,11,0.07)",   phase: "bg-amber-500/20 text-amber-300" },
  cyan:    { bg: "bg-cyan-500/10",    text: "text-cyan-400",    border: "border-cyan-500/20",    glow: "rgba(6,182,212,0.07)",    phase: "bg-cyan-500/20 text-cyan-300" },
  rose:    { bg: "bg-rose-500/10",    text: "text-rose-400",    border: "border-rose-500/20",    glow: "rgba(239,68,68,0.07)",    phase: "bg-rose-500/20 text-rose-300" },
  yellow:  { bg: "bg-yellow-500/10",  text: "text-yellow-400",  border: "border-yellow-500/20",  glow: "rgba(234,179,8,0.07)",    phase: "bg-yellow-500/20 text-yellow-300" },
};

/* ─── PageHeader ────────────────────────────── */
export function PageHeader({ icon: Icon, title, subtitle, accent = "blue", phase }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  accent?: Accent;
  phase?: string;
}) {
  const c = A[accent];
  return (
    <div className={`rounded-2xl border ${c.border} bg-slate-900/70 p-6 relative overflow-hidden`}
         style={{ boxShadow: `inset 0 0 50px ${c.glow}` }}>
      <div className="relative flex items-start gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.bg}`}>
          <Icon className={`h-6 w-6 ${c.text}`} />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">{title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {phase && <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${c.phase}`}>{phase}</span>}
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── AlertBanner ───────────────────────────── */
export function AlertBanner({ children, type = "amber", title, pulse = false }: {
  children: React.ReactNode;
  type?: "amber" | "rose" | "blue";
  title?: string;
  pulse?: boolean;
}) {
  const styles = {
    amber: { wrap: "border-amber-500/30 bg-amber-500/5", icon: "text-amber-400", head: "text-amber-300" },
    rose:  { wrap: "border-rose-500/30 bg-rose-500/5",   icon: "text-rose-400",  head: "text-rose-300" },
    blue:  { wrap: "border-blue-500/30 bg-blue-500/5",   icon: "text-blue-400",  head: "text-blue-300" },
  };
  const s = styles[type];
  return (
    <div className={`rounded-xl border ${s.wrap} p-5 ${pulse ? "memo-alert-border" : ""}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle className={`mt-0.5 h-5 w-5 shrink-0 ${s.icon}`} />
        <div>
          {title && <p className={`font-semibold ${s.head}`}>{title}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

/* ─── ChartCard ─────────────────────────────── */
export function ChartCard({ title, method, children, insight, accent = "blue" }: {
  title: string; method: string; children: React.ReactNode; insight: string; accent?: Accent;
}) {
  const c = A[accent];
  return (
    <div className={`rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-3 overflow-hidden`}
         style={{ borderTop: `3px solid ${c.text.replace("text-", "").replace("/", "_")}` }}>
      <div>
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{method}</p>
      </div>
      {children}
      <div className="border-t border-slate-800 pt-3">
        <p className="text-xs text-slate-400 leading-relaxed"><span className="font-medium text-slate-300">Insight: </span>{insight}</p>
      </div>
    </div>
  );
}

/* ─── SectionTitle ──────────────────────────── */
export function SectionTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-lg font-semibold text-white border-b border-slate-800 pb-2">{children}</h2>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}
