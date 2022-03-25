const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

module.exports = mongoose.model('User', userSchema )

/*
module.exports.createUser = function(newUser, callback) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash){
      newUser.password = hash
      newUser.save(callback)
    })
  })
}

// getUserByUsername, 用username來找使用者
module.exports.getUserByEmail = function(email, callback) {
  var query = { email: email }
  User.findOne(query, callback)
}

// getUserById, 用id來找使用者
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback)
}

// comparePassword, 當使用者登入的時候我們要比對登入密碼跟我們資料庫密碼相同
module.exports.comparePassword = function(candidatePassword, hash,callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err) throw err
    callback(null, isMatch)
});
}
*/