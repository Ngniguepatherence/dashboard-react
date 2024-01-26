import mongoose from "mongoose";

const connect = () => {
  mongoose.connect(
    'mongodb://localhost:27017/Pouapeu',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err) console.log("Error connecting to MongoDB");
      else console.log("Connected to MongoDB");
    }
  );
};

export default connect;