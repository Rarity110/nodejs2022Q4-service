import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { TrackModule } from 'src/track/track.module';
// import { AlbumModule } from 'src/album/album.module';
// import { ArtistsModule } from 'src/artists/artists.module';
// import { TrackModule } from 'src/track/track.module';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  // imports: [
  //   forwardRef(() => ArtistsModule),
  //   forwardRef(() => AlbumModule),
  //   forwardRef(() => TrackModule),
  // ],
  imports: [ArtistsModule, AlbumModule, TrackModule],
  // exports: [FavoritesService],
})
export class FavoritesModule {}
