import {User} from "./User";
import {Education} from "./Education";
import {Experience} from "./Experience";

export class Candidate extends User{

  educations: Education[] = [];
  experiences: Experience[] = [];

}
