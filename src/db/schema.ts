import { pgTable, uuid, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

export const profiles = pgTable("profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().unique(),
  displayName: text("display_name"),
  isPremium: boolean("is_premium").default(false).notNull(),
  xp: integer("xp").default(0).notNull(),
  streak: integer("streak").default(0).notNull(),
  lastStudyDate: timestamp("last_study_date", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const studyLogs = pgTable("study_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id").references(() => profiles.id).notNull(),
  summaryId: uuid("summary_id").references(() => summaries.id).notNull(),
  xpEarned: integer("xp_earned").notNull(),
  completedAt: timestamp("completed_at", { withTimezone: true }).defaultNow().notNull(),
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

export const aiFeedbacks = pgTable("ai_feedbacks", {
  id: uuid("id").defaultRandom().primaryKey(),
  profileId: uuid("profile_id").references(() => profiles.id).notNull(),
  summaryId: uuid("summary_id").references(() => summaries.id), // Pode ser nulo se a pergunta for muito geral
  userPrompt: text("user_prompt").notNull(),
  adaResponse: text("ada_response").notNull(),
  feedbackType: text("feedback_type").notNull(), // 'like' ou 'dislike'
  feedbackNote: text("feedback_note"), // Opcional: "O que faltou na resposta?"
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
