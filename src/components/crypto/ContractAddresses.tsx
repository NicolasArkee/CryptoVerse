'use client';

import { useState } from 'react';

interface ContractAddressesProps {
  platforms: Record<string, string>;
}

function truncateAddress(addr: string): string {
  if (addr.length <= 16) return addr;
  return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
}

function ChainName({ chain }: { chain: string }) {
  const formatted = chain
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  return <span>{formatted}</span>;
}

export function ContractAddresses({ platforms }: ContractAddressesProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const entries = Object.entries(platforms).filter(([, addr]) => addr && addr.length > 0);
  if (entries.length === 0) return null;

  async function handleCopy(chain: string, address: string) {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedKey(chain);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // fallback
    }
  }

  return (
    <div className="space-y-2">
      {entries.map(([chain, address]) => (
        <div key={chain} className="flex items-center gap-3 bg-dark border border-border px-3 py-2">
          <span className="text-xs text-muted w-24 shrink-0">
            <ChainName chain={chain} />
          </span>
          <code className="text-xs text-white font-mono flex-1 truncate" title={address}>
            {truncateAddress(address)}
          </code>
          <button
            onClick={() => handleCopy(chain, address)}
            className="text-xs px-2 py-1 border border-border hover:border-green/50 text-muted hover:text-white transition-colors shrink-0"
          >
            {copiedKey === chain ? 'Copied!' : 'Copy'}
          </button>
        </div>
      ))}
    </div>
  );
}
