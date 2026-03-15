interface ScoreDashboardProps {
  overall: number;
  community: number;
  developer: number;
  liquidity: number;
  publicInterest: number;
}

function ScoreBar({ label, value, max = 100, color }: { label: string; value: number; max?: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-[#2A2A3E] overflow-hidden">
        <div className="h-full transition-all" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs text-white tabular-nums w-10 text-right">{value.toFixed(1)}</span>
    </div>
  );
}

export function ScoreDashboard({ overall, community, developer, liquidity, publicInterest }: ScoreDashboardProps) {
  const hasScores = overall > 0 || community > 0 || developer > 0 || liquidity > 0 || publicInterest > 0;
  if (!hasScores) return null;

  return (
    <div className="bg-dark border border-border p-4 max-w-xl space-y-3">
      <ScoreBar label="Overall" value={overall} color="#00D395" />
      <ScoreBar label="Community" value={community} color="#3B82F6" />
      <ScoreBar label="Developer" value={developer} color="#A855F7" />
      <ScoreBar label="Liquidity" value={liquidity} color="#F59E0B" />
      <ScoreBar label="Public Interest" value={publicInterest} color="#EF4444" />
    </div>
  );
}
