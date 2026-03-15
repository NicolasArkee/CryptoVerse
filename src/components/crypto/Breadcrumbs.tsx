import { Link } from '@/libs/I18nNavigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-muted mb-6" aria-label="Breadcrumb">
      <Link href="/" className="hover:text-white transition-colors">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-border">/</span>
          {item.href ? (
            <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
          ) : (
            <span className="text-subtle">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
