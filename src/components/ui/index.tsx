"use client";
import { cn } from "@/lib/utils";

// ── Progress Ring ─────────────────────────────────────────────
export function ProgressRing({
  pct, size = 80, stroke = 8, color = "#27ae60", label,
}: { pct: number; size?: number; stroke?: number; color?: string; label?: string }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (Math.min(pct, 100) / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <text x="50%" y="50%" textAnchor="middle" dy="0.35em" fontSize={size * 0.2} fontWeight="600" fill="#111">
          {Math.round(pct)}%
        </text>
      </svg>
      {label && <span className="text-xs text-gray-500">{label}</span>}
    </div>
  );
}

// ── Linear Progress Bar ───────────────────────────────────────
export function ProgressBar({
  value, max, color = "bg-green-500", className,
}: { value: number; max: number; color?: string; className?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className={cn("w-full bg-gray-100 rounded-full h-2 overflow-hidden", className)}>
      <div
        className={cn("h-full rounded-full progress-bar", color)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────
export function StatCard({
  label, value, unit, sub, color = "bg-green-50", textColor = "text-green-700", icon,
}: {
  label: string; value: string | number; unit?: string; sub?: string;
  color?: string; textColor?: string; icon?: React.ReactNode;
}) {
  return (
    <div className={cn("rounded-2xl p-4 flex flex-col gap-1", color)}>
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
        {icon}
        {label}
      </div>
      <div className={cn("text-2xl font-syne font-bold", textColor)}>
        {value}
        {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
      </div>
      {sub && <div className="text-xs text-gray-400">{sub}</div>}
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────
export function Badge({
  label, color = "bg-green-100 text-green-700",
}: { label: string; color?: string }) {
  return (
    <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full", color)}>
      {label}
    </span>
  );
}

// ── Alert ─────────────────────────────────────────────────────
export function Alert({
  message, type = "info",
}: { message: string; type?: "info" | "warning" | "success" | "error" }) {
  const styles = {
    info:    "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error:   "bg-red-50 border-red-200 text-red-800",
  };
  return (
    <div className={cn("rounded-xl border px-4 py-3 text-sm", styles[type])}>
      {message}
    </div>
  );
}

// ── Loading Spinner ───────────────────────────────────────────
export function Spinner({ size = 20 }: { size?: number }) {
  return (
    <svg className="animate-spin text-green-500" width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
    </svg>
  );
}
