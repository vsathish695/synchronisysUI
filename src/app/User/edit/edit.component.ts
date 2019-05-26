import { Component, OnInit, Inject } from "@angular/core";
import { Router,ActivatedRoute } from "@angular/router";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
  MatSnackBar
} from "@angular/material";
import * as global from "../../global";
import { HttpClient } from "@angular/common/http";
import * as env from "../../../environments/environment";
import { Alertclass } from '../add/add.component';

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  public user: User;
  private apiUrl: string = env.environment.apiUrl;
  constructor(
    private route: Router,
    private dialog: MatDialog,
    private _http: HttpClient,
    private snackBar: MatSnackBar,
    private activatedRoute:ActivatedRoute
  ) {
    this.user = new User();
    this.user.id = this.activatedRoute.snapshot.params['id'];
    
  }

  ngOnInit() {
    this.GetUser(this.user.id);
  }
  GetUser(id: number) {
    this._http
      .get(this.apiUrl + "user/" + id)
      .subscribe((data: any) => {         
        this.user = data;
        
      });
  }

  GoBack(): void {
    this.route.navigate([""]);
  }

  vaildate(obj: any): boolean {
    if (!this.user.first_name) {
      obj.message = "Please enter first name";
      return false;
    }
    if (this.user.first_name.length < 10) {
      obj.message = "First name should be greater than 10 characters";
      return false;
    }
    if (!this.user.last_name) {
      obj.message = "Please enter last name";
      return false;
    }
    if (!this.user.email) {
      obj.message = "Please enter email id";
      return false;
    }
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(this.user.email)) {
      obj.message = "Please enter valid email id";
      return false;
    }
    return true;
  }

  UpdateUser(): void {
    let obj: any = {};
    obj.message = "";
    if (!this.vaildate(obj)) {
      const dialogRef = this.dialog.open(Alertclass, {
        width: "300px",
        data: { message: obj.message }
      });
      return;
    }
    this._http
      .put(this.apiUrl + "user", this.user)
      .subscribe((response: any) => {
        if (response.StatusCode == 1) {
          this.snackBar.open("User updated successfully", "", {
            duration: 2000
          });
          this.user = new User();
          setTimeout(() => {
            this.route.navigate([""]);
          }, 2000);
        } else {
          const dialogRef = this.dialog.open(Alertclass, {
            width: "300px",
            data: { message: response.Description }
          });
        }
      });
  }

  keypress(element, type, maxlength) {
    return global.default(element, type, maxlength);
  }
}

class User {
  public id : number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public avatar: string;
}

 
