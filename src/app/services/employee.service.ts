import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://reqres.in';

  constructor(private http: HttpClient) { }

  login(email, password) {
    return this.http.post(this.baseUrl + '/api/login', {
      email,
      password
    })
  }

  getEmployeesList(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/users?page=2');
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/api/users`, employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/api/users/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl + '/api/users?page=2'}` + id, { responseType: 'text' });
  }

  getEmployee(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

}
