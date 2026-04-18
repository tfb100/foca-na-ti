import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().unique(),
  displayName: text("display_name"),
  isPremium: boolean("is_premium").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon"), // Nome do ícone Lucide
  parentId: uuid("parent_id").references((): any => categories.id),
});


export const summaries = pgTable("summaries", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  categoryId: uuid("category_id").references(() => categories.id).notNull(),
  shortDescription: text("short_description"),
  isPremium: boolean("is_premium").default(false).notNull(),
  relevanceWeight: integer("relevance_weight").default(1).notNull(), // 1-100 para o Heatmap
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
