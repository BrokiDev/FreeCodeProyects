import express from "express";
import { userRouter } from "./routes/user";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
