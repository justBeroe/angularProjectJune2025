import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ThemeItem } from '../theme-item/theme-item';
import { catchError, Observable, of, Subscription, switchMap } from 'rxjs';
import { Song } from '../../../models/song.model';
import { SongService } from '../../../core/services/song.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  songs: Song[] = [];
  // themes$: Observable<Song[]>;
  @Input() artistId!: number;
    // songs$: Observable<Song[]> = new Observable<Song[]>();
      songs$: Observable<Song[]> = of([]);

 constructor(private route: ActivatedRoute,private songService: SongService, private router: Router   ) 
 {
       // Optionally initialize the observable property for async pipe
    // this.themes$ = this.songService.getSongs();
    //  this.themes$ = this.songService.getSongsWithID(this.artistId);
  }

//   ngOnInit(): void {
//   this.route.paramMap.subscribe(params => {
//     const artistId = Number(params.get('artistId'));
//     console.log(artistId);
    



//     // Otherwise, load songs
//     // this.songs$ = this.songService.getSongsWithID(artistId);
//      this.songService.getSongsWithID(artistId).subscribe({
//       next: (songs) => {
//         if (!songs || songs.length === 0) {
//           this.router.navigate(['/not-found']); // redirect if no songs
//         } else {
//           this.songs$ = of(songs); // assign for async pipe
//         }
//       },
//       error: () => {
//         this.router.navigate(['/not-found']); // redirect on error
//       }
//     });
//   });  
// }

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

  ////


  ngOnInit(): void {
    this.songs$ = this.route.paramMap.pipe(
      switchMap(params => {
        const artistId = Number(params.get('artistId'));
        return this.songService.getSongsWithID(artistId).pipe(
          switchMap(songs => {
            if (!songs || songs.length === 0) {
              this.router.navigate(['/not-found']);
              return of([]); // return empty observable to satisfy type
            }
            return of(songs);
          }),
          catchError(() => { //This handles any error thrown by the HTTP request, like 404, 500, or network failure.
            this.router.navigate(['/not-found']);
            return of([]);
          })
        );
      })
    );
  }
}

