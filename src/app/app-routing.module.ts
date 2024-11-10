import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { ListBooksComponent } from './components/list-books/list-books.component';
import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';
import { ShowBookComponent } from './components/show-book/show-book.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { NotFountComponentComponent } from './components/not-fount-component/not-fount-component.component';

const routes: Routes = [
  //Home
  { path: '', component: LoginComponent},
  //Auth
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  // CRUD
  { path: 'list-books', component: ListBooksComponent },
  { path: 'add', component: AddEditBookComponent },
  { path: 'edit/:id', component: AddEditBookComponent },
  { path: 'show/:id', component: ShowBookComponent },
  { path: '**', component: NotFountComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
