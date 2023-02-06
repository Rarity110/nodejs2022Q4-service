import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { AlbumService } from 'src/album/album.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TrackService } from 'src/track/track.service';
import { IFavorites } from './interfaces/favorites.interface';
import { ITrack } from 'src/track/interfaces/track.interface';
import { IAlbum } from 'src/album/interfaces/album.interface';
import { IArtist } from 'src/artists/interfaces.ts/artist.interface';

enum categories {
  TRACK = 'TRACK',
  ALBUM = 'ALBUM',
  ARTIST = 'ARTIST',
}

@Injectable()
export class FavoritesService {
  public favorites: IFavorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistsService))
    public artists: ArtistsService,
    @Inject(forwardRef(() => TrackService))
    public tracks: TrackService,
    @Inject(forwardRef(() => AlbumService))
    public album: AlbumService,
  ) {}

  getFavorites() {
    return this.favorites;
  }

  addFavoriteTrack(id: string) {
    this.isNotUuidExeption(id);
    const favoriteTrack = this.isItem(id, categories.TRACK);
    this.favorites.tracks.push(favoriteTrack as ITrack);
    return `Track with id ${id} has been successfully added to favourites`;
  }

  deleteFavoriteTrack(id: string) {
    this.isNotUuidExeption(id);

    // this.isFavoriteItem(id, categories.TRACK);

    const newFavoriteTracks = this.favorites.tracks.filter(
      (item) => item.id !== id,
    );

    this.favorites.tracks = newFavoriteTracks;
  }

  addFavoriteArtist(id: string) {
    this.isNotUuidExeption(id);
    const favoriteArtist = this.isItem(id, categories.ARTIST);
    this.favorites.artists.push(favoriteArtist as IArtist);
    return `Track with id ${id} has been successfully added to favourites`;
  }

  deleteFavoriteArtist(id: string) {
    this.isNotUuidExeption(id);

    // this.isFavoriteItem(id, categories.ARTIST);

    const newFavoriteArtist = this.favorites.artists.filter(
      (item) => item.id !== id,
    );

    this.favorites.artists = newFavoriteArtist;
  }

  addFavoriteAlbum(id: string) {
    this.isNotUuidExeption(id);
    const favoriteAlbum = this.isItem(id, categories.ALBUM);
    this.favorites.albums.push(favoriteAlbum as IAlbum);
    return `Track with id ${id} has been successfully added to favourites`;
  }

  deleteFavoriteAlbum(id: string) {
    this.isNotUuidExeption(id);

    // this.isFavoriteItem(id, categories.ALBUM);

    const newFavoriteAlbum = this.favorites.albums.filter(
      (item) => item.id !== id,
    );

    this.favorites.albums = newFavoriteAlbum;
  }

  isNotUuidExeption = (id: string): void => {
    const isUuid = uuidValidate(id) && uuidVersion(id) === 4;
    if (!isUuid) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }
  };

  isItem = (id: string, category: string) => {
    let item: ITrack | IAlbum | IArtist;

    if (category === categories.TRACK) {
      item = this.tracks.getTracks().filter((el) => el.id === id)[0];
    }

    if (category === categories.ALBUM) {
      item = this.album.getAlbums().filter((el) => el.id === id)[0];
    }

    if (category === categories.ARTIST) {
      item = this.artists.getArtists().filter((el) => el.id === id)[0];
    }

    if (!item) {
      throw new HttpException(
        `Item with ${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return item;
  };

  isFavoriteItem = (id: string, category: string) => {
    const item =
      category === categories.TRACK
        ? this.favorites.tracks.filter((el) => el.id === id)[0]
        : category === categories.ALBUM
        ? this.favorites.albums.filter((el) => el.id === id)[0]
        : this.favorites.artists.filter((el) => el.id === id)[0];

    // this.favorites.tracks.find((el) => el.id === id);
    if (!item) {
      throw new HttpException(
        `Item with ${id} is not favorite`,
        HttpStatus.NOT_FOUND,
      );
    }
    return item;
  };
}
