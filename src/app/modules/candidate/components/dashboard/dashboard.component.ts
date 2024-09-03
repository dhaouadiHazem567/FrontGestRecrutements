import {Component, OnInit} from '@angular/core';
import {User} from "../../../../model/User";
import {AuthService} from "../../../../services/auth.service";
import {Offer} from "../../../../model/Offer";
import {OfferService} from "../../../../services/offer.service";
import {OffreStatus} from "../../../../enum/OffreStatus";
import {ApplicationService} from "../../../../services/application.service";
import {CreateApplication} from "../../../../model/CreateApplication";
import {MessageService} from "primeng/api";
import {Application} from "../../../../model/Application";
import {FileType} from "../../../../enum/FileType";
import {ApplicationStatus} from "../../../../enum/ApplicationStatus";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  currentUser!: User;
  offers!: Offer[];
  protected readonly OffreStatus = OffreStatus;
  cvFile!: File | null;
  motivationalLetterFile!: File | null;
  selectedOffer!: Offer;
  myApplication!: Application | null;

  constructor(private authService: AuthService, private offerService: OfferService,
              private applicationService: ApplicationService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.currentUser = {... this.authService.getCurrentUser()};
    this.getAllOffers();
    this.cvFile = null;
    this.motivationalLetterFile = null;
  }

  getAllOffers(){
    this.offerService.getAllOffers().subscribe(
      data => {
        this.offers = data;
        this.offers.forEach(offer => this.applicationService.getMyApplication(
          this.currentUser.id, offer.id
        ).subscribe(
          data => {
            if(data === null)
              offer.hasApplied = false;
            else
              offer.hasApplied = true;
          }
        ));
      }
    )
  }

  onCvFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type !== 'application/pdf') {
        this.cvFile = null;
      } else {
        this.cvFile = file;
      }
    } else {
      this.cvFile = null;
    }
  }

  setSelectedOffer(offer: Offer) {
    this.selectedOffer = {... offer};
  }
  onMotivationalFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.type !== 'application/pdf') {
        this.motivationalLetterFile = null;
      } else {
        this.motivationalLetterFile = file;
      }
    } else {
      this.motivationalLetterFile = null;
    }
  }

  submitApplication() {
     this.applicationService.createApplication(new CreateApplication(
       this.selectedOffer.id, this.currentUser.id, this.cvFile, this.motivationalLetterFile
     )).subscribe(
       data => {
         console.log(data);
         this.showSuccess('Your application has been created.');
         this.getAllOffers();
       },
       error => {
         console.log(error);
         this.showError('Error while creating application');
       }
     )
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }

  getMyApplication(idOffer: number){
    this.applicationService.getMyApplication(this.currentUser.id, idOffer).subscribe(
      data => {
        this.myApplication = data;
        console.log(this.myApplication);
      }
    );
  }

  getFileCV(idOffer: number) {
    this.applicationService.getFileCV(this.currentUser.id, idOffer, FileType.CV).
      subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cv.pdf' // Nom du fichier pour le téléchargement
        a.click();
        window.URL.revokeObjectURL(url);
      }, error => {
        console.error('Download error:', error);
      });
  }

  getFileMotivationalLetter(idOffer: number){
    this.applicationService.getFileCV(this.currentUser.id, idOffer, FileType.MOTIVATIONAL_LETTER).
    subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'LM.pdf'
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download error:', error);
    });
  }

  deleteApplication(){
    this.applicationService.deleteApplication(this.currentUser.id, this.selectedOffer.id).subscribe(
      () => {
        this.showSuccess('Application deleted');
        this.getAllOffers();
      }
    );
  }

  protected readonly ApplicationStatus = ApplicationStatus;
}
