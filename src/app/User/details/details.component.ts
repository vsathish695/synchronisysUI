import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  MatDialog,
  MatSnackBar
} from "@angular/material";
import * as global from "../../global";
import { HttpClient } from "@angular/common/http";
import * as env from "../../../environments/environment";
import {ConfirmDialog} from '../list/list.component'
@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  public user: User;
  private apiUrl: string = env.environment.apiUrl;
  constructor(
    private route: Router,
    private dialog: MatDialog,
    private _http: HttpClient,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {
    this.user = new User();
    this.user.id = this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit() {
    this.GetUser(this.user.id);
  }
  GetUser(id: number) {
    this._http.get(this.apiUrl + "user/" + id).subscribe((data: any) => {
      if(!data){
        this.snackBar.open("No user found", "", {
          duration: 2000
        });
        setTimeout(() => {
          this.router.navigate([""]);
        }, 500);
      }
      else{
      this.user = data;
    }
    });
  }

  GoBack(): void {
    this.route.navigate([""]);
  }
  EditUser(id: number) {
   
    this.router.navigate(["/edit/"+id]);
    }
    openDialog(id): void {
      const dialogRef = this.dialog.open(ConfirmDialog, {
        width: "280px"
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log("The dialog was closed", result);
        if (result) {
          this.DeleteUser(id);
        }
      });
    }
    DeleteUser(id: number) {
      this._http.delete(this.apiUrl + "user?id=" + id).subscribe(
        (response: any) => {
          if (response && response.StatusCode == 1) {
            this.snackBar.open("User Deleted Successfully", "", {
              duration: 2000
            });
            setTimeout(() => {
              this.router.navigate([""]);
            }, 2000);
          } else {
            this.snackBar.open("Unable to delete user", "", {
              duration: 3000
            });
          }
        },
        err => {
          console.log("error", err);
        }
      );
    }
}

class User {
  public id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public avatar: string;
}
