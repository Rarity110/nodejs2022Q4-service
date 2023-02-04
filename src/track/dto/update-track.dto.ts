import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateTrackDto {
  @ApiProperty({
    example: 'Track2',
    description: 'Name',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: '2b01523b-81b2-44dd-bed3-843e868a41bd',
    description: 'Artist Id',
  })
  @IsString()
  readonly artistId: string | null; // refers to Artist

  @ApiProperty({
    example: '2b01523b-81b2-44dd-bed3-843e868a41bd',
    description: 'Album Id',
  })
  @IsString()
  readonly albumId: string | null; // refers to Album

  @ApiProperty({
    example: '2b01523b-81b2-44dd-bed3-843e868a41bd',
    description: 'Duration',
  })
  @IsString()
  readonly duration: number; // integer number
}
