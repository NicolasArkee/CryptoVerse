import type { NewsPost } from '@/libs/CryptoPanic';
import { formatNewsDate } from '@/libs/CryptoPanic';

interface NewsCardProps {
  post: NewsPost;
}

export function NewsCard({ post }: NewsCardProps) {
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-dark border border-border hover:border-border-light p-4 transition-colors group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm text-white group-hover:text-green transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[0.6rem] text-muted">{post.source.title}</span>
            <span className="text-[0.6rem] text-subtle">&middot;</span>
            <span className="text-[0.6rem] text-subtle">{formatNewsDate(post.published_at)}</span>
          </div>
          {post.currencies && post.currencies.length > 0 && (
            <div className="flex gap-1.5 mt-2">
              {post.currencies.slice(0, 3).map(c => (
                <span key={c.code} className="text-[0.55rem] bg-[#1A1A2E] border border-border px-1.5 py-0.5 text-muted">
                  {c.code}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="text-muted group-hover:text-white text-xs shrink-0 transition-colors">&rarr;</span>
      </div>
    </a>
  );
}
