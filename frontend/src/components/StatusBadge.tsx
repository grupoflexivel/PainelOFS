import type { ColorToken } from "../types";
import { bgClassFor, borderClassFor } from "../lib/colorTokens";

interface StatusBadgeProps {
  label: string;
  colorToken: ColorToken;
}

export function StatusBadge({ label, colorToken }: StatusBadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-muted">
      <span
        data-testid="status-dot"
        className={`h-3.5 w-3.5 rounded-sm border ${borderClassFor(colorToken)} ${bgClassFor(colorToken)}`}
      />
      {label}
    </span>
  );
}
