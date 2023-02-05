import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
// import { AlbumService } from 'src/album/album.service';
// import { ArtistsService } from 'src/artists/artists.service';
// import { FavoritesService } from 'src/favorites/favorites.service';
import {
  v4 as uuid,
  validate as uuidValidate,
  version as uuidVersion,
} from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrack } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  public tracks: ITrack[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    public favorite: FavoritesService,
  ) {}

  getTracks() {
    return this.tracks;
  }

  getTrack(id: string) {
    this.isNotUuidExeption(id);
    const track = this.tracks.filter((el) => el.id === id)[0];
    if (!track) {
      throw new HttpException(
        `Track with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }

  createTrack(createUserDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createUserDto;

    if (!name || !duration) {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    const newTrack = {
      id: uuid(),
      name: name,
      artistId: artistId,
      albumId: albumId,
      duration: duration,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  updateTrack(updateTrackDto: UpdateTrackDto, id: string) {
    this.isNotUuidExeption(id);
    const track = this.tracks.filter((el) => el.id === id)[0];
    if (!track) {
      throw new HttpException(
        `Track with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    const { name, artistId, albumId, duration } = updateTrackDto;
    if (typeof name !== 'string') {
      throw new HttpException(
        'Request body does not contain required fields',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (name) track.name = name;
    if (artistId) track.artistId = artistId;
    if (albumId) track.albumId = albumId;
    if (duration) track.duration = duration;

    return track;
  }

  deleteTrack(id: string) {
    this.isNotUuidExeption(id);

    const track = this.tracks.filter((el) => el.id === id)[0];
    if (!track) {
      throw new HttpException(
        `Track with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.tracks = this.tracks.filter((item) => item.id !== id);

    const favoriteTrack = this.favorite.tracks.tracks.filter(
      (item) => item.id !== id,
    );

    if (favoriteTrack) this.favorite.deleteFavoriteTrack(id);
  }

  isNotUuidExeption = (id: string): void => {
    const isUuid = uuidValidate(id) && uuidVersion(id) === 4;
    if (!isUuid) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }
  };

  // findTrack = (id: string): ITrack => {
  //   const track = this.tracks.filter((el) => el.id === id)[0];
  //   if (!track) {
  //     throw new HttpException(
  //       `Track with ${id} does not exist`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //   return track;
  // };
}
