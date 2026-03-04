import { eq, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser, users,
  InsertMember, members,
  InsertPublication, publications,
  InsertResearchArea, researchAreas,
  InsertNews, news,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ───────────────────────────────────────────────
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Members ─────────────────────────────────────────────
export async function getAllMembers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(members).orderBy(asc(members.sortOrder), asc(members.id));
}

export async function getMemberById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(members).where(eq(members.id, id)).limit(1);
  return result[0];
}

export async function createMember(data: InsertMember) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(members).values(data);
  return { id: result[0].insertId };
}

export async function updateMember(id: number, data: Partial<InsertMember>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(members).set(data).where(eq(members.id, id));
}

export async function deleteMember(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(members).where(eq(members.id, id));
}

// ─── Publications ────────────────────────────────────────
export async function getAllPublications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(publications).orderBy(desc(publications.year), asc(publications.sortOrder));
}

export async function getPublicationById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(publications).where(eq(publications.id, id)).limit(1);
  return result[0];
}

export async function createPublication(data: InsertPublication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(publications).values(data);
  return { id: result[0].insertId };
}

export async function updatePublication(id: number, data: Partial<InsertPublication>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(publications).set(data).where(eq(publications.id, id));
}

export async function deletePublication(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(publications).where(eq(publications.id, id));
}

// ─── Research Areas ──────────────────────────────────────
export async function getAllResearchAreas() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(researchAreas).orderBy(asc(researchAreas.sortOrder), asc(researchAreas.id));
}

export async function getResearchAreaById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(researchAreas).where(eq(researchAreas.id, id)).limit(1);
  return result[0];
}

export async function createResearchArea(data: InsertResearchArea) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(researchAreas).values(data);
  return { id: result[0].insertId };
}

export async function updateResearchArea(id: number, data: Partial<InsertResearchArea>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(researchAreas).set(data).where(eq(researchAreas.id, id));
}

export async function deleteResearchArea(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(researchAreas).where(eq(researchAreas.id, id));
}

// ─── News ────────────────────────────────────────────────
export async function getAllNews() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(news).orderBy(desc(news.pinned), desc(news.publishedAt));
}

export async function getNewsById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(news).where(eq(news.id, id)).limit(1);
  return result[0];
}

export async function createNews(data: InsertNews) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(news).values(data);
  return { id: result[0].insertId };
}

export async function updateNews(id: number, data: Partial<InsertNews>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(news).set(data).where(eq(news.id, id));
}

export async function deleteNews(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(news).where(eq(news.id, id));
}
