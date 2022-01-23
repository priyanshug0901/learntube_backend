const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/learn-tube", {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  })
  .then((res) => {
    console.log(`database connected`);
  })
  .catch((err) => {
    console.log(err);
  });

// const blogSchema = new Schema({
//   title: String, // String is shorthand for {type: String}
// });

// const MyModel = mongoose.model("Test", blogSchema);
// MyModel.create({ title: "vinit" })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

module.exports = mongoose;