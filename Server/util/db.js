const { default: mongoose } = require("mongoose");

exports.connect = () => mongoose.connect(process.env.MONGODB_URL);
