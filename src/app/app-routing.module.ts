import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { ListBooksComponent } from './components/list-books/list-books.component';
import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';

const routes: Routes = [
  { path: '', component: ListBooksComponent },
  { path: 'list-books', component: ListBooksComponent },
  { path: 'add', component: AddEditBookComponent },
  { path: 'edit/:id', component: AddEditBookComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
