import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ThemeItem } from '../theme-item/theme-item';
import { Observable, Subscription } from 'rxjs';
import { Song } from '../../../models/song.model';
import { SongService } from '../../../core/services/song.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-theme-board',
  imports: [ThemeItem, CommonModule],
  // imports: [ThemeItem, CommonModule],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard{
// export class ThemeBoard implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  themes: Song[] = [];
  // themes$: Observable<Song[]>;
  @Input() artistId!: number;
    themes$: Observable<Song[]> = new Observable<Song[]>();

 constructor(private route: ActivatedRoute,private songService: SongService ) 
 {
       // Optionally initialize the observable property for async pipe
    // this.themes$ = this.songService.getSongs();
    //  this.themes$ = this.songService.getSongsWithID(this.artistId);
  }

  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const artistId = Number(params.get('artistId'));
    if (artistId) {
      this.themes$ = this.songService.getSongsWithID(artistId);
    }
  });
}

  // ngOnInit(): void {
  //   // this.themeService.getThemes().pipe(takeUntilDestroyed()).subscribe((themes: Theme[]) => {

  //   this.subscriptions.push(

  //     this.themeService.getThemes().subscribe((themes: Theme[]) => {
  //      console.log(themes); // ---> Themes received !! Troubleshooting
        
  //       this.themes = themes;
  //     })
  //   );


  // }

  // ngOnDestroy(): void {
  //   // throw new Error('Method not implemented.');
  //   console.log('ThemeBoard destroyed!');
    
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  // }
}
