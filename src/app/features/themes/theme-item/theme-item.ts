import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Theme } from '../../../models';
import { CommonModule } from '@angular/common';
import { Song } from '../../../models/song.model';

@Component({
  selector: 'app-theme-item',
  imports: [CommonModule],
  templateUrl: './theme-item.html',
  styleUrl: './theme-item.css'
})
export class ThemeItem implements OnInit, AfterViewInit {

  //@Input and @Output are decorators that help pass data between components
  // @Input() theme!: Theme;
  @Input() song!: Song;
  //@Input(): Parent ➡️ Child
  // Purpose:
  // Allows a child component to receive data from its parent component.

  @Input() variant: 'compact' | 'full' = 'full';
  
  constructor() {
    console.log(this.song);

  }

  ngOnInit(): void {
    console.log(this.song);
  }

  ngAfterViewInit(): void {
    console.log(this.song);
  }
}
