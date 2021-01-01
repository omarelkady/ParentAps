import { Observable } from "rxjs";
import { EmployeeService } from "../../services/employee.service";
import { Employee } from "../../Models/employee";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from "@angular/material";
import { UpdateEmployeeComponent } from "../update-employee/update-employee.component";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  employees: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService, private toastr: ToastrService,
    private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.reloadData();
  }
  
  openDialog(id, first_name, email) {
    const dialogRef = this.dialog.open(UpdateEmployeeComponent, {
      data: { id: id, first_name: first_name, email: email }
    });
    return dialogRef.afterClosed();
  }

  reloadData() {
    this.employeeService.getEmployeesList().subscribe(res => {
      this.employees = res.data
    })
  }

  deleteEmployee(id) {
    var confirmDelete = confirm("Are you sure you want to delete this employee ?");
    if (confirmDelete == true) {
      this.employeeService.deleteEmployee(id)
        .subscribe(
          data => {
            confirm
            this.toastr.success('Employee has been deleted successfully');
            this.reloadData();
          },
          error => console.log(error));
    } else {
      return;
    }
  }

  updateEmployee(id: number) {
    this.router.navigate(['update', id]);
  }
}
