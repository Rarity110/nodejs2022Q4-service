import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from 'src/artists/artists.service';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TrackModule } from 'src/track/track.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [
    // forwardRef(() => FavoritesService),
    // forwardRef(() => ArtistsService),
    forwardRef(() => TrackModule),
  ],
  exports: [AlbumService],
})
export class AlbumModule {}
