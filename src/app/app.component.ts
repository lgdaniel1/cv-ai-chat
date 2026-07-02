import { RouterOutlet } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

export interface ChatMessage {
  role: string;
  content: string;
}

export interface ChatRequest {
  query: string;
  history: ChatMessage[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  cv: any = null;

  isLoading = false;
  errorMessage = '';

  query = '';
  history: ChatMessage[] = [];
  chatLoading = false;
  isChatOpen = false;

  private readonly cvUrl = `${environment.backendUrl}/cv`;
  private readonly chatUrl = `${environment.backendUrl}/cv/chat`;
  private readonly chatTestUrl = `${environment.backendUrl}/cv/chatTest`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCv();
  }

  loadCv(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http
      .get<any>(this.cvUrl)
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
        }),
      )
      .subscribe((cv) => {
        if (!cv) {
          return;
        }

        this.cv = cv;
        this.isLoading = false;
      });
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (!this.query.trim()) {
      return;
    }

    const userMessage: ChatMessage = { role: 'user', content: this.query };
    this.history.push(userMessage);

    const request: ChatRequest = {
      query: this.query,
      history: this.history.slice(0, -1), // Send history without the current user message
    };

    this.query = '';
    this.chatLoading = true;

    this.http.post<ChatMessage>(this.chatUrl, request).subscribe({
      //this.http.post<ChatMessage>(this.chatTestUrl, request).subscribe({
      next: (response) => {
        this.history.push(response);
        this.chatLoading = false;
      },
      error: (error) => {
        console.error('Error sending message:', error);
        this.history.push({
          role: 'assistant',
          content: 'Sorry, something went wrong.',
        });
        this.chatLoading = false;
      },
    });
  }

  formatMessage(content: string): string {
    return content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  }
}
