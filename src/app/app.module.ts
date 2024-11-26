import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListBooksComponent } from './components/list-books/list-books.component';
import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';
import { HttpClientModule } from '@angular/common/http'; // Importa el módulo HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterTemplateComponent } from './components/footer-template/footer-template.component';
import { ShowBookComponent } from './components/show-book/show-book.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LogoutComponent } from './components/auth/logout/logout.component';
import { NotFountComponentComponent } from './components/not-fount-component/not-fount-component.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { BorrowListBooksComponent } from './components/borrow/borrow-list-books/borrow-list-books.component';
import { DefauldComponentComponent } from './components/defauld-component/defauld-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListBooksComponent,
    AddEditBookComponent,
    SidebarComponent,
    FooterTemplateComponent,
    ShowBookComponent,
    LoginComponent,
    LogoutComponent,
    NotFountComponentComponent,
    ChatbotComponent,
    BorrowListBooksComponent,
    DefauldComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    provideClientHydration(),
    JwtHelperService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
