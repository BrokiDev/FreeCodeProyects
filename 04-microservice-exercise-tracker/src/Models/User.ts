import { User } from "../types/user";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export class UserModel {
  static async loadData(): Promise<{ users: User[] }> {
    try {
      const data = JSON.parse(await fs.readFile("../src/data/db.json", "utf8"));
      return data;
    } catch (error) {
      console.error("Error loading data", error);
      return { users: [] };
    }
  }

  static async saveData(data: { users: User[] }): Promise<void> {
    try {
      await fs.writeFile(
        "../src/data/db.json",
        JSON.stringify(data, null, 2),
        "utf8"
      );
    } catch (error) {
      console.error("Error saving data:", error);
      throw new Error("Failed to save data");
    }
  }

  static async createUser(body: { username: string }) {
    const { username } = body;

    const db = await UserModel.loadData();
    const newUser: User = { _id: uuidv4(), username };
    db.users.push(newUser);
    await UserModel.saveData(db);
    return newUser;
  }

  static async getUserLogs(
    _id: string,
    from?: string,
    to?: string,
    limit?: number
  ) {
    const db = await UserModel.loadData();
    const user = db.users.find((user) => user._id === _id);

    if (!user || !user.log)
      throw new Error("User not found or no exercise log");

    let logs = user.log;
    if (from || to) {
      const fromDate = from ? new Date(from) : new Date(0);
      const toDate = to ? new Date(to) : new Date();

      logs = logs.filter((log) => {
        const logDate = new Date(log.date);
        return logDate >= fromDate && logDate <= toDate;
      });
    }

    if (limit) {
      logs = logs.slice(0, limit);
    }

    return {
      ...user,
      log: logs,
      count: logs.length,
    };
  }

  static async createExercise(input: any): Promise<any> {
    const { id } = input.params;
    const { description, duration, date } = input.body;
  
    if (!id || !description || !duration) {
        throw new Error("Missing required fields");
    }
  
    const db = await UserModel.loadData();
    const user = db.users.find((user) => user._id === id);
    if (!user) throw new Error("User not found");
  
    const newExercise = {
      description,
      duration: Number(duration),
      date: date ? new Date(date).toDateString() : new Date().toDateString(),
    };
  
    if (!user.log) user.log = [];
    user.log.push(newExercise);
  
    await UserModel.saveData(db);
  
    return {
      _id: id,
      username: user.username,
      date: newExercise.date,
      duration: newExercise.duration,
      description: newExercise.description
    };
  }
}
