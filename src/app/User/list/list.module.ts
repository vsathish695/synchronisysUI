import { NgModule } from "@angular/core";
import { ListComponent, ConfirmDialog } from "../list/list.component";
import { AddComponent,Alertclass } from "../add/add.component";
import {EditComponent} from "../edit/edit.component";
import {DetailsComponent} from "../details/details.component";
import { listroutingModule } from "./list.routing";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";
import { MatDividerModule } from "@angular/material/divider";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms'
@NgModule({
  declarations: [ListComponent, ConfirmDialog, AddComponent,Alertclass,EditComponent,DetailsComponent],
  imports: [
    listroutingModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  entryComponents: [ConfirmDialog,Alertclass]
})
export class listModule {}
