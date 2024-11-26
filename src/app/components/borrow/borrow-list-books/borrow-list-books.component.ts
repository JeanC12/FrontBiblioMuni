import { Component } from '@angular/core';
import { BookService } from '../../../services/book.service';
import { Router } from '@angular/router';
import { Book } from '../../../interfaces/book';
import { AuthService } from '../../../services/auth.service';
import { formatDate } from '@angular/common'; // Necesario para formatear la fecha

@Component({
  selector: 'app-borrow-list-books',
  templateUrl: './borrow-list-books.component.html',
  styleUrls: ['./borrow-list-books.component.css']
})
export class BorrowListBooksComponent {
  listBook: Book[] = []; // Lista de libros disponibles
  currentUser: any = null; // Datos del usuario logueado
  borrowCode: string = ''; // Código de préstamo generado

  constructor(
    private _bookService: BookService,
    private router: Router,
    private authService: AuthService // Inyectamos el AuthService
  ) { }

  ngOnInit(): void {
    this.getListBooks();
    this.loadUserData(); // Cargamos los datos del usuario al iniciar
  }

  loadUserData() {
    this.currentUser = this.authService.currentUser; // Obtenemos los datos del usuario desde el AuthService
    if (!this.currentUser) {
      console.error('No hay usuario logueado.');
    }
  }

  // Obtener la lista de libros
  getListBooks() {
    this._bookService.getListBooks().subscribe((data: Book[]) => {
      this.listBook = data;
    });
  }

  // Generar un código único para el préstamo
  generateBorrowCode(): string {
    const userName = this.currentUser?.name || 'Usuario'; // Nombre del usuario (o 'Usuario' si no está definido)
    const now = new Date();
    return `${userName}-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
  }

  // Prestar un libro (disminuir stock)
  borrowBook(book: Book) {
    if (book.stock > 0) {
      // Llamamos al servicio para realizar el préstamo
      this._bookService.lendBook(book.id ?? 0).subscribe((response) => {
        this.borrowCode = this.generateBorrowCode(); // Generamos el código de préstamo
        this.getListBooks(); // Actualizamos la lista de libros después del préstamo
        //alert(response.msg); // Mostramos el mensaje de éxito
      }, (error) => {
        alert('Error al realizar el préstamo: ' + error.message);
      });
    } else {
      alert('No hay suficiente stock para realizar el préstamo.');
    }
  }



  // Mostrar información del libro
  showBook(id: number) {
    this.router.navigate(['/show', id]);
  }

  // Actualizar datos del libro
  updateBook(id: number) {
    this.router.navigate(['/edit', id]);
  }

  // Eliminar libro
  deleteBook(id: number) {
    this._bookService.deleteBook(id).subscribe(() => {
      this.getListBooks();
    });
  }
}
