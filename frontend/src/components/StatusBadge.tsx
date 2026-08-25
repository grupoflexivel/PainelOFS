import type { ColorToken } from "../types";
import { bgClassFor, borderClassFor } from "../lib/colorTokens";

interface StatusBadgeProps {
  label: string;
  colorToken: ColorToken;
}

export function StatusBadge({ label, colorToken }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-slate-600">
      <span
        data-testid="status-dot"
        className={`h-4 w-4 rounded-sm border ${borderClassFor(colorToken)} ${bgClassFor(colorToken)}`}
      />
      {label}
    </span>
  );
}
