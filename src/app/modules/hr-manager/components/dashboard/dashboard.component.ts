import {Component, OnInit} from '@angular/core';
import {User} from "../../../../model/User";
import {Offer} from "../../../../model/Offer";
import {OfferService} from "../../../../services/offer.service";
import {AuthService} from "../../../../services/auth.service";
import {MessageService} from "primeng/api";
import {ContractType} from "../../../../enum/ContractType";
import {CreateOffer} from "../../../../model/CreateOffer";
import {OffreStatus} from "../../../../enum/OffreStatus";
import {ApplicationService} from "../../../../services/application.service";
import {Application} from "../../../../model/Application";
import {ApplicationStatus} from "../../../../enum/ApplicationStatus";
import {FileType} from "../../../../enum/FileType";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  currentUser!: User;
  offers!: Offer[];
  offer: CreateOffer = {
    title:'',
    mission:'',
    experience:'',
    diploma:'',
    skills:'',
    requirement:'',
    contractType:ContractType.INTERNSHIP
  }
  selectedOffer!: Offer;

  contractTypes = Object.values(ContractType);
  offreStatuses = Object.values(OffreStatus);
  applications!: Application[];
  selectedApplication!:Application;

  constructor(private offerService: OfferService, private authService: AuthService,
              private messageService:MessageService,private applicationService: ApplicationService) {
  }

  ngOnInit() {
    this.currentUser = {... this.authService.getCurrentUser()};
    this.getMyOffers();
    this.selectedOffer = new Offer();
  }

  getMyOffers(){
    this.offerService.getMyOffers(this.currentUser.id).subscribe(offers => {
      this.offers = offers;
    });
  }

  deleteOffer(id: number) {
    this.offerService.deleteOffer(id, this.currentUser.id).subscribe(
      data => {
        this.showSuccess('Offer successfully deleted');
        this.getMyOffers();
      },
      error => this.showError('Error while deleting offer')
    )
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }

  onReset() {
    this.offer = {
      title:'',
      mission:'',
      experience:'',
      diploma:'',
      skills:'',
      requirement:'',
      contractType:ContractType.INTERNSHIP
    };
  }

  createOffer() {
    this.offerService.createOffer(this.offer, this.currentUser.id).subscribe(
      data => {
        this.showSuccess('Offer created successfully');
        this.getMyOffers();
        this.onReset();
      },
      error => this.showError('Error while creating offer')
    );
  }

  editOffer(offer: Offer) {
    this.selectedOffer = {... offer};
  }

  updateOffer() {
    this.offerService.updateOffer(this.selectedOffer, this.currentUser.id).subscribe(
      data => {
        this.showSuccess('Offer updated successfully');
        this.getMyOffers();
      },
      error => this.showError('Error while updating offer')
    )
  }

  getApplicationsByOffer(idOffer: number) {
    this.applicationService.getApplicationsByOffer(idOffer).subscribe(
      data => {
        console.log(data);
        this.applications = data;
        if(data.length === 0)
          this.showError('Offer has not applications yet');
      }
    );
  }

  rejectApplication(application: Application) {
    this.selectedApplication = application;
    this.applicationService.rejectApplication(application.applicationPK).subscribe(
      data => {
        this.showSuccess('Application has been rejected');
        this.selectedApplication.applicationStatus = ApplicationStatus.REJECTED;
      }
    )
  }

  acceptApplication(application: Application) {
    this.selectedApplication = application;
    this.applicationService.acceptApplication(application.applicationPK).subscribe(
      data => {
        this.showSuccess('Application has been accepted');
        this.selectedApplication.applicationStatus = ApplicationStatus.ACCEPTED;
      }
    )
  }

  getFileCV(idCandidate: number, idOffer: number) {
    this.applicationService.getFileCV(idCandidate, idOffer, FileType.CV).
    subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cv.pdf'
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download error:', error);
    });
  }

  getFileMotivationalLetter(idCandidate: number, idOffer: number){
    this.applicationService.getFileCV(idCandidate, idOffer, FileType.MOTIVATIONAL_LETTER).
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
}
