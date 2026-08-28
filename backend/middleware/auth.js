import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(401).json({ message: "Not authorized, admin not found." });
    }
    req.admin = admin;
    next();
  } catch {
    return res.status(401).json({ message: "Not authorized, invalid or expired token." });
  }
}
