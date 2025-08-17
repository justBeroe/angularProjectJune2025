import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [CommonModule,RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {}
