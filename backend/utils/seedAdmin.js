import dotenv from "dotenv";
import readline from "readline";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

dotenv.config();

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => rl.question(question, (answer) => {
    rl.close();
    resolve(answer);
  }));
}

async function seed() {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || (await prompt("Admin email: "));
  const password = await prompt("Admin password: ");

  if (!email || !password) {
    console.error("Email and password are required.");
    process.exit(1);
  }

  const existing = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    existing.password = password;
    await existing.save();
    console.log(`Admin password updated for ${email}.`);
  } else {
    await Admin.create({ email: email.toLowerCase().trim(), password });
    console.log(`Admin account created for ${email}.`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
