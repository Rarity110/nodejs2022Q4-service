import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'oldpassword',
    description: 'Old Password',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly oldPassword: string;

  @ApiProperty({
    example: 'newpassword',
    description: 'New Password',
    nullable: false,
  })
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}
