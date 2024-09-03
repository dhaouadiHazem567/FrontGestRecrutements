import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateCandidate} from "../model/CreateCandidate";
import {Candidate} from "../model/Candidate";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  createCandidate(candidate: CreateCandidate){
    return this.http.post<Candidate>("http://localhost:8080/candidate/createCandidate", candidate);
  }

  updateCandidate(candidate: User){
    return this.http.put<Candidate>("http://localhost:8080/candidate/updateCandidate", candidate);
  }
}
