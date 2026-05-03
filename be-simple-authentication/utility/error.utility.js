// utility/error.utility.js
module.exports = {
  general: async (error) => {
    return {
      metaData: {
        message: error.message || 'Terjadi kesalahan pada server',
        code: 400,
        stack: error.stack || null,
      },
    };
  },

  sequelizeDB: async (error) => {
    return {
      metaData: {
        message: error.message || 'Kesalahan pada database Sequelize',
        code: 500,
        stack: error.stack || null,
      },
    };
  },
};
