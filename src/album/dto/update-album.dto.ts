import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @ApiProperty({
    example: 'Album2',
    description: 'Name',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    example: '2b01523b-81b2-44dd-bed3-843e868a41bd',
    description: 'Artist Id',
  })
  // @IsUUID('4')
  readonly artistId: string | null; // refers to Artist

  // @ApiProperty({
  //   example: '2b01523b-81b2-44dd-bed3-843e868a41bd',
  //   description: 'Album Id',
  // })
  // @IsString()
  // readonly albumId: string | null; // refers to Album

  @ApiProperty({
    example: 2001,
    description: 'Year',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly year: number;
}
