import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PrayerService } from '../../services/prayer';
import { Prayer } from '../../models/prayer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prayer-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './prayer-list.html',
  styleUrl: './prayer-list.css'
})
export class PrayerListComponent implements OnInit {
  prayers: Prayer[] = [];
  loading = false;
  errorMessage = '';
  pageTitle = 'All Prayers';

  constructor(
    private prayerService: PrayerService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef  // Add this
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[0]?.path === 'answered') {
      this.pageTitle = 'Answered Prayers';
      this.loadAnsweredPrayers();
    } else {
      this.loadPrayers();
    }
  }

  loadPrayers(): void {
    this.loading = true;
    this.prayerService.getAllPrayers().subscribe({
      next: (data) => {
        this.prayers = data;
        this.loading = false;
        this.cdr.detectChanges();  // Add this
      },
      error: (error) => {
        console.error('Error loading prayers:', error);
        this.errorMessage = 'Failed to load prayers. Make sure your backend API is running on port 5000.';
        this.loading = false;
        this.cdr.detectChanges();  // Add this
      }
    });
  }

  loadAnsweredPrayers(): void {
    this.loading = true;
    this.prayerService.getAnsweredPrayers().subscribe({
      next: (data) => {
        this.prayers = data;
        this.loading = false;
        this.cdr.detectChanges();  // Add this
      },
      error: (error) => {
        console.error('Error loading answered prayers:', error);
        this.errorMessage = 'Failed to load answered prayers.';
        this.loading = false;
        this.cdr.detectChanges();  // Add this
      }
    });
  }

  deletePrayer(id: number): void {
    if (confirm('Are you sure you want to delete this prayer?')) {
      this.prayerService.deletePrayer(id).subscribe({
        next: () => {
          this.ngOnInit();
          alert('Prayer deleted successfully!');
        },
        error: (error) => {
          console.error('Error deleting prayer:', error);
          alert('Failed to delete prayer.');
        }
      });
    }
  }

  markAsAnswered(id: number): void {
    const notes = prompt('How was this prayer answered?');
    if (notes !== null) {
      this.prayerService.markAsAnswered(id, notes).subscribe({
        next: () => {
          this.ngOnInit();
          alert('Prayer marked as answered!');
        },
        error: (error) => {
          console.error('Error marking prayer as answered:', error);
          alert('Failed to mark prayer as answered.');
        }
      });
    }
  }
}