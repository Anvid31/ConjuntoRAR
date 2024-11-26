import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

export interface Form {
  Nombre: string;
  Descripcion: string;
  Cantidad: number;
  Fecha: string;
}

@Injectable({
  providedIn: 'root',
})

export class PostService {
  private url = environment.url

  constructor(private http: HttpClient) { }

  sendData(data: any): Observable<any> {
    return this.http.post(`${this.url}Gastos`, data);
  }

  sendDataV(data: any): Observable<any> {
    return this.http.post(`${this.url}Ventas`, data);
  }


}
