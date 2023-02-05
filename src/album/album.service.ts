import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackService } from 'src/track/track.service';
import {
  v4 as uuid,
  validate as uuidValidate,
  version as uuidVersion,
} from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IAlbum } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  public albums: IAlbum[] = [];

  constructor(
    @Inject(forwardRef(() => TrackService))
    public tracks: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    public favorite: FavoritesService,
  ) {}

  getAlbums() {
    return this.albums;
  }

  getAlbum(id: string) {
    this.isNotUuidExeption(id);

    const album = this.albums.filter((el) => el.id === id)[0];
    if (!album) {
      throw new HttpException(
        `Album with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return album;
  }

  createAlbum(createUserDto: CreateAlbumDto) {
    const { name, year, artistId } = createUserDto;

    if (!name || !year) {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newAlbum = {
      id: uuid(),
      name: name,
      year: year,
      artistId: artistId,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  updateAlbum(updateAlbumDto: UpdateAlbumDto, id: string) {
    const { name, year, artistId } = updateAlbumDto;

    if (typeof name !== 'string' || typeof year !== 'number') {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.isNotUuidExeption(id);

    const album = this.albums.filter((el) => el.id === id)[0];
    if (!album) {
      throw new HttpException(
        `Album with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (name) album.name = name;
    if (year) album.year = year;
    if (artistId) album.artistId = artistId;

    return album;
  }

  deleteAlbum(id: string) {
    this.isNotUuidExeption(id);

    const album = this.albums.filter((el) => el.id === id)[0];
    if (!album) {
      throw new HttpException(
        `Album with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.albums = this.albums.filter((item) => item.id !== id);

    this.tracks.tracks.forEach((el) => {
      if (el.albumId === id) el.albumId = null;
    });

    this.favorite.favorites.albums.forEach((el) => {
      if (el.id === id) el.id = null;
    });
  }

  isNotUuidExeption = (id: string): void => {
    const isUuid = uuidValidate(id) && uuidVersion(id) === 4;
    if (!isUuid) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }
  };

  // findAlbum = (id: string): IAlbum => {
  //   const album = this.albums.filter((el) => el.id === id)[0];
  //   if (!album) {
  //     throw new HttpException(
  //       `Album with ${id} does not exist`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return album;
  // };
}
