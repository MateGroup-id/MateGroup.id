/**
 * @file express.d.ts
 * @description Type declarations untuk Express Request object.
 * Menambahkan properti user untuk menyimpan data dari JWT token.
 * @module types/express
 */

import { JwtPayload } from "jsonwebtoken"

/**
 * Tipe paket langganan (sama dengan di userModel.ts)
 */
type SubscriptionPlan = "free" | "premium" | "pro" | "enterprise" | "custom";

/**
 * Interface untuk payload JWT yang tersimpan di req.user
 */
interface UserPayload {
  /** ID user dari MongoDB */
  id: string;
  /** Email user */
  email: string;
  /** Nama lengkap user */
  name: string;
  /** Username user */
  username: string;
  /** 
   * Status langganan per aplikasi
   * Key: nama app (contoh: "comate", "mategroup")
   * Value: paket langganan ("free", "premium", "pro", "enterprise", "custom")
   */
  subscriptions: Record<string, SubscriptionPlan>;
}

declare global {
  namespace Express {
    interface Request {
      /**
       * Data user yang sudah terverifikasi dari JWT token.
       * Tersedia setelah melewati middleware verifyToken.
       */
      user?: UserPayload | string | JwtPayload
    }
  }
}
