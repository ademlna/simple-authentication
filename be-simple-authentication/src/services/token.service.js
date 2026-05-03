const jwt = require("jsonwebtoken");
const redis = require("redis");
const config = require("../../config/token.config");

// Buat client Redis pakai URL langsung
const redisClient = redis.createClient({
  url: config.redis.url,
});


redisClient.connect().catch((err) => {
  console.error("Gagal konek ke Redis:", err.message);
});


// Durasi token
const ACCESS_TOKEN_EXPIRES_IN = `${config.jwt.expired}m`; // contoh: '30m'
const REFRESH_TOKEN_EXPIRES_IN = "7d";


// Generate JWT Access & Refresh Token
const generateTokens = async (user) => {
    const payload = {
        user_id: user.user_id,
        username: user.username,
        name: user.name,
    };
    const accessToken = jwt.sign(payload, config.jwt.secret, { expiresIn: ACCESS_TOKEN_EXPIRES_IN, });
    const refreshToken = jwt.sign(payload, config.jwt.secret, {expiresIn: REFRESH_TOKEN_EXPIRES_IN,});
    await redisClient.set(`refreshToken:${user.user_id}`, refreshToken, {
        EX: 7 * 24 * 60 * 60, //(7 hari)
    });
    return { accessToken, refreshToken };
};


// Verifikasi token JWT
const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (err) {
        throw new Error("Token tidak valid atau sudah kedaluwarsa.");
    }
};


// Simpan token ke cookie (HTTP-only)
const setTokenCookies = (res, tokens) => {
    const cookieOptions = {
        httpOnly: true,          
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    };
    res.cookie("accessToken", tokens.accessToken, { ...cookieOptions, maxAge: 30 * 60 * 1000 }); // 30 menit
    res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
};


// Hapus refresh token di Redis (logout)
const deleteToken = async (user_id) => {
    await redisClient.del(`refreshToken:${user_id}`);
};


// Hapus cookie saat logout
const clearTokenCookies = (res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
};


module.exports = {
    generateTokens,
    verifyToken,
    deleteToken,
    setTokenCookies,
    clearTokenCookies
};
