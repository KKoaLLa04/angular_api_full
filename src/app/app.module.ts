import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
import { ChildListComponent } from './list/child-list/child-list.component';
import { ChildAddComponent } from './add/child-add/child-add.component';
import { ChildEditComponent } from './edit/child-edit/child-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './list/search/search.component';
import { PaginationComponent } from './list/pagination/pagination.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { StatusDirectiveDirective } from './directives/status-directive.directive';
import { GenderDatePipe } from './pipe/gender-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    ListComponent,
    EditComponent,
    ChildListComponent,
    ChildAddComponent,
    ChildEditComponent,
    SearchComponent,
    PaginationComponent,
    StatusDirectiveDirective,
    GenderDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }