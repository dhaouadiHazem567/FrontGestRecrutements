export class CreateApplication {

  idOffre!: number;
  idCandidate!: number;
  fileCV!: File | null;
  fileMotivationalLetter! : File | null;


  constructor(idOffre: number, idCandidate: number, fileCV: File | null, fileMotivationalLetter: File | null) {
    this.idOffre = idOffre;
    this.idCandidate = idCandidate;
    this.fileCV = fileCV;
    this.fileMotivationalLetter = fileMotivationalLetter;
  }
}
