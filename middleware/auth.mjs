import jwt from "jsonwebtoken";
import User from "../models/user.mjs";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ message: "Not authorized" });

  const token = authHeader.replace("Bearer ", "");

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user || user.token !== token)
      return res.status(401).json({ message: "Not authorized" });

    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};

export default auth;
