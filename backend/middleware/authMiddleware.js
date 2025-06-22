import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};
