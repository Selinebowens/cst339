import { Routes } from '@angular/router';
import { ListArtists } from './list-artists/list-artists';
import { CreateAlbum } from './create-album/create-album';

export const routes: Routes = [
    { path: 'list-artists', component: ListArtists },
    { path: 'create', component: CreateAlbum },
    { path: '', redirectTo: '/list-artists', pathMatch: 'full' }
];