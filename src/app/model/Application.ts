import {ApplicationStatus} from "../enum/ApplicationStatus";
import {ApplicationPK} from "./ApplicationPK";
import {Candidate} from "./Candidate";

export class Application {

  applicationPK!: ApplicationPK;
  fileCV!: string;
  motivationalLetter!: string;
  applicationStatus!: ApplicationStatus;
  createdAt!: Date;
  updatedAt!: Date;
  candidate!: Candidate;
}
