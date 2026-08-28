import Admin from "../models/Admin.js";
import { generateToken } from "../utils/generateToken.js";

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.json({
    token: generateToken(admin._id),
    admin: { id: admin._id, email: admin.email },
  });
}

export async function me(req, res) {
  res.json({ id: req.admin._id, email: req.admin.email });
}
