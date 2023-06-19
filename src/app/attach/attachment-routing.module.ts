import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "../base/page-not-found/page-not-found.component";
import {AttachmentComponent} from "./attachment.component";

const routes: Routes = [
    {path: '', pathMatch: "full", redirectTo: "list"},
    {path: 'list', component: AttachmentComponent},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttachmentRoutingModule { }