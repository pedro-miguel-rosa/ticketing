import { app } from "./app";
import mongoose from "mongoose";

const main = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

main().catch((error) => {
  console.error("Error during server initialization:", error);
  process.exit(1); // Exit with failure code
});
