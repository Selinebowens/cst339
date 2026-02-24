import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { PrayerService } from '../../services/prayer';
import { Prayer } from '../../models/prayer';

@Component({
  selector: 'app-prayer-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './prayer-form.html',
  styleUrl: './prayer-form.css'
})
export class PrayerFormComponent implements OnInit {
  prayer: Partial<Prayer> = {
    title: '',
    categoryId: null as any,
    description: '',
    notes: ''
  };

  isEditMode = false;
  loading = false;
  prayerId: number | null = null;

  constructor(
    private prayerService: PrayerService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.prayerId = +params['id'];
        this.loadPrayer(this.prayerId);
      }
    });
  }

  loadPrayer(id: number): void {
    this.loading = true;
    this.prayerService.getPrayerById(id).subscribe({
      next: (data) => {
        this.prayer = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error loading prayer:', error);
        alert('Failed to load prayer');
        this.loading = false;
        this.cdr.detectChanges();
        this.router.navigate(['/prayers']);
      }
    });
  }

  onSubmit(): void {
    if (!this.prayer.title || !this.prayer.categoryId || !this.prayer.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (this.isEditMode && this.prayerId) {
      this.prayerService.updatePrayer(this.prayerId, this.prayer).subscribe({
        next: () => {
          alert('Prayer updated successfully!');
          this.router.navigate(['/prayers']);
        },
        error: (error) => {
          console.error('Error updating prayer:', error);
          alert('Failed to update prayer');
        }
      });
    } else {
      this.prayerService.createPrayer(this.prayer).subscribe({
        next: () => {
          alert('Prayer created successfully!');
          this.router.navigate(['/prayers']);
        },
        error: (error) => {
          console.error('Error creating prayer:', error);
          alert('Failed to create prayer');
        }
      });
    }
  }
}