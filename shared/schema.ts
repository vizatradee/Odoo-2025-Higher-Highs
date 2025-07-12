import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
  decimal,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  bio: text("bio"),
  location: varchar("location"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0.00"),
  totalRatings: integer("total_ratings").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  category: varchar("category").notNull(),
  skillLevel: varchar("skill_level").notNull(),
  timeCommitment: varchar("time_commitment").notNull(),
  tags: text("tags").array().notNull().default([]),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const skillRequests = pgTable("skill_requests", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  category: varchar("category").notNull(),
  skillLevel: varchar("skill_level").notNull(),
  timeCommitment: varchar("time_commitment").notNull(),
  tags: text("tags").array().notNull().default([]),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const connections = pgTable("connections", {
  id: serial("id").primaryKey(),
  fromUserId: varchar("from_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  toUserId: varchar("to_user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  skillId: integer("skill_id").references(() => skills.id, { onDelete: "cascade" }),
  skillRequestId: integer("skill_request_id").references(() => skillRequests.id, { onDelete: "cascade" }),
  status: varchar("status").notNull().default("pending"), // pending, accepted, declined
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  skillId: integer("skill_id").references(() => skills.id, { onDelete: "cascade" }),
  skillRequestId: integer("skill_request_id").references(() => skillRequests.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  skills: many(skills),
  skillRequests: many(skillRequests),
  sentConnections: many(connections, { relationName: "sentConnections" }),
  receivedConnections: many(connections, { relationName: "receivedConnections" }),
  favorites: many(favorites),
}));

export const skillsRelations = relations(skills, ({ one, many }) => ({
  user: one(users, {
    fields: [skills.userId],
    references: [users.id],
  }),
  connections: many(connections),
  favorites: many(favorites),
}));

export const skillRequestsRelations = relations(skillRequests, ({ one, many }) => ({
  user: one(users, {
    fields: [skillRequests.userId],
    references: [users.id],
  }),
  connections: many(connections),
  favorites: many(favorites),
}));

export const connectionsRelations = relations(connections, ({ one }) => ({
  fromUser: one(users, {
    fields: [connections.fromUserId],
    references: [users.id],
    relationName: "sentConnections",
  }),
  toUser: one(users, {
    fields: [connections.toUserId],
    references: [users.id],
    relationName: "receivedConnections",
  }),
  skill: one(skills, {
    fields: [connections.skillId],
    references: [skills.id],
  }),
  skillRequest: one(skillRequests, {
    fields: [connections.skillRequestId],
    references: [skillRequests.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  skill: one(skills, {
    fields: [favorites.skillId],
    references: [skills.id],
  }),
  skillRequest: one(skillRequests, {
    fields: [favorites.skillRequestId],
    references: [skillRequests.id],
  }),
}));

// Insert schemas
export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertSkillRequestSchema = createInsertSchema(skillRequests).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export const insertConnectionSchema = createInsertSchema(connections).omit({
  id: true,
  fromUserId: true,
  createdAt: true,
  updatedAt: true,
});

export const updateUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type SkillWithUser = Skill & { user: User };
export type SkillRequest = typeof skillRequests.$inferSelect;
export type SkillRequestWithUser = SkillRequest & { user: User };
export type Connection = typeof connections.$inferSelect;
export type ConnectionWithUsers = Connection & { 
  fromUser: User; 
  toUser: User; 
  skill?: Skill;
  skillRequest?: SkillRequest;
};
export type Favorite = typeof favorites.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type InsertSkillRequest = z.infer<typeof insertSkillRequestSchema>;
export type InsertConnection = z.infer<typeof insertConnectionSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
