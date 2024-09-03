import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Offer} from "../model/Offer";
import {Observable} from "rxjs";
import {CreateOffer} from "../model/CreateOffer";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private http: HttpClient) { }

  getMyOffers(idHRManager: number){
    return this.http.get<Offer[]>(`http://localhost:8080/offre/findOffresByHrManager/${idHRManager}`);
  }

  deleteOffer(idOffer: number, idHRManager: number){
    return this.http.delete<string>(`http://localhost:8080/offre/removeOfferById/${idOffer}/${idHRManager}`);
  }

  createOffer(offer: CreateOffer, idHRManager:number): Observable<Offer> {
    return this.http.post<Offer>(`http://localhost:8080/offre/createOffer/${idHRManager}`, offer);
  }

  updateOffer(offer: Offer, idHRManager:number): Observable<Offer> {
    return this.http.put<Offer>(`http://localhost:8080/offre/updateOffre/${idHRManager}`, offer);
  }

  getAllOffers(){
    return this.http.get<Offer[]>("http://localhost:8080/offre/retrieveAllOffers");
  }
}
