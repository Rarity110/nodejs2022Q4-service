import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
  private artists: IArtist[] = [];

  getArtists() {
    return this.artists;
  }

  getArtist(id: string) {
    this.isNotUuidExeption(id);

    return this.artist(id);
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
    this.isNotUuidExeption(id);

    const artist = this.artist(id);

    if (name) artist.name = name;
    if (grammy) artist.grammy = grammy;

    return artist;
  }

  deleteArtist(id: string) {
    this.isNotUuidExeption(id);

    this.artist(id);

    const newArtists = this.artists.filter((item) => item.id !== id);

    this.artists = newArtists;
  }

  isNotUuidExeption = (id: string): void => {
    const isUuid = uuidValidate(id) && uuidVersion(id) === 4;
    if (!isUuid) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }
  };

  artist = (id: string): IArtist => {
    const user = this.artists.find((user) => user.id === id);
    if (!user) {
      throw new HttpException(
        `User with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  };
}
