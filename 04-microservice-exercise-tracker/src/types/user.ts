import { Exercise } from "./exercises";

export interface User {
    _id: string;
    username: string;
    log?: Exercise[];
  }