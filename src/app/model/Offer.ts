import {ContractType} from "../enum/ContractType";
import {OffreStatus} from "../enum/OffreStatus";

export class Offer{

  id!:number;
  title!:string;
  mission!:string;
  experience!:string;
  diploma!:string;
  skills!:string;
  requirement!:string;
  contractType!: ContractType;
  offreStatus!: OffreStatus;
  createdAt!: Date;
  updatedAt!: Date;

  hasApplied!: boolean;
}
