// Library and funtion
const bcrypt = require('bcrypt');
const { v7: uuidv7 } = require('uuid');
const { generateTokens, setTokenCookies , deleteToken } = require('./token.service'); 
const bcryptUtility = require('../../utility/bcrypt.utility');


//exception
const {ErrorAuthenticationException} = require ('../../error/authentication.error')
const {NotFoundError} = require ('../../error/not-found.error')
const {ErrorCodeException} = require ('../../error/code.error')
const {DuplicateDataException} = require ('../../error/duplicate-data.error')

//conect tabel
const db = require('../../connection/db.connection'); 
const authRepository = require('../repositories/auth.repository');

// LOGIN SERVICE
const loginService = async (res, username, password) => {
    const user = await authRepository.findLogin({ username });

    if (!user) {
        throw new ErrorAuthenticationException("Email atau username tidak terdaftar.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ErrorAuthenticationException("Password salah.");
    }
        const { accessToken, refreshToken } = await generateTokens(user);
        // 🔥 Generate JWT & simpan ke Redis
        setTokenCookies(res, { accessToken, refreshToken });

    return {
        data: {
        user_id: user.user_id,
        name: user.name,
        username: user.username,
        },
    };
};


// LOGOUT SERVICE
const logoutService = async (req, res) => {
    const { user_id } = req.user; // didapat dari middleware auth (jwt verify)

    // Kirim respon sukses
    await deleteToken(user_id);
        if (!deleteToken) {
            throw new NotFoundError("gagal logout");
        }
    // Hapus cookie di FE browser
    // res.clearCookie("accessToken", {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    // });
    // res.clearCookie("refreshToken", {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    // });

    return {
        success: true,
        message: "Logout berhasil. Token dan sesi telah dihapus.",
    };
};


// GET ALL USERS SERVICE
const getAllUsers = async () => {
  
    const users = await authRepository.findAll();
    if (!users) {
        throw new NotFoundError("data tidak ditemukan.");
    }

    return {
        data:users
    };
};

// GET ALL USERS SERVICE
const getProfil = async (user_id) => {
    const UserProfil = await authRepository.findOne({ user_id });
    if (!UserProfil) {
     throw new NotFoundError("Data user tidak ditemukan.");
    }
    return {
        data:UserProfil
    };
};

// register akun
const createUser = async (req) => {

    const body = req.body;
    const transaction = await db.sequelize.transaction();

    try {

        // Cek username sudah digunakan
        const existingUsername = await authRepository.findOne({ username: body.username.toLowerCase() });
        if (existingUsername) {
        throw new DuplicateDataException("Username sudah terdaftar. Gunakan username lain.", { field: "username" });
        }

        // Cek email sudah digunakan
        const existingEmail = await authRepository.findOne({ email: body.email.toLowerCase() });
        if (existingEmail) {
        throw new DuplicateDataException("Email sudah terdaftar. Gunakan email lain.", { field: "email" });
        }

        const payload = {
        user_id: uuidv7(),
        name: body.name,
        email: body.email,
        username: body.username.toLowerCase(),
        password: await bcryptUtility.hashPassword(body.password), 
        created_at: new Date(), 
        };

        const createData = await authRepository.create(payload, transaction);
        await transaction.commit();
        return  data= createData;

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};


module.exports = {
  loginService,
  logoutService,
  getAllUsers,
  getProfil,
  createUser
};
