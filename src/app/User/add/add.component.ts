import { Component, OnInit, Inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  MatDialogRef,
  MatDialog,
  MAT_DIALOG_DATA,
  MatSnackBar
} from "@angular/material";
import * as global from "../../global";
import { HttpClient } from "@angular/common/http";
import * as env from "../../../environments/environment";
@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  public user: User;
  private apiUrl: string = env.environment.apiUrl;
  constructor(
    private route: Router,
    private dialog: MatDialog,
    private _http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.user = new User();
  }

  ngOnInit() {}
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

  AddUser(): void {
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
      .post(this.apiUrl + "user", this.user)
      .subscribe((response: any) => {
        if (response.StatusCode == 1) {
          this.snackBar.open("User added successfully", "", {
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
  public first_name: string;
  public last_name: string;
  public email: string;
  public avatar: string;
}

@Component({
  selector: "alert",
  templateUrl: "../CommonTemplate/AlertDialog.html"
})
export class Alertclass {
  constructor(
    public dialogRef: MatDialogRef<Alertclass>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  OkClick() {
    this.dialogRef.close();
  }
}
