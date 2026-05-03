const { createClient } = require("redis");
const { redis } = require("../config/token.config");

let client;

(async () => {
  try {
    client = createClient({
      url: redis.url, // harus pakai rediss:// agar TLS aktif otomatis
    });

    client.on("connect", () => console.log("✅ Redis connected successfully"));
    client.on("error", (err) => console.error("❌ Redis error:", err));

    await client.connect();
  } catch (error) {
    console.error("❌ Gagal konek ke Redis:", error.message);
  }
})();

module.exports = client;
