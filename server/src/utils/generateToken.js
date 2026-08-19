import jwt from "jsonwebtoken";

const generateToken = (userId, sessionId = null) => {
  return jwt.sign(
    {
      id: userId,
      sessionId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export default generateToken;