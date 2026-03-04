import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Lab members — professor, graduate students, undergraduate researchers, alumni
 */
export const members = mysqlTable("members", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  nameEn: varchar("nameEn", { length: 100 }),
  category: mysqlEnum("category", ["professor", "graduate", "undergraduate", "alumni"]).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  research: text("research"),
  email: varchar("email", { length: 320 }),
  imageUrl: text("imageUrl"),
  homepage: text("homepage"),
  graduationYear: varchar("graduationYear", { length: 10 }),
  currentPosition: text("currentPosition"),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Member = typeof members.$inferSelect;
export type InsertMember = typeof members.$inferInsert;

/**
 * Publications — journal papers, conference papers, etc.
 */
export const publications = mysqlTable("publications", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").notNull(),
  venue: varchar("venue", { length: 300 }).notNull(),
  year: int("year").notNull(),
  category: mysqlEnum("category", ["journal", "conference", "workshop", "thesis", "other"]).notNull(),
  doi: varchar("doi", { length: 200 }),
  link: text("link"),
  abstract: text("abstract"),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Publication = typeof publications.$inferSelect;
export type InsertPublication = typeof publications.$inferInsert;

/**
 * Research areas
 */
export const researchAreas = mysqlTable("researchAreas", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  titleEn: varchar("titleEn", { length: 100 }).notNull(),
  description: text("description").notNull(),
  icon: varchar("icon", { length: 50 }).default("Terminal").notNull(),
  imageUrl: text("imageUrl"),
  topics: text("topics").notNull(),
  sortOrder: int("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ResearchArea = typeof researchAreas.$inferSelect;
export type InsertResearchArea = typeof researchAreas.$inferInsert;

/**
 * News / Announcements
 */
export const news = mysqlTable("news", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  content: text("content"),
  category: mysqlEnum("category", ["announcement", "achievement", "event", "other"]).default("announcement").notNull(),
  pinned: int("pinned").default(0).notNull(),
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;