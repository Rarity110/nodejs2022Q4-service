import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistsService } from 'src/artists/artists.service';
import { FavoritesService } from 'src/favorites/favorites.service';
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
  // @Inject(forwardRef(() => ArtistsService))
  // private readonly artists: ArtistsService;
  public tracks: ITrack[] = [];
  // constructor(
  //   public artists: ArtistsService,
  //   public favorites: FavoritesService,
  //   public album: AlbumService,
  // ) {}

  getTracks() {
    return this.tracks;
  }

  getTrack(id: string) {
    this.isNotUuidExeption(id);

    return this.track(id);
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
    const track = this.track(id);
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

    this.track(id);

    const newTracks = this.tracks.filter((item) => item.id !== id);

    this.tracks = newTracks;

    // const favoriteTrack = this.favorites.favorites.tracks.filter(
    //   (item) => item.id !== id,
    // );

    // if (favoriteTrack) this.favorites.deleteFavoriteTrack(id);
  }

  isNotUuidExeption = (id: string): void => {
    const isUuid = uuidValidate(id) && uuidVersion(id) === 4;
    if (!isUuid) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }
  };

  track = (id: string): ITrack => {
    const track = this.tracks.find((user) => user.id === id);
    if (!track) {
      throw new HttpException(
        `User with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  };
}
