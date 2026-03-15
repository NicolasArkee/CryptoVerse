interface WatchlistBadgeProps {
  users: number | null;
}

export function WatchlistBadge({ users }: WatchlistBadgeProps) {
  if (!users || users === 0) return null;

  return (
    <span className="inline-flex items-center gap-1 text-[0.6rem] text-muted bg-[#1A1A2E] border border-border px-2 py-0.5">
      <span className="text-gold">&#9733;</span>
      {users.toLocaleString()} watching
    </span>
  );
}
