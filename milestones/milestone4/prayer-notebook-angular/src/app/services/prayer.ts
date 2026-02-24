import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prayer } from '../models/prayer';

@Injectable({
  providedIn: 'root'
})
export class PrayerService {
  // Backend API URL from Milestone 3
  private apiUrl = 'http://localhost:5000/api/prayers';
  private userId = 1; // Hardcoded user ID (until we add authentication)

  constructor(private http: HttpClient) { }

  // Get all prayers for the user
  getAllPrayers(): Observable<Prayer[]> {
    return this.http.get<Prayer[]>(`${this.apiUrl}?userId=${this.userId}`);
  }

  // Get a single prayer by ID
getPrayerById(id: number): Observable<Prayer> {
  // Adding Date.now() forces a fresh request every time, bypassing 304 cache
  return this.http.get<Prayer>(`${this.apiUrl}/${id}?userId=${this.userId}&t=${Date.now()}`);
}
  // Create a new prayer
  createPrayer(prayer: Partial<Prayer>): Observable<any> {
    const prayerData = {
      ...prayer,
      userId: this.userId
    };
    return this.http.post(this.apiUrl, prayerData);
  }

  // Update an existing prayer
  updatePrayer(id: number, prayer: Partial<Prayer>): Observable<any> {
    const prayerData = {
      ...prayer,
      userId: this.userId
    };
    return this.http.put(`${this.apiUrl}/${id}`, prayerData);
  }

  // Mark prayer as answered
  markAsAnswered(id: number, notes?: string): Observable<any> {
    const data = {
      userId: this.userId,
      notes: notes || ''
    };
    return this.http.put(`${this.apiUrl}/${id}/answer`, data);
  }

  // Delete a prayer
  deletePrayer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}?userId=${this.userId}`);
  }

  // Get answered prayers
  getAnsweredPrayers(): Observable<Prayer[]> {
    return this.http.get<Prayer[]>(`${this.apiUrl}/answered?userId=${this.userId}`);
  }
}