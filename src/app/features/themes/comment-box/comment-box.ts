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
 @Input() artistId!: number; // Get artist ID from parent
  commentControl = new FormControl('');
  comments: string[] = [];
  editingIndex: number | null = null;

  ngOnInit() {
    if (!this.artistId) return;
    const stored = localStorage.getItem(this.storageKey());
    this.comments = stored ? JSON.parse(stored) : [];
  }

  private storageKey(): string {
    return `comments_${this.artistId}`;
  }

  saveToLocalStorage() {
    localStorage.setItem(this.storageKey(), JSON.stringify(this.comments));
  }

  addOrUpdateComment() {
    const comment = this.commentControl.value?.trim();
    if (!comment) return;

    if (this.editingIndex !== null) {
      this.comments[this.editingIndex] = comment;
      this.editingIndex = null;
    } else {
      this.comments.push(comment);
    }

    this.commentControl.setValue('');
    this.saveToLocalStorage();
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