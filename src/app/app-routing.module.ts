import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { ShowComponent } from './show/show.component';
import { SongComponent } from './song/song.component';

const routes: Routes = [
  {path: "", redirectTo:"/artist", pathMatch: "full"},
  {path: "artist", component: ArtistComponent},
  /* {path: "album", component: AlbumComponent}, */
  { path: "album/:id", component: AlbumComponent },
  {path: 'show', component: ShowComponent },
  /* {path: "song", component: SongComponent} */
  {path: "song/:id", component: SongComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
