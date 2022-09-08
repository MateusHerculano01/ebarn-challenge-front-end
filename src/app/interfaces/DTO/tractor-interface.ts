import { UserInterface } from "./user-interface";

export interface TractorInterface {
  user?: UserInterface;
  _id?: any;
  manufacturer: string;
  modelName: string;
  power: string;
  year: number;
  photo: string | undefined;
  photoUrl?: string;
  createdAt: string;
}
