const bcrypt = require('bcrypt');

class BcryptUtility {
  constructor() {
    this.saltRounds = 10;
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(plain, hashed) {
    return await bcrypt.compare(plain, hashed);
  }
}

module.exports = new BcryptUtility();
