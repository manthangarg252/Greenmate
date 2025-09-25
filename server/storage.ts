import { 
  type User, 
  type InsertUser,
  type AnalysisResult,
  type InsertAnalysisResult,
  type DiseaseInfo,
  type InsertDiseaseInfo,
  type BatchAnalysis,
  type InsertBatchAnalysis,
  users,
  analysisResults,
  diseaseInfo,
  batchAnalysis
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Analysis result operations
  saveAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
  getAnalysisHistory(userId?: string, limit?: number): Promise<AnalysisResult[]>;
  getAnalysisResult(id: string): Promise<AnalysisResult | undefined>;
  
  // Disease info operations
  getDiseaseInfo(diseaseName: string): Promise<DiseaseInfo | undefined>;
  getAllDiseaseInfo(): Promise<DiseaseInfo[]>;
  saveDiseaseInfo(info: InsertDiseaseInfo): Promise<DiseaseInfo>;
  
  // Batch analysis operations
  createBatchAnalysis(batch: InsertBatchAnalysis): Promise<BatchAnalysis>;
  updateBatchAnalysis(id: string, updates: Partial<BatchAnalysis>): Promise<BatchAnalysis>;
  getBatchAnalysis(id: string): Promise<BatchAnalysis | undefined>;
  getBatchHistory(userId?: string): Promise<BatchAnalysis[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Analysis result operations
  async saveAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult> {
    const [analysis] = await db
      .insert(analysisResults)
      .values(result)
      .returning();
    return analysis;
  }

  async getAnalysisHistory(userId?: string, limit = 50): Promise<AnalysisResult[]> {
    let query = db.select().from(analysisResults);
    
    if (userId) {
      query = query.where(eq(analysisResults.userId, userId));
    }
    
    const results = await query
      .orderBy(desc(analysisResults.createdAt))
      .limit(limit);
    
    return results;
  }

  async getAnalysisResult(id: string): Promise<AnalysisResult | undefined> {
    const [result] = await db.select().from(analysisResults).where(eq(analysisResults.id, id));
    return result || undefined;
  }

  // Disease info operations
  async getDiseaseInfo(diseaseName: string): Promise<DiseaseInfo | undefined> {
    const [info] = await db.select().from(diseaseInfo).where(eq(diseaseInfo.diseaseName, diseaseName));
    return info || undefined;
  }

  async getAllDiseaseInfo(): Promise<DiseaseInfo[]> {
    return await db.select().from(diseaseInfo).orderBy(diseaseInfo.cropType, diseaseInfo.diseaseName);
  }

  async saveDiseaseInfo(info: InsertDiseaseInfo): Promise<DiseaseInfo> {
    const [diseaseData] = await db
      .insert(diseaseInfo)
      .values(info)
      .returning();
    return diseaseData;
  }

  // Batch analysis operations
  async createBatchAnalysis(batch: InsertBatchAnalysis): Promise<BatchAnalysis> {
    const [batchData] = await db
      .insert(batchAnalysis)
      .values(batch)
      .returning();
    return batchData;
  }

  async updateBatchAnalysis(id: string, updates: Partial<BatchAnalysis>): Promise<BatchAnalysis> {
    const [updated] = await db
      .update(batchAnalysis)
      .set(updates)
      .where(eq(batchAnalysis.id, id))
      .returning();
    return updated;
  }

  async getBatchAnalysis(id: string): Promise<BatchAnalysis | undefined> {
    const [batch] = await db.select().from(batchAnalysis).where(eq(batchAnalysis.id, id));
    return batch || undefined;
  }

  async getBatchHistory(userId?: string): Promise<BatchAnalysis[]> {
    let query = db.select().from(batchAnalysis);
    
    if (userId) {
      query = query.where(eq(batchAnalysis.userId, userId));
    }
    
    const results = await query
      .orderBy(desc(batchAnalysis.createdAt));
    
    return results;
  }
}

export const storage = new DatabaseStorage();