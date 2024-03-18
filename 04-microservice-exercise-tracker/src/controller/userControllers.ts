import { Request, Response } from "express";
import { UserModel } from "../Models/User";

export const createUser = async (req: Request, res: Response) => {
  const newUser = await UserModel.createUser(req.body);
  res.status(201).send(newUser);
};

export const getUser = async (req: Request, res: Response) => {
  const users = await UserModel.loadData();

  res.status(200).json({
    status: "success",
    count: users.users.length,
    data: users.users,
  });
};

export const getUserLogs = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;
    const from =
      typeof req.query.from === "string" ? req.query.from : undefined;
    const to = typeof req.query.to === "string" ? req.query.to : undefined;
    const limit =
      typeof req.query.limit === "string"
        ? parseInt(req.query.limit, 10)
        : undefined;

    if (isNaN(limit ?? 0)) {
      return res.status(400).json({ message: "Limit must be a number" });
    }

    const logs = await UserModel.getUserLogs(_id, from, to, limit);

    res.status(200).json(logs);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createExercises = async (req: Request, res: Response) => {
  try {
    const exerciseDetails = await UserModel.createExercise(req);
    res.status(201).json(exerciseDetails);
  } catch (error) {
    const errorMessage: string =
      error instanceof Error ? error.message : "Unknown error";

    if (
      errorMessage === "Missing required fields" ||
      errorMessage === "User not found"
    ) {
      res.status(400).json({ error: errorMessage });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
