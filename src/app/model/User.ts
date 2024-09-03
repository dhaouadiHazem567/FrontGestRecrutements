import {Gender} from "../enum/Gender";
import {Role} from "./Role";

export class User {

  id!: number;
  firstname!: string;
  lastname!: string;
  phone!: string;
  gender!: Gender;
  birthdate!: Date;
  username!: string;
  email!: string;
  password!: string;
  createdAt!: Date;
  updatedAt?: Date;
  roles!: Role[];
  code!:number
}
