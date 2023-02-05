import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  getAlbums() {
    return this.albums;
  }

  getAlbum(id: string) {
    this.isNotUuidExeption(id);

    return this.album(id);
  }

  createAlbum(createUserDto: CreateAlbumDto) {
    const { name, year, artistId } = createUserDto;

    if (!name || !year || !artistId) {
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
    this.isNotUuidExeption(id);

    const album = this.album(id);

    if (name) album.name = name;
    if (year) album.year = year;
    if (artistId) album.artistId = artistId;

    return album;
  }

  deleteAlbum(id: string) {
    this.isNotUuidExeption(id);

    this.album(id);

    const newAlbums = this.albums.filter((item) => item.id !== id);

    this.albums = newAlbums;
  }

  isNotUuidExeption = (id: string): void => {
    const isUuid = uuidValidate(id) && uuidVersion(id) === 4;
    if (!isUuid) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }
  };

  album = (id: string): IAlbum => {
    const user = this.albums.find((user) => user.id === id);
    if (!user) {
      throw new HttpException(
        `User with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  };
}
