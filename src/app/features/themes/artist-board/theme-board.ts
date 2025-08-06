import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Observable, Subscription } from 'rxjs';
import { SongService } from '../../../core/services/song.service';
import { ActivatedRoute } from '@angular/router';
import { Song2 } from '../../../models/song2.model';
import { ThemeItem2 } from '../song2-item/theme-item';
import { ArtistService } from '../../../core/services/artist.service';
import { Artist } from '../../../models/artist.model';
import { ArtistItem } from '../artist-item/theme-item';

@Component({
  selector: 'app-theme-board',
  imports: [ CommonModule, ArtistItem],
  // imports: [CommonModule],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ArtistBoard{
// export class ThemeBoard implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  artist: Artist[] = [];
  // themes$: Observable<Song[]>;
  @Input() artistId!: number;
  artistd$!: Observable<Artist[]>;
  artistj$!: Observable<Artist[]>;

 constructor(private route: ActivatedRoute,private artistService: ArtistService ) 
 {
 
  }

  ngOnInit(): void {
 
      this.artistd$ = this.artistService.getDeezerArtists();
      this.artistj$ = this.artistService.getJamenArtists();
 
}


}
