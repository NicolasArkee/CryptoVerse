interface CommunityStatsProps {
  twitterFollowers: number | null;
  redditSubscribers: number | null;
  githubStars: number | null;
  githubForks: number | null;
}

export function CommunityStats({ twitterFollowers, redditSubscribers, githubStars, githubForks }: CommunityStatsProps) {
  const fmt = (v: number) => new Intl.NumberFormat('en-US', { notation: 'compact' }).format(v);
  const stats = [
    { label: 'Twitter', value: twitterFollowers, icon: '𝕏' },
    { label: 'Reddit', value: redditSubscribers, icon: '⊙' },
    { label: 'GitHub Stars', value: githubStars, icon: '★' },
    { label: 'GitHub Forks', value: githubForks, icon: '⑂' },
  ].filter(s => s.value && s.value > 0);

  if (stats.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map(s => (
        <div key={s.label} className="bg-dark border border-border p-3 text-center">
          <div className="text-lg mb-1">{s.icon}</div>
          <div className="text-white font-semibold tabular-nums">{fmt(s.value!)}</div>
          <div className="text-muted text-xs">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
