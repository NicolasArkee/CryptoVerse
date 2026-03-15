import type { CoinDetail } from '@/libs/CoinGecko';

interface SocialLinksProps {
  links: CoinDetail['links'];
  communityData: CoinDetail['community_data'];
}

function SocialCard({ label, value, href, color }: { label: string; value?: string | number | null; href?: string; color?: string }) {
  if (!href && !value) return null;

  const content = (
    <div className="bg-dark border border-border p-3 hover:border-border-light transition-colors">
      <div className="text-[0.65rem] text-muted mb-1">{label}</div>
      {value != null && (
        <div className={`text-sm font-semibold tabular-nums ${color || 'text-white'}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      )}
      {href && (
        <div className="text-[0.6rem] text-green mt-1 truncate">{new URL(href).hostname}</div>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }
  return content;
}

export function SocialLinks({ links, communityData }: SocialLinksProps) {
  if (!links) return null;

  const items: { label: string; value?: string | number | null; href?: string; color?: string }[] = [];

  // Twitter / X
  if (links.twitter_screen_name) {
    items.push({
      label: 'Twitter / X',
      value: communityData?.twitter_followers,
      href: `https://x.com/${links.twitter_screen_name}`,
      color: 'text-blue-400',
    });
  }

  // Reddit
  if (links.subreddit_url) {
    items.push({
      label: 'Reddit',
      value: communityData?.reddit_subscribers,
      href: links.subreddit_url,
      color: 'text-orange-400',
    });
  }

  // Reddit activity
  if (communityData?.reddit_accounts_active_48h) {
    items.push({
      label: 'Reddit Active (48h)',
      value: communityData.reddit_accounts_active_48h,
      color: 'text-orange-300',
    });
  }

  if (communityData?.reddit_average_posts_48h) {
    items.push({
      label: 'Reddit Posts (48h)',
      value: Math.round(communityData.reddit_average_posts_48h),
    });
  }

  // Facebook
  if (links.facebook_username) {
    items.push({
      label: 'Facebook',
      value: communityData?.facebook_likes,
      href: `https://facebook.com/${links.facebook_username}`,
      color: 'text-blue-500',
    });
  }

  // Telegram
  if (links.telegram_channel_identifier) {
    items.push({
      label: 'Telegram',
      href: `https://t.me/${links.telegram_channel_identifier}`,
      value: links.telegram_channel_identifier,
      color: 'text-sky-400',
    });
  }

  // Discord / Chat
  if (links.chat_url) {
    for (const url of links.chat_url.filter(Boolean).slice(0, 2)) {
      const isDiscord = url.includes('discord');
      items.push({
        label: isDiscord ? 'Discord' : 'Chat',
        href: url,
        value: isDiscord ? 'Join' : 'Visit',
        color: isDiscord ? 'text-indigo-400' : 'text-white',
      });
    }
  }

  // Forums
  if (links.official_forum_url) {
    for (const url of links.official_forum_url.filter(Boolean).slice(0, 1)) {
      items.push({ label: 'Forum', href: url, value: 'Visit' });
    }
  }

  // Announcements
  if (links.announcement_url) {
    for (const url of links.announcement_url.filter(Boolean).slice(0, 1)) {
      items.push({ label: 'Announcements', href: url, value: 'Visit' });
    }
  }

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((item, i) => (
        <SocialCard key={i} {...item} />
      ))}
    </div>
  );
}
