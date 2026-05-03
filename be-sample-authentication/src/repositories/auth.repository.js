// repository/auth.repository.js
const { Op } = require("sequelize");
const db = require("../../connection/db.connection");
const resFormat = require("../../utility/format-res.utility"); // ✅ pakai resFormat
const User = db.user;

// Cari user berdasarkan username atau email untuk login
const findLogin = async (account_credential) => {
  try {
    const { username } = account_credential;

    const result = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email: username }],
      },
    });

    return result;
  } catch (error) {
    console.error(" Error findLogin:", error);
    throw resFormat.error("Gagal mengambil data login user", 500, "AUTH_001", error.message);
  }
};

// Cari user berdasarkan username
const findOne = async (where = {}) => {
  try {
    const config = {};

    // Tentukan kolom yang ditampilkan
    config.attributes = [
      "user_id",
      "name",
      "username",
      "email",
      "created_at",
      "update_at",
    ];

    // Tambahkan kondisi pencarian
    config.where = where;

    // Query Sequelize
    const data = await User.findOne(config);

    return data;
  } catch (error) {
    console.error(" Error findOne:", error);
    throw resFormat.error("Gagal mengambil data user", 500, "AUTH_001", error.message);  
  }
};

// Ambil semua user
const findAll = async () => {
  try {
    const config = {
      attributes: [
        "user_id",
        "name",
        "username",
        "email",
        "created_at",
        "update_at",
      ],
      order: [["created_at", "DESC"]],
    };

    const data = await User.findAll(config);
    return data;
  } catch (error) {
    console.error(" Error findOne:", error);
    throw resFormat.error("Gagal mengambil data user", 500, "AUTH_001", error.message);  
  }
};


// registrasi
const create = async (payload) => {

  const transaction = await db.sequelize.transaction();
  try {
    const data = await User.create(payload, { transaction });

    // Commit jika berhasil
    await transaction.commit();
    return data;
  } catch (error) {
     const errObj = await resFormat.error(error);
    throw new ErrorQueryException(errObj.metaData.message, errObj);
  }
};




module.exports = {
  findLogin,
  findAll,
  findOne,
  create,
};
