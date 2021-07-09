const mongoose = require("mongoose");
const mySecret = process.env['MONGODB_PASSWORD'];

function initializeDbConnection(){

  mongoose.connect(`mongodb+srv://snehaamruth:${mySecret}@neog-cluster.vmfkq.mongodb.net/connect`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(() => console.log("successfully connected"))
  .catch(error => console.error("mongoose connection failed..."+error))

}

module.exports = { initializeDbConnection }

