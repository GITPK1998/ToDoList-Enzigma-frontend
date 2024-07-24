import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl: string = "http://localhost:8081/api"

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  addTask(data: any) {
    console.log('Adding task with data:', data);
    return this.http.post<any>(`${this.baseUrl}/addTask`, data)
  }
  getAllTasks() {
    return this.http.get<any>(`${this.baseUrl}/retrive`);
  }
  updateTask(id: any, data: any) {
    console.log('Updating task with id:', id);
    return this.http.put<any>(`${this.baseUrl}/updateTask/${id}`, data);
  }
  deleteTask(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/deleteTask/${id}`)
  }
}
