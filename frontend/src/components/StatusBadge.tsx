import type { ColorToken } from "../types";
import { dotClassFor } from "../lib/colorTokens";

interface StatusBadgeProps {
  label: string;
  colorToken: ColorToken;
}

export function StatusBadge({ label, colorToken }: StatusBadgeProps) {
  const dotClass = dotClassFor(colorToken);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-slate-300">
      <span data-testid="status-dot" className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
}
