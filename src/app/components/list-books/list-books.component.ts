import { Component, OnInit } from '@angular/core';
import { Book } from '../../interfaces/book';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css'
})
export class ListBooksComponent implements OnInit {
  listBook: Book[] = [
  ];


  constructor(private _bookService: BookService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.getListBooks();
  }

  getListBooks() {

    this._bookService.getListBooks().subscribe((data: Book[]) => {
      this.listBook = data;
    });

  }

  showBook(id: number) {
    this.router.navigate(['/show', id]);
  }

  updateBook(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteBook(id: number) {
    this._bookService.deleteBook(id).subscribe(() => {
      this.getListBooks();
    })
  }
}
