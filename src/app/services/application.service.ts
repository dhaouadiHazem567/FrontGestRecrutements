import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {CreateApplication} from "../model/CreateApplication";
import {Application} from "../model/Application";
import {FileType} from "../enum/FileType";
import {ApplicationPK} from "../model/ApplicationPK";
import {ApplicationStatus} from "../enum/ApplicationStatus";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  createApplication(application: CreateApplication){
    const formData = new FormData();
    // @ts-ignore
    formData.append('fileCV', application.fileCV);
    // @ts-ignore
    formData.append('fileMotivationalLetter', application.fileMotivationalLetter);

    return this.http.post<Application>(`http://localhost:8080/application/createApplication/${application.idOffre}
    /${application.idCandidate}`, formData);
  }

  getMyApplication(idCandidate:number, idOffre: number){
    return this.http.get<Application>(`http://localhost:8080/application/retrieveApplicationById/${idCandidate}/${idOffre}`);
  }

  getFileCV(idCandidate:number, idOffre: number, fileType: FileType){
    const params = new HttpParams().set('fileType', fileType);
    return this.http.get(`http://localhost:8080/application/getFile/${idOffre}/${idCandidate}`, {params, responseType: 'blob'});
  }

  getFileMotivationalLetter(idCandidate:number, idOffre: number, fileType: FileType){
    const params = new HttpParams().set('fileType', fileType);
    return this.http.get(`http://localhost:8080/application/getFile/${idOffre}/${idCandidate}`, {params, responseType: 'blob'});
  }

  deleteApplication(idCandidate:number, idOffre: number){
    return this.http.delete(`http://localhost:8080/application/removeApplication/${idOffre}/${idCandidate}`);
  }

  getApplicationsByOffer(idOffer: number){
    return this.http.get<Application[]>(`http://localhost:8080/application/getApplicationsByOffer/${idOffer}`);
  }

  acceptApplication(id: ApplicationPK){
    return this.http.put<Application>(`http://localhost:8080/application/updateApplicationStatus/${id.idOffre}/${id.idCandidate}/${ApplicationStatus.ACCEPTED}`, {});
  }

  rejectApplication(id: ApplicationPK){
    return this.http.put<Application>(`http://localhost:8080/application/updateApplicationStatus/${id.idOffre}/${id.idCandidate}/${ApplicationStatus.REJECTED}`, {})
  }
}
