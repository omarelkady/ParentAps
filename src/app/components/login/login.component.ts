import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/Models/login';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  employeeLogin: Login = new Login();
  submitted = false;
  loginForm: FormGroup;

  constructor(private employeeService: EmployeeService, private router: Router, 
    private toastr: ToastrService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.employeeService.login(this.employeeLogin.email, this.employeeLogin.password).subscribe(res => {
      localStorage.setItem('isLoggedin', 'true');
      this.toastr.success('Login Successful');
      this.router.navigate(['/employees']);

    }, error => {
      this.toastr.error('Invalid Email or Password');
      this.employeeLogin.password = ''
    })
  }
}
