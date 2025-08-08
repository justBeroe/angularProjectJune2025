import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-box',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './comment-box.html',
  styleUrl: './comment-box.css'
})
export class CommentBox implements OnInit {
  @Input() artistId!: number; // Artist ID input from parent component

  commentControl = new FormControl('');
  comments: string[] = [];
  editingIndex: number | null = null;

  currentUserId: string | null = null; // Store current logged-in user's ID

  ngOnInit() {
    // Get current user data from localStorage
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      console.warn('No user is logged in.');
      return; // Stop if no user is logged in
    }

    try {
      const user = JSON.parse(userData);
      this.currentUserId = user.id; // Store user ID for later use
    } catch {
      console.error('Invalid currentUser format in localStorage');
      return;
    }

    if (!this.artistId || !this.currentUserId) return; // Validate inputs

    // Load comments for current user and current artist only
    const stored = localStorage.getItem(this.storageKey());
    this.comments = stored ? JSON.parse(stored) : [];
  }

  // Unique storage key combining user ID and artist ID
  private storageKey(): string {
    return `comments_${this.currentUserId}_${this.artistId}`;
  }

  // Save comments back to localStorage under unique key
  saveToLocalStorage() {
    if (!this.currentUserId) return; // Safety check
    localStorage.setItem(this.storageKey(), JSON.stringify(this.comments));
  }

  addOrUpdateComment() {
    const comment = this.commentControl.value?.trim();
    if (!comment) return;

    if (this.editingIndex !== null) {
      // Update existing comment
      this.comments[this.editingIndex] = comment;
      this.editingIndex = null;
    } else {
      // Add new comment
      this.comments.push(comment);
    }

    this.commentControl.setValue('');
    this.saveToLocalStorage(); // Save changes for this user+artist only
  }

  editComment(index: number) {
    this.commentControl.setValue(this.comments[index]);
    this.editingIndex = index;
  }

  deleteComment(index: number) {
    this.comments.splice(index, 1);
    this.saveToLocalStorage();

    if (this.editingIndex === index) {
      this.editingIndex = null;
      this.commentControl.setValue('');
    }
  }
}