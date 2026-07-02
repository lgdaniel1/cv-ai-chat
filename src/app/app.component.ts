import { RouterOutlet } from '@angular/router';
<<<<<<< HEAD
=======
import { FormsModule } from '@angular/forms';
>>>>>>> a7b6486 (addChatComponent)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
<<<<<<< HEAD
=======
import { environment } from '../environments/environment';

export interface ChatMessage {
  role: string;
  content: string;
}

export interface ChatRequest {
  query: string;
  history: ChatMessage[];
}
>>>>>>> a7b6486 (addChatComponent)

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
=======
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
>>>>>>> a7b6486 (addChatComponent)
})
export class AppComponent implements OnInit {
  cv: any = null;

  isLoading = false;
  errorMessage = '';

<<<<<<< HEAD
  private readonly cvUrl = 'https://localhost:7015/cv';
=======
  query = '';
  history: ChatMessage[] = [];
  chatLoading = false;
  isChatOpen = false;

  private readonly cvUrl = `${environment.backendUrl}/cv`;
  private readonly chatUrl = `${environment.backendUrl}/cv/chat`;
>>>>>>> a7b6486 (addChatComponent)

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCv();
  }

  loadCv(): void {
    this.isLoading = true;
    this.errorMessage = '';

<<<<<<< HEAD
    this.http.get<any>(this.cvUrl)
=======
    this.http
      .get<any>(this.cvUrl)
>>>>>>> a7b6486 (addChatComponent)
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
<<<<<<< HEAD
        })
=======
        }),
>>>>>>> a7b6486 (addChatComponent)
      )
      .subscribe((cv) => {
        if (!cv) {
          return;
        }

        this.cv = cv;
        this.isLoading = false;
      });
  }
<<<<<<< HEAD
}
=======

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
>>>>>>> a7b6486 (addChatComponent)
