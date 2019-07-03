import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

import { URL_SERVICIO } from '../config/config';
import { ToDo } from '../models/to-do.model';
import { IResponse } from '../interfaces/response.interface';
import { StatusResponse } from '../enums/status-response.enum';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() {

    const URL = URL_SERVICIO + '/todo';

    return this.http.get(URL).pipe(
      map((response: IResponse): ToDo[] => {

        let ret: ToDo[] = [];

        switch ( response.status ) {
          case StatusResponse.OK:
            ret = response.data as ToDo[];
            break;
          case StatusResponse.ERROR:
            Swal.fire('Algo salio mal!', response.message, 'error');
            break;
          case StatusResponse.NO_RECORDS_FOUND:
            Swal.fire('No hay tareas pendientes', '', 'info');
            break;
        }
        return ret;
      }),
      catchError((httpError: HttpErrorResponse) => {

        Swal.fire( 'Algo salio mal!!', httpError.error.message, 'error' );

        return throwError(httpError);
      })
    );
  }

  getById(id: string) {
    const URL = URL_SERVICIO + `/todo/${id}`;

    return this.http.get(URL).pipe(
      map((response: IResponse): ToDo => {
        let ret: ToDo;

        switch ( response.status ) {
          case StatusResponse.OK:
            ret = response.data as ToDo;
            break;
          case StatusResponse.ERROR:
            Swal.fire('Algo salio mal!', response.message, 'error');
            break;
        }
        return ret;
      }),
      catchError((httpError: HttpErrorResponse) => {

        Swal.fire( 'Algo salio mal!!', httpError.error.message, 'error' );

        return throwError(httpError);
      })
    );
  }

  create(todo: ToDo) {
    const URL = URL_SERVICIO + '/todo';

    return this.http.post(URL, todo).pipe(
      map((response: IResponse): ToDo => {
        let ret: ToDo;

        switch ( response.status ) {
          case StatusResponse.OK:
            ret = response.data as ToDo;
            break;
          case StatusResponse.ERROR:
            Swal.fire('Algo salio mal!', response.message, 'error');
            break;
        }
        return ret;
      }),
      catchError((httpError: HttpErrorResponse) => {

        Swal.fire( 'Algo salio mal!!', httpError.error.message, 'error' );

        return throwError(httpError);
      })
    );
  }

  update(id: string, todo: ToDo) {
    const URL = URL_SERVICIO + `/todo/${id}`;

    return this.http.put(URL, todo).pipe(
      map((response: IResponse): ToDo => {
        let ret: ToDo;

        switch ( response.status ) {
          case StatusResponse.OK:
            ret = response.data as ToDo;
            break;
          case StatusResponse.ERROR:
            Swal.fire('Algo salio mal!', response.message, 'error');
            break;
        }
        return ret;
      }),
      catchError((httpError: HttpErrorResponse) => {

        Swal.fire( 'Algo salio mal!!', httpError.error.message, 'error' );

        return throwError(httpError);
      })
    );
  }

  delete(id: string) {
    const URL = URL_SERVICIO + `/todo/${id}`;

    return this.http.delete(URL).pipe(
      map((response: IResponse) => {
        switch ( response.status ) {
          case StatusResponse.OK:
            Swal.fire({
              type: 'success',
              title: 'Exito',
              text: `Tarea completada con exito`,
              showConfirmButton: false,
              timer: 1200
            });
            break;
          case StatusResponse.ERROR:
            Swal.fire('Algo salio mal!', response.message, 'error');
            break;
        }
      }),
      catchError((httpError: HttpErrorResponse) => {

        Swal.fire( 'Algo salio mal!!', httpError.error.message, 'error' );

        return throwError(httpError);
      })
    );
  }

  search( term: string ) {
    const URL = URL_SERVICIO + `/todo/search/${term}`;
    return this.http.get(URL).pipe(
      map((response: IResponse): ToDo[] => {

        let ret: ToDo[] = [];

        switch ( response.status ) {
          case StatusResponse.OK:
            ret = response.data as ToDo[];
            break;
          case StatusResponse.ERROR:
            Swal.fire('Algo salio mal!', response.message, 'error');
            break;
          case StatusResponse.NO_RECORDS_FOUND:
            break;
        }
        return ret;
      }),
      catchError((httpError: HttpErrorResponse) => {

        Swal.fire( 'Algo salio mal!!', httpError.error.message, 'error' );

        return throwError(httpError);
      })
    );
  }


}
