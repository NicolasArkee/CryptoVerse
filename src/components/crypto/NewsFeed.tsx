import type { NewsPost } from '@/libs/CryptoPanic';
import { NewsCard } from './NewsCard';

interface NewsFeedProps {
  posts: NewsPost[];
  maxItems?: number;
}

export function NewsFeed({ posts, maxItems = 10 }: NewsFeedProps) {
  if (!posts || posts.length === 0) return null;

  const displayed = posts.slice(0, maxItems);

  return (
    <div className="space-y-3">
      {displayed.map(post => (
        <NewsCard key={post.id} post={post} />
      ))}
    </div>
  );
}
