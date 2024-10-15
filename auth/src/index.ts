import { app } from "./app";
import mongoose from "mongoose";

const main = async () => {
  console.log("Starting app...");

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  await mongoose.connect(process.env.MONGO_URI);

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

main().catch((error) => {
  console.log("Closing app...");
  console.error("Error during server initialization:", error);
  process.exit(1); // Exit with failure code
});
