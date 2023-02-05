import { ApiProperty } from '@nestjs/swagger';

export class Favorite {
  @ApiProperty({
    description: 'Artists',
    default: [],
  })
  artists: string[];

  @ApiProperty({
    description: 'Albums',
    default: [],
  })
  albums: string[];

  @ApiProperty({
    description: 'Tracks',
    default: [],
  })
  tracks: string[];
}
