import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { TimeAgoPipe } from '../../../shared/pipes';
import { CommentService } from '../../../core/services/comment.service';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TimeAgoPipe],
  templateUrl: './comment-box.html',
  styleUrls: ['./comment-box.css'],
  providers: [CommentService]
})
export class CommentBox implements OnInit {
  @Input() artistId!: number;

  commentControl = new FormControl('');
  comments: { text: string; created_at: string; id?: string }[] = [];
  editingIndex: number | null = null;
  currentUserId: string | null = null;

  constructor(@Inject(CommentService) private commentService: CommentService) {}

  ngOnInit() {
    const userData = localStorage.getItem('currentUser');
    if (!userData) return;

    try {
      const user = JSON.parse(userData);
      this.currentUserId = user.id;
    } catch {
      return;
    }

    if (!this.artistId || !this.currentUserId) return;

    // 1. Try API first
    this.commentService.getByArtist(this.artistId, this.currentUserId)
      .subscribe({
        next: (data: { text: string; created_at: string; id?: string; }[]) => {
          this.comments = data;
          this.saveToLocalStorage();
        },
        error: () => {
          // 2. Fallback to localStorage if API fails
          const stored = localStorage.getItem(this.storageKey());
          this.comments = stored ? JSON.parse(stored) : [];
        }
      });
  }

  private storageKey(): string {
    return `comments_${this.currentUserId}_${this.artistId}`;
  }

  private saveToLocalStorage() {
    if (!this.currentUserId) return;
    localStorage.setItem(this.storageKey(), JSON.stringify(this.comments));
  }

  addOrUpdateComment() {
    const text = this.commentControl.value?.trim();
    if (!text || !this.currentUserId) return;

    if (this.editingIndex !== null) {
      // Update locally
      const comment = this.comments[this.editingIndex];
      comment.text = text;
      comment.created_at = comment.created_at || new Date().toISOString();

      // Update API
      if (comment.id) {
        this.commentService.update(comment.id, comment).subscribe();
      }

      this.editingIndex = null;
    } else {
      // Add locally
      const newComment = {
        text,
        created_at: new Date().toISOString(),
        userId: this.currentUserId,
        artistId: this.artistId
      };

      this.comments.push(newComment);

      // Create API
      this.commentService.create(newComment).subscribe({
        next: (res: { comment: { text: string; created_at: string; id?: string; }; }) => {
          // Replace local copy with server version (with MongoDB _id)
          const idx = this.comments.findIndex(c => c === newComment);
          if (idx !== -1) this.comments[idx] = res.comment;
          this.saveToLocalStorage();
        }
      });
    }

    this.commentControl.setValue('');
    this.saveToLocalStorage();
  }

  editComment(index: number) {
    this.commentControl.setValue(this.comments[index].text);
    this.editingIndex = index;
  }

  deleteComment(index: number) {
    const comment = this.comments[index];
    this.comments.splice(index, 1);
    this.saveToLocalStorage();

    if (comment.id) {
      this.commentService.delete(comment.id).subscribe();
    }

    if (this.editingIndex === index) {
      this.editingIndex = null;
      this.commentControl.setValue('');
    }
  }
}
