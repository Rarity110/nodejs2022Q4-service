import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ArtistsService } from 'src/artists/artists.service';
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
  @Inject(forwardRef(() => ArtistsService))
  private readonly artists: ArtistsService;
  public tracks: ITrack[] = [];

  getTracks() {
    return this.tracks;
  }

  getTrack(id: string) {
    this.isNotUuidExeption(id);

    return this.track(id);
  }

  createTrack(createUserDto: CreateTrackDto) {
    const { name, artistId, albumId, duration } = createUserDto;

    if (!name || !artistId || !albumId || !duration) {
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
    const { name, artistId, albumId, duration } = updateTrackDto;
    this.isNotUuidExeption(id);

    const track = this.track(id);

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
  }

  isNotUuidExeption = (id: string): void => {
    const isUuid = uuidValidate(id) && uuidVersion(id) === 4;
    if (!isUuid) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }
  };

  track = (id: string): ITrack => {
    const user = this.tracks.find((user) => user.id === id);
    if (!user) {
      throw new HttpException(
        `User with ${id} does not exist`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  };
}
