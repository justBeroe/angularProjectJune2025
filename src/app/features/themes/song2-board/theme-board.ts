import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Observable, Subscription } from 'rxjs';
import { SongService } from '../../../core/services/song.service';
import { ActivatedRoute } from '@angular/router';
import { Song2 } from '../../../models/song2.model';
import { ThemeItem2 } from '../song2-item/theme-item';

@Component({
  selector: 'app-theme-board',
  imports: [ThemeItem2, CommonModule],
  // imports: [ThemeItem, CommonModule],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard2{
// export class ThemeBoard implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  song2: Song2[] = [];
  // themes$: Observable<Song[]>;
  @Input() artistId!: number;
  song2$: Observable<Song2[]> = new Observable<Song2[]>();

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
      this.song2$ = this.songService.getSongsWithID2(artistId);
    }
  });
}


}
