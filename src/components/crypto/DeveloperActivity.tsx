import type { CoinDetail } from '@/libs/CoinGecko';

interface DeveloperActivityProps {
  data: CoinDetail['developer_data'];
  repoUrls?: string[];
}

function CommitSparkline({ series }: { series: number[] }) {
  if (!series || series.length === 0) return null;
  const max = Math.max(...series, 1);
  const barW = 3;
  const gap = 1;
  const h = 24;
  const w = series.length * (barW + gap);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block">
      {series.map((v, i) => {
        const barH = Math.max((v / max) * h, 1);
        return (
          <rect
            key={i}
            x={i * (barW + gap)}
            y={h - barH}
            width={barW}
            height={barH}
            fill="#00D395"
            opacity={v > 0 ? 1 : 0.2}
          />
        );
      })}
    </svg>
  );
}

export function DeveloperActivity({ data, repoUrls }: DeveloperActivityProps) {
  if (!data) return null;

  const hasAny = data.stars || data.forks || data.subscribers || data.total_issues || data.commit_count_4_weeks || data.pull_requests_merged;
  if (!hasAny) return null;

  const openIssues = (data.total_issues ?? 0) - (data.closed_issues ?? 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {data.stars != null && data.stars > 0 && (
        <div className="bg-dark border border-border p-3">
          <div className="text-[0.65rem] text-muted mb-1">Stars</div>
          <div className="text-base font-semibold text-white tabular-nums">{data.stars.toLocaleString()}</div>
        </div>
      )}
      {data.forks != null && data.forks > 0 && (
        <div className="bg-dark border border-border p-3">
          <div className="text-[0.65rem] text-muted mb-1">Forks</div>
          <div className="text-base font-semibold text-white tabular-nums">{data.forks.toLocaleString()}</div>
        </div>
      )}
      {data.subscribers != null && data.subscribers > 0 && (
        <div className="bg-dark border border-border p-3">
          <div className="text-[0.65rem] text-muted mb-1">Watchers</div>
          <div className="text-base font-semibold text-white tabular-nums">{data.subscribers.toLocaleString()}</div>
        </div>
      )}
      {data.pull_requests_merged != null && data.pull_requests_merged > 0 && (
        <div className="bg-dark border border-border p-3">
          <div className="text-[0.65rem] text-muted mb-1">PRs Merged</div>
          <div className="text-base font-semibold text-white tabular-nums">{data.pull_requests_merged.toLocaleString()}</div>
        </div>
      )}
      {data.pull_request_contributors != null && data.pull_request_contributors > 0 && (
        <div className="bg-dark border border-border p-3">
          <div className="text-[0.65rem] text-muted mb-1">Contributors</div>
          <div className="text-base font-semibold text-white tabular-nums">{data.pull_request_contributors.toLocaleString()}</div>
        </div>
      )}
      {data.total_issues != null && data.total_issues > 0 && (
        <div className="bg-dark border border-border p-3">
          <div className="text-[0.65rem] text-muted mb-1">Issues</div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-green tabular-nums">{data.closed_issues ?? 0} closed</span>
            <span className="text-sm text-muted tabular-nums">{openIssues} open</span>
          </div>
          {data.total_issues > 0 && (
            <div className="mt-1 h-1.5 bg-[#2A2A3E] overflow-hidden">
              <div
                className="h-full bg-green"
                style={{ width: `${((data.closed_issues ?? 0) / data.total_issues) * 100}%` }}
              />
            </div>
          )}
        </div>
      )}
      {data.commit_count_4_weeks != null && data.commit_count_4_weeks > 0 && (
        <div className="bg-dark border border-border p-3">
          <div className="text-[0.65rem] text-muted mb-1">Commits (4w)</div>
          <div className="text-base font-semibold text-white tabular-nums">{data.commit_count_4_weeks.toLocaleString()}</div>
          {data.last_4_weeks_commit_activity_series?.length > 0 && (
            <div className="mt-2">
              <CommitSparkline series={data.last_4_weeks_commit_activity_series} />
            </div>
          )}
        </div>
      )}
      {data.code_additions_deletions_4_weeks && (data.code_additions_deletions_4_weeks.additions || data.code_additions_deletions_4_weeks.deletions) && (
        <div className="bg-dark border border-border p-3">
          <div className="text-[0.65rem] text-muted mb-1">Code Changes (4w)</div>
          <div className="flex items-center gap-2 text-sm tabular-nums">
            {data.code_additions_deletions_4_weeks.additions != null && (
              <span className="text-green">+{data.code_additions_deletions_4_weeks.additions.toLocaleString()}</span>
            )}
            {data.code_additions_deletions_4_weeks.deletions != null && (
              <span className="text-red">{data.code_additions_deletions_4_weeks.deletions.toLocaleString()}</span>
            )}
          </div>
        </div>
      )}
      {repoUrls && repoUrls.filter(Boolean).length > 0 && (
        <div className="bg-dark border border-border p-3 flex items-center">
          <a
            href={repoUrls[0]!}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green text-sm hover:underline"
          >
            View on GitHub &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
