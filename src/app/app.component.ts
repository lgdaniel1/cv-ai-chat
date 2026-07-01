import { RouterOutlet } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  cv: any = null;

  isLoading = false;
  errorMessage = '';

  private readonly cvUrl = 'https://localhost:7015/cv';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCv();
  }

  loadCv(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<any>(this.cvUrl)
      .pipe(
        timeout(20000),
        catchError((error) => {
          console.error('Error fetching CV:', error);

          this.errorMessage =
            error.name === 'TimeoutError'
              ? 'The backend did not respond within 20 seconds.'
              : 'Could not fetch CV from backend.';

          this.isLoading = false;
          return of(null);
        })
      )
      .subscribe((cv) => {
        if (!cv) {
          return;
        }

        this.cv = cv;
        this.isLoading = false;
      });
  }
}