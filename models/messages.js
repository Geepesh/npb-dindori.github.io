const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
  user : String,
  msg : String
})

const Msg = mongoose.model('msg',msgSchema);


module.exports = Msg;
