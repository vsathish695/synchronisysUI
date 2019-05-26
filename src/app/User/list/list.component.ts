import { Component, OnInit, ViewChild } from "@angular/core";
import * as env from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {
  PageEvent,
  MatPaginator,
  MatDialog,
  MatDialogRef,
  MatSnackBar,
  MatTableDataSource,
  MatSort,
  Sort
} from "@angular/material";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnInit {
  public objUser: Array<data>;
  private displayedColumns: string[] = [
    "avatar",
    "first_name",
    "last_name",
    "email",
    "Action"
  ];
  public pageEvent: PageEvent;
  public objpaginator: Users;
  public sortedData: Array<data>;
  private apiUrl: string = env.environment.apiUrl;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private _http: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    console.log(env.environment);
    this.sortedData = new Array<data>();
    this.objUser = new Array<data>();
    this.objpaginator = new Users();

    this.GetUserList(1);
  }
  ngOnInit() {}
  openDialog(id): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: "280px"
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        this.DeleteUser(id);
      }
    });
  }

  GetUserList(pageIndex: number) {
    this._http
      .get(this.apiUrl + "user?page=" + pageIndex)
      .subscribe((data: any) => {
        this.objUser = data.data;
        this.objpaginator = data;
        this.sortedData = this.objUser;
        
      });
  }
  getServerData(event?: PageEvent) {
    var pageIndex = event.pageIndex == 0 ? 1 : event.pageIndex;    
    this.GetUserList(pageIndex);
    return event;
  }

  DeleteUser(id: number) {
    this._http.delete(this.apiUrl + "user?id=" + id).subscribe(
      (response: any) => {
        console.log("response", response);
        if (response && response.StatusCode == 1) {
          this.snackBar.open("User Deleted Successfully", "", {
            duration: 2000
          });
          this.GetUserList(1);
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

  EditUser(id: number) {
    this.router.navigate(["/edit/" + id]);
  }
  DetailUser(id: number) {
    this.router.navigate(["/detail/" + id]);
  }

  AddUser() {
    this.router.navigate(["/add"]);
  }

  Sort(name) {
    
    // this.objUser = this.objUser.sort((a, b) => {
    //    return a.first_name > b.first_name ? 1 : -1;
    //   });
    this.objUser = this.objUser.reverse();
      console.log("sort", name,this.objUser);
  }


   
  

  

  sortData(sort: Sort) {
    const data = this.objUser.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'first_name': return this.compare(a.first_name, b.first_name, isAsc);
        case 'last_name': return this.compare(a.last_name, b.last_name, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);        
        default: return 0;
      }
    });
  }


compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

}

class Users {
  public page: number;
  public per_page: number;
  public total: number;
  public total_pages: number;
  public data: Array<data>[];
}

class data {
  public id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public avatar: string;
}

@Component({
  selector: "ConfirmDialog",
  templateUrl: "../CommonTemplate/ConfirmDialog.html"
})
export class ConfirmDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmDialog>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}