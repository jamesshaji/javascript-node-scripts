const crypto = require('crypto');
const size = 64;


console.log(crypto.randomBytes(64).toString('hex'));
