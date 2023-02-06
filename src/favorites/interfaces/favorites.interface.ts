import { IAlbum } from 'src/album/interfaces/album.interface';
import { IArtist } from 'src/artists/interfaces.ts/artist.interface';
import { ITrack } from 'src/track/interfaces/track.interface';

export interface IFavorites {
  artists: IArtist[]; // favorite artists ids
  albums: IAlbum[]; // favorite albums ids
  tracks: ITrack[]; // favorite tracks ids
}
