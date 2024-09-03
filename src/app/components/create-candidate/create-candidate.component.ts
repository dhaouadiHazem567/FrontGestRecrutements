import {Component, OnInit} from '@angular/core';
import {CreateCandidate} from "../../model/CreateCandidate";
import {Gender} from "../../enum/Gender";
import {CandidateService} from "../../services/candidate.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ContractType} from "../../enum/ContractType";

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrl: './create-candidate.component.css'
})
export class CreateCandidateComponent implements OnInit{


  createCandidate!: CreateCandidate;
  experience: any;
  contractTypes = Object.values(ContractType);


  constructor(private candidateService: CandidateService, private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit() {
    this.createCandidate = {
      educations: [], experiences: [],
      firstname: '',
      lastname: '',
      phone: '',
      gender: Gender.MALE,
      birthdate: new Date(),
      username: '',
      email: '',
      password: ''
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{10,}$/;
    return passwordRegex.test(password);
  }

  onReset() {
    this.createCandidate = {
      educations: [], experiences: [],
      firstname: '',
      lastname: '',
      phone: '',
      gender: Gender.MALE,
      birthdate: new Date(),
      username: '',
      email: '',
      password: ''
    }
  }

  AddCandidate() {
    this.candidateService.createCandidate(this.createCandidate).subscribe(
      data => {
        this.showSuccess('Candidate created successfully');
        this.router.navigate(['/authentication']);
      },
      error => {
        this.showError('Username or email provided are in use');
      }
    )
  }

  showSuccess(content:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: content });
  }

  showError(content:string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: content });
  }
}
