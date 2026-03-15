import { Link } from '@/libs/I18nNavigation';

interface CategoryBadgeProps {
  name: string;
  slug: string;
}

export function CategoryBadge({ name, slug }: CategoryBadgeProps) {
  return (
    <Link
      href={`/categories/${slug}`}
      className="inline-block px-3 py-1 text-xs font-medium text-gold border border-gold/30 hover:border-gold/60 transition-colors rounded-[2px]"
    >
      {name}
    </Link>
  );
}
