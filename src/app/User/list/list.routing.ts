import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListComponent } from "./list.component";
import { AddComponent } from "../add/add.component";
import {EditComponent} from '../edit/edit.component';
import {DetailsComponent} from '../details/details.component';
const routes: Routes = [
  { path: "", component: ListComponent },
  { path: "add", component: AddComponent },
  {path:'edit/:id',component:EditComponent,data:{id:''}},
  {path:'detail/:id',component:DetailsComponent,data:{id:''}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class listroutingModule {}
