import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Rarity',
    description: 'Login',
    uniqueItems: true,
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @ApiProperty({ example: '123456', description: 'Password', nullable: false })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
