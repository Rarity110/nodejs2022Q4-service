import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
import {
  v4 as uuid,
  validate as uuidValidate,
  version as uuidVersion,
} from 'uuid';

import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IArtist } from './interfaces.ts/artist.interface';

@Injectable()
export class ArtistsService {
  public artists: IArtist[] = [];
  constructor(
    @Inject(forwardRef(() => TrackService))
    public tracks: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    public favorite: FavoritesService,
    @Inject(forwardRef(() => AlbumService))
    public albums: AlbumService,
  ) {}

  getArtists() {
    return this.artists;
  }

  getArtist(id: string) {
    this.isNotUuidExeption(id);

    const artist = this.artists.filter((el) => el.id === id)[0];
    if (!artist) {
      throw new HttpException(
        `Artist with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }

  createArtist(createUserDto: CreateArtistDto) {
    const { name, grammy } = createUserDto;

    if (!name || !grammy) {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newArtist = {
      id: uuid(),
      name: name,
      grammy: grammy,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  updateArtist(updateArtistDto: UpdateArtistDto, id: string) {
    const { name, grammy } = updateArtistDto;
    if (typeof name !== 'string' || typeof grammy !== 'boolean') {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.isNotUuidExeption(id);

    const artist = this.artists.filter((el) => el.id === id)[0];
    if (!artist) {
      throw new HttpException(
        `Artist with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    artist.name = name;
    artist.grammy = grammy;

    return artist;
  }

  deleteArtist(id: string) {
    this.isNotUuidExeption(id);

    const artist = this.artists.filter((el) => el.id === id)[0];
    if (!artist) {
      throw new HttpException(
        `Artist with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.artists = this.artists.filter((item) => item.id !== id);

    this.tracks.tracks.forEach((track) => {
      if (track.artistId === id) track.artistId = null;
    });

    this.favorite.favorites.artists.forEach((el) => {
      if (el.id === id) el.id = null;
    });
  }

  isNotUuidExeption = (id: string): void => {
    const isUuid = uuidValidate(id) && uuidVersion(id) === 4;
    if (!isUuid) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }
  };

  // findArtist = (id: string): IArtist => {
  //   const artist = this.artists.filter((el) => el.id === id)[0];
  //   if (!artist) {
  //     throw new HttpException(
  //       `Artist with ${id} does not exist`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return artist;
  // };
}
