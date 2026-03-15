interface WhitepaperCardProps {
  url: string;
  coinName: string;
}

export function WhitepaperCard({ url, coinName }: WhitepaperCardProps) {
  if (!url) return null;

  const isPdf = url.toLowerCase().endsWith('.pdf');
  const domain = (() => {
    try { return new URL(url).hostname; } catch { return ''; }
  })();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-dark border border-border hover:border-gold/50 p-5 max-w-xl transition-colors group"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-12 bg-[#2A2A3E] border border-border flex items-center justify-center">
          <span className="text-[0.5rem] text-muted font-mono">{isPdf ? 'PDF' : 'DOC'}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-white group-hover:text-gold transition-colors">
            {coinName} Whitepaper
          </div>
          <div className="text-xs text-muted mt-1">
            Read the original technical documentation and project vision.
          </div>
          {domain && (
            <div className="text-[0.6rem] text-subtle mt-2">{domain}</div>
          )}
        </div>
        <span className="text-muted group-hover:text-white text-sm transition-colors">&rarr;</span>
      </div>
    </a>
  );
}
