import { IConcept } from "./concept.interface";

export interface IUser extends IConcept {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

export type Role = "user" | "admin";
