import { forwardRef, Module } from '@nestjs/common';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [forwardRef(() => FavoritesModule)],
  exports: [TrackService],
})
export class TrackModule {}
