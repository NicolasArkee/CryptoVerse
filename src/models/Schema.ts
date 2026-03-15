import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';

// ═══════════════════════════════════════════
// TOKEN METATAGS
// ═══════════════════════════════════════════

export const tokenMetatagSchema = pgTable(
  'token_metatags',
  {
    id: serial('id').primaryKey(),
    tokenSlug: varchar('token_slug', { length: 100 }).notNull(),
    locale: varchar('locale', { length: 5 }).notNull(),
    metaTitle: text('meta_title').notNull(),
    metaDescription: text('meta_description').notNull(),
    ogImage: text('og_image'),
    canonicalUrl: text('canonical_url'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (table) => [
    uniqueIndex('token_metatag_slug_locale_idx').on(table.tokenSlug, table.locale),
  ],
);

// ═══════════════════════════════════════════
// CATEGORY METATAGS
// ═══════════════════════════════════════════

export const categoryMetatagSchema = pgTable(
  'category_metatags',
  {
    id: serial('id').primaryKey(),
    categorySlug: varchar('category_slug', { length: 100 }).notNull(),
    locale: varchar('locale', { length: 5 }).notNull(),
    metaTitle: text('meta_title').notNull(),
    metaDescription: text('meta_description').notNull(),
    ogImage: text('og_image'),
    canonicalUrl: text('canonical_url'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (table) => [
    uniqueIndex('category_metatag_slug_locale_idx').on(table.categorySlug, table.locale),
  ],
);

// ═══════════════════════════════════════════
// EXCHANGE METATAGS
// ═══════════════════════════════════════════

export const exchangeMetatagSchema = pgTable(
  'exchange_metatags',
  {
    id: serial('id').primaryKey(),
    exchangeSlug: varchar('exchange_slug', { length: 100 }).notNull(),
    locale: varchar('locale', { length: 5 }).notNull(),
    metaTitle: text('meta_title').notNull(),
    metaDescription: text('meta_description').notNull(),
    ogImage: text('og_image'),
    canonicalUrl: text('canonical_url'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (table) => [
    uniqueIndex('exchange_metatag_slug_locale_idx').on(table.exchangeSlug, table.locale),
  ],
);

// ═══════════════════════════════════════════
// PAGE METATAGS (for static pages: home, lists, etc.)
// ═══════════════════════════════════════════

export const pageMetatagSchema = pgTable(
  'page_metatags',
  {
    id: serial('id').primaryKey(),
    pageKey: varchar('page_key', { length: 100 }).notNull(),
    locale: varchar('locale', { length: 5 }).notNull(),
    metaTitle: text('meta_title').notNull(),
    metaDescription: text('meta_description').notNull(),
    ogImage: text('og_image'),
    canonicalUrl: text('canonical_url'),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().$onUpdate(() => new Date()).notNull(),
  },
  (table) => [
    uniqueIndex('page_metatag_key_locale_idx').on(table.pageKey, table.locale),
  ],
);
