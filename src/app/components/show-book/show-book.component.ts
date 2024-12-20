import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../interfaces/book';
import { PortraitService } from '../../services/portrait.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css'] // Corregido a "styleUrls"
})
export class ShowBookComponent implements OnInit {
  book: Book | null = null; // Cambiamos el tipo de `book` para que sea opcional
  id: number;
  bookCoverUrl: string = ''; // URL para la portada del libro
  currentUser: any = null; // Para almacenar los datos del usuario logueado

  constructor(
    private _bookService: BookService,
    private aRouter: ActivatedRoute,
    private _portraitService: PortraitService,
    private authService: AuthService // Inyectamos el AuthService
  ) {
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getDataBook(this.id);
    this.loadUserData(); // Cargamos los datos del usuario al iniciar
  }

  loadUserData() {
    this.currentUser = this.authService.currentUser; // Obtenemos los datos del usuario desde el AuthService
    if (!this.currentUser) {
      console.error('No hay usuario logueado.');
    }
  }

  getDataBook(id: number): void {
    this._bookService.getBook(id).subscribe(
      (data: Book) => {
        this.book = data; // Asignamos todo el objeto `data` a `book`
        this.getBookCover(data.isbn);
      },
      (error) => {
        console.error('Error al cargar los datos del libro:', error);
      }
    );
  }
  getBookCover(isbn: string) {
    this._portraitService.getBookCover(isbn).subscribe((data: any) => {
      console.log('Respuesta completa del API:', data);  // Verificar la respuesta del API
      this.bookCoverUrl = data.cover_url ?? "https://m.media-amazon.com/images/I/81MmomTwghL._AC_UF894,1000_QL80_.jpg";
      console.log('Portada del libro:', this.bookCoverUrl);
    }, error => {
      console.error('Error al obtener la portada del libro:', error);
      this.bookCoverUrl = "https://m.media-amazon.com/images/I/81MmomTwghL._AC_UF894,1000_QL80_.jpg";
    });
  }
}
