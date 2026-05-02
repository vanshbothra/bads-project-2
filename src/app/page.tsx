// @ts-nocheck
"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, TrendingUp, Users, Megaphone, Target, AlertTriangle,
  CheckCircle2, ArrowRight, DollarSign, ShoppingCart, BarChart3, Repeat,
} from "lucide-react";
import { KPI_SUMMARY, SEGMENTS, BUDGET_REALLOCATION } from "@/lib/data";
import { PLOTLY_DARK_LAYOUT, PLOTLY_CONFIG, CHART_COLORS } from "@/lib/plotly-theme";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const ACCENT: Record<string, string> = {
  emerald: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
  blue:    "text-blue-400 border-blue-500/30 bg-blue-500/5",
  cyan:    "text-cyan-400 border-cyan-500/30 bg-cyan-500/5",
  amber:   "text-amber-400 border-amber-500/30 bg-amber-500/5",
  violet:  "text-violet-400 border-violet-500/30 bg-violet-500/5",
  rose:    "text-rose-400 border-rose-500/30 bg-rose-500/5",
};

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub: string; accent: string }) {
  const [text, border, bg] = (ACCENT[accent] ?? ACCENT.blue).split(" ");
  return (
    <div className={`dash-stat-card rounded-xl border ${border} ${bg} p-5 relative overflow-hidden`}>
      <div className="absolute top-3 right-3 opacity-10">
        <BarChart3 className={`h-8 w-8 ${text}`} />
      </div>
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className={`mt-1.5 text-3xl font-extrabold ${text}`}>{value}</p>
      <p className="mt-1 text-xs text-slate-500">{sub}</p>
    </div>
  );
}

const SEVERITY_STYLES: Record<string, string> = {
  rose:    "border-l-rose-500 border-rose-500/20 bg-rose-500/5 text-rose-300",
  amber:   "border-l-amber-500 border-amber-500/20 bg-amber-500/5 text-amber-300",
  emerald: "border-l-emerald-500 border-emerald-500/20 bg-emerald-500/5 text-emerald-300",
  blue:    "border-l-blue-500 border-blue-500/20 bg-blue-500/5 text-blue-300",
};

function FindingCard({ title, stat, desc, tone }: { title: string; stat: string; desc: string; tone: string }) {
  const [lBorder, border, bg, text] = (SEVERITY_STYLES[tone] ?? SEVERITY_STYLES.blue).split(" ");
  return (
    <div className={`rounded-xl border ${border} border-l-4 ${lBorder} ${bg} p-4 space-y-1`}>
      <p className={`text-[11px] font-bold uppercase tracking-wider opacity-80 ${text}`}>{title}</p>
      <p className={`text-2xl font-extrabold ${text}`}>{stat}</p>
      <p className={`text-xs opacity-75 leading-relaxed ${text}`}>{desc}</p>
    </div>
  );
}

const FINDINGS = [
  { title: "Budget Misallocation",   stat: "42.7%",      desc: "of total spend goes to Affiliate — the lowest ROAS channel at 0.11",            tone: "rose" },
  { title: "Revenue Concentration",  stat: "Gini 0.673", desc: "18 Champion customers generate more revenue than the bottom 1,000 combined",     tone: "amber" },
  { title: "Conversion Opportunity", stat: "784 leads",  desc: "Engaged Browsers browse & cart but never purchase — highest near-term opportunity", tone: "emerald" },
  { title: "Discount Backfire",      stat: "−0.9pp",     desc: "Discounts causally reduce conversion rate (IPTW causal estimate)",                tone: "rose" },
  { title: "Retention Gap",          stat: "24.3%",      desc: "Only 1 in 4 customers repeats within 90 days — median time to 2nd purchase is effectively infinite", tone: "amber" },
  { title: "Best Retention Signal",  stat: "R²=0.85",    desc: "MLR confirms AOV is the dominant LTV predictor — maximize first-order basket size", tone: "blue" },
];

const QUICK_LINKS = [
  { label: "Data Audit",        href: "/audit",       icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { label: "Descriptive Stats", href: "/descriptive", icon: BarChart3,    color: "text-blue-400",    bg: "bg-blue-500/10",    border: "border-blue-500/20" },
  { label: "Customer Segments", href: "/segmentation",icon: Users,        color: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20" },
  { label: "Campaign Analysis", href: "/campaigns",   icon: Megaphone,    color: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20" },
  { label: "Lead Conversion",   href: "/leads",       icon: Target,       color: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20" },
  { label: "Retention & CLV",   href: "/retention",   icon: TrendingUp,   color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  { label: "Budget & Insights", href: "/insights",    icon: DollarSign,   color: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/20" },
  { label: "CMO Memo",          href: "/memo",        icon: CheckCircle2, color: "text-slate-400",   bg: "bg-slate-800",      border: "border-slate-700" },
];

export default function OverviewPage() {
  const segLabels  = SEGMENTS.map((s) => s.name);
  const segRevenue = SEGMENTS.map((s) => s.totalRevenue);
  const segColors  = SEGMENTS.map((s) => s.color);
  const budgetLabels      = BUDGET_REALLOCATION.map((b) => b.channel);
  const budgetCurrent     = BUDGET_REALLOCATION.map((b) => b.currentPct);
  const budgetRecommended = BUDGET_REALLOCATION.map((b) => b.recommendedPct);

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* ── Header + Credit ── */}
      <div className="rounded-2xl border border-blue-500/20 bg-slate-900/70 p-6 relative overflow-hidden"
           style={{ boxShadow: "inset 0 0 50px rgba(59,130,246,0.07)" }}>
        <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
              <LayoutDashboard className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">NovaMart Marketing Analytics</h1>
              <p className="mt-1.5 text-sm text-slate-400">
                Campaign ROI · Customer Segmentation · Lead Conversion · Customer Growth
                <span className="ml-3 inline-block rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400">
                  2,400 customers · 39 campaigns · 2,808 transactions
                </span>
              </p>
            </div>
          </div>
          {/* Credit badge */}
          <div className="flex items-center gap-2.5 rounded-xl border border-slate-700/50 bg-slate-800/60 px-4 py-2.5 shrink-0 self-start">
            <Image src="/edlightened_logo.jpeg" alt="EdLightened" width={28} height={28} className="rounded-md object-contain" />
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Dataset credit</p>
              <p className="text-xs font-semibold text-slate-300">EdLightened</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── KPI Bar ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Total Revenue"   value={`$${(KPI_SUMMARY.totalRevenue/1000).toFixed(0)}K`} sub="across 2,808 transactions" accent="emerald" />
        <StatCard label="Avg Customer LTV" value={`$${KPI_SUMMARY.avgLTV}`}   sub="CLV proxy (total spend)"    accent="blue" />
        <StatCard label="Avg AOV"          value={`$${KPI_SUMMARY.avgAOV}`}   sub="95% CI: $54.67–$63.85"     accent="cyan" />
        <StatCard label="Lead Conv. Rate"  value={`${(KPI_SUMMARY.avgLCR*100).toFixed(1)}%`} sub="30-day conversion window" accent="amber" />
        <StatCard label="Mean ROAS"        value={KPI_SUMMARY.avgROAS.toFixed(2)} sub="95% CI: 0.17–0.30"    accent="violet" />
        <StatCard label="90-day Repeat"    value={`${(KPI_SUMMARY.repeatRate90d*100).toFixed(1)}%`} sub="base retention rate" accent="rose" />
      </div>

      {/* ── Key Findings ── */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-white border-b border-slate-800 pb-2">Top Findings</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FINDINGS.map((f) => <FindingCard key={f.title} {...f} />)}
        </div>
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 cc-blue">
          <h3 className="mb-1 text-sm font-semibold text-white">Revenue by Customer Segment</h3>
          <p className="mb-3 text-xs text-slate-400">K-Means (k=4) · One-Way ANOVA: F=3,669, p&lt;0.0001 — segments are statistically distinct</p>
          <Plot
            data={[{ type: "pie", labels: segLabels, values: segRevenue, hole: 0.45, marker: { colors: segColors }, textinfo: "label+percent", textfont: { size: 11, color: "#e2e8f0" }, hovertemplate: "<b>%{label}</b><br>Revenue: $%{value:,.0f}<br>Share: %{percent}<extra></extra>" }]}
            layout={{ ...PLOTLY_DARK_LAYOUT, height: 300, margin: { t: 10, r: 10, b: 10, l: 10 }, showlegend: true, legend: { orientation: "h", y: -0.05, font: { size: 10 } } }}
            config={PLOTLY_CONFIG} style={{ width: "100%" }}
          />
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 cc-amber">
          <h3 className="mb-1 text-sm font-semibold text-white">Budget: Current vs. Recommended Allocation</h3>
          <p className="mb-3 text-xs text-slate-400">Composite score: 35% ROAS · 25% LCR · 25% Avg LTV · 15% Repeat Rate</p>
          <Plot
            data={[
              { type: "bar", name: "Current %",     x: budgetLabels, y: budgetCurrent,     marker: { color: CHART_COLORS[3] + "cc" } },
              { type: "bar", name: "Recommended %", x: budgetLabels, y: budgetRecommended, marker: { color: CHART_COLORS[1] + "cc" } },
            ]}
            layout={{ ...PLOTLY_DARK_LAYOUT, height: 300, barmode: "group", xaxis: { ...PLOTLY_DARK_LAYOUT.xaxis, tickangle: -30 }, yaxis: { ...PLOTLY_DARK_LAYOUT.yaxis, title: "Budget %" }, legend: { orientation: "h", y: 1.1 } }}
            config={PLOTLY_CONFIG} style={{ width: "100%" }}
          />
        </div>
      </div>

      {/* ── Priority Actions ── */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 overflow-hidden memo-alert-border">
        <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500/15 to-transparent border-b border-amber-500/20">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <h2 className="text-sm font-bold text-amber-300">Priority Actions — Do These Now</h2>
        </div>
        <div className="p-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          {[
            "Audit MKT2021 immediately ($999,999 spend, ROAS = 0.009)",
            "Contact 6 Champion customers not on email list",
            "Implement abandoned-cart email for 784 Engaged Browsers",
            "Begin Affiliate budget reduction: cap at 30% (from 42.7%)",
            "Tag 1,430 High-priority leads in CRM using model output",
            "Set 45-day re-engagement trigger for no-second-order customers",
          ].map((action, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">{i + 1}</span>
              <span className="text-slate-300">{action}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Navigation ── */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
          Explore the Analysis <ArrowRight className="h-4 w-4 text-slate-500" />
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
          {QUICK_LINKS.map((link) => (
            <Link key={link.href} href={link.href}
              className={`quick-nav-link flex flex-col items-center gap-2.5 rounded-xl border ${link.border} ${link.bg} p-4 text-center text-xs font-medium text-slate-400 hover:text-slate-200`}>
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${link.bg}`}>
                <link.icon className={`h-5 w-5 ${link.color}`} />
              </div>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
