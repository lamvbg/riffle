import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationModel } from '../models/notification.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationApi {
    private baseUrl= "http://localhost:3000/api/notifications"
    public constructor(private http: HttpClient) {}
    
    public createNotification(
        message: string,
        redirectMessage: string
    ): Observable<NotificationModel> {
        return this.http.post<NotificationModel>(this.baseUrl, { message, redirectMessage });
    }

    public getNotifications(
        profileId: string,
        message: string
    ): Observable<NotificationModel[]> {
        return this.http.get<NotificationModel[]>(`${this.baseUrl}/${profileId}`);
    }

    public getNotification(
        notificationId: string
    ): Observable<NotificationModel> {
        return this.http.get<NotificationModel>(`${this.baseUrl}/${notificationId}`);
    }

    public markAsRead(
        notificationId: string,
        memberId: string
    ): Observable<NotificationModel> {
        return this.http.patch<NotificationModel>(`${this.baseUrl}/${notificationId}/read/${memberId}`, {});
    }
}
