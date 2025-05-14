import { Types } from "mongoose";
import { IConcept } from "./concept.interface";

export interface IQuestion extends IConcept {
  title: string;
  link: string;
  isBookmarked: boolean;
  categoryId: Types.ObjectId;
}
