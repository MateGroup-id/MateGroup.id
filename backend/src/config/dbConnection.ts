/**
 * @file dbConnection.ts
 * @description Modul konfigurasi untuk koneksi database MongoDB.
 * Menggunakan Mongoose sebagai ODM (Object Document Mapper) untuk
 * mengelola koneksi dan operasi database.
 * Database ini digunakan bersama oleh MateGroup SSO dan CoMate.
 * 
 * Naming Convention untuk Collections:
 * - mategroup_* : Data untuk MateGroup SSO (users, settings, dll)
 * - comate_* : Data untuk CoMate (tasks, todos, comments, dll)
 * 
 * @module config/dbConnection
 */

import mongoose from "mongoose";

/**
 * Fungsi Koneksi ke Database MongoDB
 * @description Membuat koneksi ke database MongoDB menggunakan connection string
 * dari environment variable MONGO_CONNECTION_STRING.
 * 
 * ALUR KERJA:
 * 1. Mengambil connection string dari environment variable
 * 2. Memvalidasi bahwa connection string tersedia
 * 3. Melakukan koneksi ke MongoDB menggunakan Mongoose
 * 4. Menampilkan informasi host dan nama database jika berhasil
 * 5. Menghentikan proses jika koneksi gagal (exit code 1)
 * 
 * @async
 * @function connectDb
 * @returns {Promise<void>} Promise yang resolve ketika koneksi berhasil
 * @throws {Error} Jika MONGO_CONNECTION_STRING tidak terdefinisi
 * @throws {Error} Jika koneksi ke MongoDB gagal
 * 
 * @example
 * // Penggunaan di server.ts:
 * import connectDb from "@/config/dbConnection";
 * await connectDb(); // Akan log: "Database Connected: host, dbname"
 */
const connectDb = async (): Promise<void> => {
  try {
    // Mengambil connection string dari environment variable
    const mongoConnectionString = process.env.MONGO_CONNECTION_STRING;
    
    // Validasi ketersediaan connection string
    if (!mongoConnectionString) {
      throw new Error("MONGO_CONNECTION_STRING is not defined in environment variables");
    }

    // Melakukan koneksi ke MongoDB
    const connect = await mongoose.connect(mongoConnectionString);
    
    // Log informasi koneksi berhasil
    console.log(
      "MongoDB Connected:",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    // Log error dan hentikan proses jika koneksi gagal
    console.error("Error in MongoDB Connection! ==>", error);
    process.exit(1);
  }
};

export default connectDb;
