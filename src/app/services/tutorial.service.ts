import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutorial } from '../models/tutorial.model';

const baseUrl = 'http://localhost:8000/api/courses';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor(private http: HttpClient) { }

  getAll(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?IsActive=true&IsDelete=false`);
  }

  get(_id: any): Observable<Tutorial> {
    return this.http.get<Tutorial>(`${baseUrl}/${_id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(_id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${_id}`, data);
  }

  patchActive(_id: any, status: boolean): Observable<any> {
    return this.http.patch(`${baseUrl}/${_id}/active?IsActive=${status}`, { IsActive: status });
  }

  delete(_id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${_id}`);
  }

  findByTitle(course_name: any): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(`${baseUrl}?course_name=${course_name}`);
  }
}
