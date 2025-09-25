import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, real, integer, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analysisResults = pgTable("analysis_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"), // Optional - for guest usage
  cropType: text("crop_type").notNull(),
  imagePath: text("image_path"), // Path to stored image
  imageData: text("image_data").notNull(), // Base64 image data for now
  detectedDisease: text("detected_disease").notNull(),
  confidence: real("confidence").notNull(),
  allPredictions: json("all_predictions").notNull(), // JSON array of all prediction results
  latitude: real("latitude"),
  longitude: real("longitude"),
  location: text("location"), // Human readable location
  weatherConditions: json("weather_conditions"), // Weather data at time of analysis
  createdAt: timestamp("created_at").defaultNow(),
});

export const diseaseInfo = pgTable("disease_info", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  diseaseName: text("disease_name").notNull().unique(),
  cropType: text("crop_type").notNull(),
  description: text("description").notNull(),
  symptoms: json("symptoms").notNull(), // Array of symptom descriptions
  causes: json("causes"), // Array of causes
  prevention: json("prevention"), // Array of prevention tips
  seasonalRisk: json("seasonal_risk"), // Risk levels by season/month
  imageExamples: json("image_examples"), // URLs/paths to example images
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const batchAnalysis = pgTable("batch_analysis", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"), // Optional - for guest usage
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  totalImages: integer("total_images").notNull(),
  processedImages: integer("processed_images").notNull().default(0),
  failedImages: integer("failed_images").notNull().default(0),
  cropType: text("crop_type").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  analysisResults: many(analysisResults),
  batchAnalyses: many(batchAnalysis),
}));

export const analysisResultsRelations = relations(analysisResults, ({ one }) => ({
  user: one(users, {
    fields: [analysisResults.userId],
    references: [users.id],
  }),
}));

export const batchAnalysisRelations = relations(batchAnalysis, ({ one, many }) => ({
  user: one(users, {
    fields: [batchAnalysis.userId],
    references: [users.id],
  }),
  results: many(analysisResults),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAnalysisResultSchema = createInsertSchema(analysisResults).omit({
  id: true,
  createdAt: true,
});

export const insertDiseaseInfoSchema = createInsertSchema(diseaseInfo).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBatchAnalysisSchema = createInsertSchema(batchAnalysis).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type AnalysisResult = typeof analysisResults.$inferSelect;
export type InsertAnalysisResult = z.infer<typeof insertAnalysisResultSchema>;
export type DiseaseInfo = typeof diseaseInfo.$inferSelect;
export type InsertDiseaseInfo = z.infer<typeof insertDiseaseInfoSchema>;
export type BatchAnalysis = typeof batchAnalysis.$inferSelect;
export type InsertBatchAnalysis = z.infer<typeof insertBatchAnalysisSchema>;