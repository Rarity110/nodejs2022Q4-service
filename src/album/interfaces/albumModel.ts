import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Album {
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
    example: 'Album1',
    description: 'Name',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 2000,
    description: 'Year',
    nullable: false,
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    example: '2b01523b-81b2-44dd-bed3-843e868a41bv',
    description: 'Artist Id',
    uniqueItems: true,
    // nullable: false,
  })
  // @IsNotEmpty()
  // @IsString()
  artistId: string | null;
}
