import {Gender} from "../enum/Gender";
import {Role} from "./Role";

export class UpdateUser{

  id!: number;
  firstname!: string;
  lastname!: string;
  phone!: string;
  gender!: Gender;
  birthdate!: Date;
  username!: string;
  email!: string;
  createdAt!: Date;

}
