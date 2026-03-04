import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

// ─── Zod schemas ─────────────────────────────────────────
const memberInput = z.object({
  name: z.string().min(1),
  nameEn: z.string().nullable().optional(),
  category: z.enum(["professor", "graduate", "undergraduate", "alumni"]),
  role: z.string().min(1),
  research: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  homepage: z.string().nullable().optional(),
  graduationYear: z.string().nullable().optional(),
  currentPosition: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
});

const publicationInput = z.object({
  title: z.string().min(1),
  authors: z.string().min(1),
  venue: z.string().min(1),
  year: z.number().int().min(1900).max(2100),
  category: z.enum(["journal", "conference", "workshop", "thesis", "other"]),
  doi: z.string().nullable().optional(),
  link: z.string().nullable().optional(),
  abstract: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
});

const researchAreaInput = z.object({
  title: z.string().min(1),
  titleEn: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().default("Terminal"),
  imageUrl: z.string().nullable().optional(),
  topics: z.string().min(1),
  sortOrder: z.number().int().default(0),
});

const newsInput = z.object({
  title: z.string().min(1),
  content: z.string().nullable().optional(),
  category: z.enum(["announcement", "achievement", "event", "other"]).default("announcement"),
  pinned: z.number().int().default(0),
  publishedAt: z.date().optional(),
});

// ─── Router ──────────────────────────────────────────────
export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Members ───────────────────────────────────────────
  members: router({
    list: publicProcedure.query(() => db.getAllMembers()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getMemberById(input.id)),
    create: adminProcedure
      .input(memberInput)
      .mutation(({ input }) => db.createMember(input)),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: memberInput.partial() }))
      .mutation(({ input }) => db.updateMember(input.id, input.data)),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.deleteMember(input.id)),
  }),

  // ─── Publications ──────────────────────────────────────
  publications: router({
    list: publicProcedure.query(() => db.getAllPublications()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getPublicationById(input.id)),
    create: adminProcedure
      .input(publicationInput)
      .mutation(({ input }) => db.createPublication(input)),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: publicationInput.partial() }))
      .mutation(({ input }) => db.updatePublication(input.id, input.data)),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.deletePublication(input.id)),
  }),

  // ─── Research Areas ────────────────────────────────────
  researchAreas: router({
    list: publicProcedure.query(() => db.getAllResearchAreas()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getResearchAreaById(input.id)),
    create: adminProcedure
      .input(researchAreaInput)
      .mutation(({ input }) => db.createResearchArea(input)),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: researchAreaInput.partial() }))
      .mutation(({ input }) => db.updateResearchArea(input.id, input.data)),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.deleteResearchArea(input.id)),
  }),

  // ─── News ──────────────────────────────────────────────
  news: router({
    list: publicProcedure.query(() => db.getAllNews()),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => db.getNewsById(input.id)),
    create: adminProcedure
      .input(newsInput)
      .mutation(({ input }) => db.createNews(input)),
    update: adminProcedure
      .input(z.object({ id: z.number(), data: newsInput.partial() }))
      .mutation(({ input }) => db.updateNews(input.id, input.data)),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => db.deleteNews(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
