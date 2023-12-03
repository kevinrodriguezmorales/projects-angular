import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { ListComponent } from './products/list/list.component';
import { RegisterComponent } from './products/register/register.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { EditComponent } from './products/edit/edit.component';
import { FormatDatePipe } from './core/pipes/format-date/format-date.pipe';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ImageComponent } from './components/image/image.component';
import { CapitalLettersPipe } from './core/pipes/capital-letters/capital-letters.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ListComponent,
        RegisterComponent,
        MenuComponent,
        DialogComponent,
        EditComponent,
        FormatDatePipe,
        SnackbarComponent,
        ImageComponent,
        CapitalLettersPipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
