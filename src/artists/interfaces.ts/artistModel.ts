import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Artist {
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
    example: 'Artist1',
    description: 'Name',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: true,
    description: 'grammy',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  grammy: number;
}
