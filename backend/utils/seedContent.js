import dotenv from "dotenv";
import readline from "readline";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

dotenv.config();

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    })
  );
}

async function seed() {
  await connectDB();

  // Current admin email
  const currentEmail = await prompt("Current admin email: ");

  // New admin email
  const newEmail = await prompt("New admin email: ");

  if (!currentEmail || !newEmail) {
    console.error("Both current and new email are required.");
    process.exit(1);
  }

  const oldAdmin = await Admin.findOne({
    email: currentEmail.toLowerCase().trim(),
  });

  if (!oldAdmin) {
    console.error("Current admin email not found.");
    await mongoose.disconnect();
    process.exit(1);
  }

  const emailAlreadyExists = await Admin.findOne({
    email: newEmail.toLowerCase().trim(),
  });

  if (emailAlreadyExists) {
    console.error("New email is already being used by another admin.");
    await mongoose.disconnect();
    process.exit(1);
  }

  oldAdmin.email = newEmail.toLowerCase().trim();

  await oldAdmin.save();

  console.log(`Admin email changed successfully.`);
  console.log(`Old email: ${currentEmail}`);
  console.log(`New email: ${newEmail}`);

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(async (err) => {
  console.error("Email update failed:", err.message);

  await mongoose.disconnect();
  process.exit(1);
});