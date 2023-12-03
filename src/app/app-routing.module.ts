import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './products/register/register.component';
import { ListComponent } from './products/list/list.component';
import { EditComponent } from './products/edit/edit.component';

const routes: Routes = [
    {
        path: "listado",
        component: ListComponent
    },
    {
        path: "registrar",
        component: RegisterComponent
    },
    {
        path: "editar/:id",
        component: EditComponent
    },
    {
        path: "",
        redirectTo: "listado",
        pathMatch: "full"
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
