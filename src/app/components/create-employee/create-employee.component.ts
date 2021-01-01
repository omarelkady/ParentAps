import { EmployeeService } from '../../services/employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateEmployee } from 'src/app/Models/create';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createEmployee: CreateEmployee;
  createForm: FormGroup;
  submitted = false;

  constructor(private toastr: ToastrService, private employeeService: EmployeeService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      job: ['', Validators.required]
    });
  }

  get f() { return this.createForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.createForm.invalid) {
      return;
    }
    this.employeeService.createEmployee(this.createForm.value).subscribe(res => {
      console.log('res', res)
      this.toastr.success('Employee Added successfully');
    }, error => this.toastr.error(error))
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}
