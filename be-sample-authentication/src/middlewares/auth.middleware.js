const { verifyToken } = require("../services/token.service");
const { ErrorAuthenticationException } = require("../../error/authentication.error");
const redis = require("redis");
const config = require("../../config/token.config");

// Buat koneksi Redis (gunakan config yang sama)
const redisClient = redis.createClient({
  url: config.redis.url,
});
redisClient.connect().catch(err => console.error("Gagal konek Redis:", err.message));

const authMiddleware = async (req, res, next) => {
  try {
    // 🔹 Ambil token dari cookie atau header
    const token =
      req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      throw new ErrorAuthenticationException("Token tidak ditemukan. Harap login.");
    }

    // 🔹 Verifikasi token pakai service
    const payload = verifyToken(token); // ✅ pakai verifyToken dari token.service

    // 🔹 Cek token masih valid di Redis
    const redisKey = `refreshToken:${payload.user_id}`;
    const storedToken = await redisClient.get(redisKey);

    if (!storedToken) {
      throw new ErrorAuthenticationException("Sesi telah berakhir. Silakan login kembali.");
    }

    // 🔹 Simpan payload ke req.user
    req.user = payload;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authMiddleware };
