import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateAlbumDto {
  @ApiProperty({
    example: 'Album2',
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
    example: '2001',
    description: 'Year',
  })
  @IsString()
  readonly year: number;
}
