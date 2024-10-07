import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class IsbnService {
  private myAppUrl: string;
  private myApiUrl: string;
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.isbn;
    this.myApiUrl = 'api/book?isbn=';
  }
  getBookByIsbn(isbn: string): Observable<Book> {
    console.log(`${this.myAppUrl}${this.myApiUrl}${isbn}`);
    return this.http.get<any>(`${this.myAppUrl}${this.myApiUrl}${isbn}`)
      .pipe(
        map(response => {
          // Assuming the API response structure is similar to the previous one
          return {
            title: response.title,
            author: response.authors[0], // Take the first author
            stock: 0
          };
        })
      );
  }
}
