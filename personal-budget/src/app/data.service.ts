// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any[] = [];

  constructor(private http: HttpClient) {}

  getData(): Observable<any[]> {
    if (this.data.length === 0) {
      return this.http.get<any>('http://localhost:3000/budget').pipe(
        tap((res) => {
          this.data = res.myBudget;
        }),
        catchError(this.handleError('getData', []))
      );
    } else {
      return of(this.data);
    }
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

