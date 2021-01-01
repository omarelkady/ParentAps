import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateEmployee } from 'src/app/Models/update';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  first_name: string;
  email: string;
  updateEmployee: UpdateEmployee;
  updateForm: FormGroup;
  submitted = false;

  constructor(private dialogRef: MatDialogRef<UpdateEmployee>, private toastr: ToastrService,
    private employeeService: EmployeeService, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      job: ['']
    });

    this.id = this.data.id;
    this.first_name = this.data.first_name;
    this.email = this.data.email;
  }

  get f() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.employeeService.updateEmployee(this.id, this.updateEmployee)
      .subscribe(data => {
        this.updateEmployee = new UpdateEmployee();
        this.dialogRef.close();
        this.toastr.success('Employee update successfully');
      }, error => this.toastr.error(error));
  }

  cancel() {
    this.dialogRef.close();
  }
}
