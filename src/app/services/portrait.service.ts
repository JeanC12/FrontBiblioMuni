import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortraitService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.portrait;
    this.myApiUrl = 'api/book?isbn=';
  }
  // Método para obtener la portada del libro usando ISBN
  getBookCover(isbn: string): Observable<any> {
    const url = `${this.myAppUrl}${this.myApiUrl}${isbn}`;  // Construir la URL completa
    return this.http.get(url);  // Realiza la solicitud GET a la API Flask
  }
}
