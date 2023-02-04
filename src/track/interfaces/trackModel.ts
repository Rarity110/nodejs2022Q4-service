import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Track {
  @ApiProperty({
    example: '2b01523b-81b2-44dd-bed3-843e868a41bd',
    description: 'ID',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    example: 'Sting',
    description: 'Name',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '2b01523b-81b2-44dd-bed3-843e868a41bv',
    description: 'Artist Id',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  artistId: string;

  @ApiProperty({
    example: '2b01523b-81b2-44dd-bed3-843e868a41bv',
    description: 'Album Id',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  albumId: string;

  @ApiProperty({
    example: 15,
    description: 'Duration',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  duration: number;
}
