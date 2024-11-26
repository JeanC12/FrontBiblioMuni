import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//Components
import { ListBooksComponent } from './components/list-books/list-books.component';
import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';
import { ShowBookComponent } from './components/show-book/show-book.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { NotFountComponentComponent } from './components/not-fount-component/not-fount-component.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { RoleGuard } from './guards/role.guard';
import { BorrowListBooksComponent } from './components/borrow/borrow-list-books/borrow-list-books.component';
import { RedirectGuard } from './guards/redirect-guard.guard';
import { DefauldComponentComponent } from './components/defauld-component/defauld-component.component';

const routes: Routes = [
  //Home
  { path: '', component: DefauldComponentComponent, canActivate: [RedirectGuard] },
  //Auth
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'list-books', component: ListBooksComponent , canActivate: [RoleGuard], data: {expectedRoles: ['admin']}},
  { path: 'list-borrow-books', component: BorrowListBooksComponent , canActivate: [RoleGuard], data: {expectedRoles: ['user']}},
  { path: 'add', component: AddEditBookComponent , canActivate: [RoleGuard], data: {expectedRoles: ['admin']}},
  { path: 'edit/:id', component: AddEditBookComponent , canActivate: [RoleGuard], data: {expectedRoles: ['admin']}},
  { path: 'show/:id', component: ShowBookComponent , canActivate: [RoleGuard], data: {expectedRoles: ['admin','user']}},
  

  //Chatbot
  { path: 'chatbot', component: ChatbotComponent, canActivate: [RoleGuard], data: {expectedRoles: ['admin','user']}}, 
  //404
  { path: '**', component: NotFountComponentComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
