import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CloundinaryModel } from "../models/cloundinary.model";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryApi {
  private baseUrl = "http://localhost:3000/api/cloudinary";
  public constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<{ url: string, progress: number }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<CloundinaryModel>(`${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      map((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.UploadProgress:
            return { url: '', progress: Math.round((100 * event.loaded) / (event.total || 1)) };
          case HttpEventType.Response:
            return { url: event.body.result, progress: 100 };
          default:
            return { url: '', progress: 0 };
        }
      })
    );
  }

  deleteImage(fileUrl: string): Observable<any> {
    return this.http.request('delete', `${this.baseUrl}/delete`, { body: { fileUrl } });
  }
}
