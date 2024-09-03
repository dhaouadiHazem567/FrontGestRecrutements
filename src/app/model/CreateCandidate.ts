import {CreateUser} from "./CreateUser";
import {Education} from "./Education";
import {Experience} from "./Experience";

export class CreateCandidate extends CreateUser{

  educations: Education[] = [];
  experiences: Experience[] = [];

}
