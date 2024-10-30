import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListBooksComponent,
    AddEditBookComponent,
    SidebarComponent,
    FooterTemplateComponent,
    ShowBookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
