/**
 * @file userModel.ts
 * @description Model Mongoose untuk pengguna MateGroup SSO.
 * Collection name: mategroup_users
 * 
 * Model ini digunakan untuk menyimpan data autentikasi dan profil pengguna
 * pada sistem Single Sign-On (SSO) MateGroup.
 * 
 * @module models/userModel
 */

import mongoose, { Document, Schema } from "mongoose";

/**
 * Tipe paket langganan
 */
export type SubscriptionPlan =
  | "free"
  | "premium"
  | "pro"
  | "enterprise"
  | "custom";

/**
 * Interface untuk dokumen User
 * @interface IUser
 * @extends Document
 * @description Struktur data untuk dokumen user di MongoDB
 */
export interface IUser extends Document {
  /** Nama lengkap pengguna */
  name: string;
  /** Username unik pengguna */
  username: string;
  /** Alamat email pengguna (unik) */
  email: string;
  /** Password yang sudah di-hash */
  password: string;
  /** URL publik foto profil dari Supabase Storage */
  avatarUrl?: string;
  /** Path file foto profil di Supabase Storage (untuk operasi delete/update) */
  avatarPath?: string;
    /**
   * Subscription per SaaS
   * Contoh:
   * {
   *   comate: "free",
   *   edumate: "premium"
   * }
   */
  subscriptions: Map<string, SubscriptionPlan>;
  /** Token JWT untuk session management */
  token?: string;
  /** Timestamp pembuatan akun */
  createdAt: Date;
  /** Timestamp update terakhir */
  updatedAt: Date;
}

/**
 * Schema Mongoose untuk User
 * @description Mendefinisikan struktur dan validasi untuk collection mategroup_users
 */
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please add the user's full name."],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please add the username."],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Username must be at least 3 characters."],
      maxlength: [30, "Username cannot exceed 30 characters."],
      match: [
        /^[a-z0-9_]+$/,
        "Username can only contain lowercase letters, numbers, and underscores.",
      ],
    },
    email: {
      type: String,
      required: [true, "Please add the user's email address."],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please fill a valid email address.",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add the user password."],
      minlength: [6, "Password must be at least 6 characters."],
    },
    avatarUrl: {
      type: String,
      required: false,
      default: null,
    },
    avatarPath: {
      type: String,
      required: false,
      default: null,
    },
    subscriptions: {
      type: Map,
      of: {
        type: String,
        enum: ["free", "premium", "pro", "enterprise", "custom"],
        default: "free",
      },
      default: {},
    },
    token: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "mategroup_users", // Explicit collection name
  }
);

// Note: Indexes for email and username are already created via "unique: true" in schema
// No need to create additional indexes manually

/**
 * Model User
 * @description Model Mongoose untuk operasi CRUD pada collection mategroup_users
 */
export default mongoose.model<IUser>("MateGroupUser", userSchema);
