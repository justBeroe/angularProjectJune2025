import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, switchMap } from "rxjs";

import { Song } from "../../models/song.model";
//import { Theme } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class SongService {
    // private apiUrl = 'http://localhost:3000/api/themes';
    private fetchDeezerUrl = 'http://localhost:4000/api/fetch-deezer';
    private apiUrl = 'http://localhost:4000/api/songs';
   
    // themes$: Observable<Song[]>;
    

    constructor(private httpClient: HttpClient) { }

    // getThemes(): Observable<Song[]> {
    //     return this.httpClient.get<Song[]>(this.apiUrl);
    // }

    getSongs(): Observable<Song[]> {
        return this.httpClient.get(this.fetchDeezerUrl).pipe(
            switchMap(() => this.httpClient.get<Song[]>(this.apiUrl))
        );

        // First fetch fresh data from Deezer.
        // Then get all songs from MongoDB.
    }


     getSongsWithID(artistId: number = 85): Observable<Song[]> {
        // Make request to fetch songs from given artistId, then get songs from MongoDB
        return this.httpClient.get(`${this.fetchDeezerUrl}?artistId=${artistId}`).pipe(
            switchMap(() => this.httpClient.get<Song[]>(this.apiUrl))
        );
    }

        createSong(title: string, id: number): Observable<Song> {
        return this.httpClient.post<Song>(`${this.apiUrl}/themes`, { title, id }, {
            withCredentials: true,
        });
    }
}
