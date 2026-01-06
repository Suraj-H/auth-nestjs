import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @ValidateIf((object: CreateUserDto) => !object.googleId)
  @IsEmail()
  readonly email?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((object: CreateUserDto) => !object.googleId && !!object.email)
  @MinLength(8)
  @MaxLength(32)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  readonly password?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((object: CreateUserDto) => !object.googleId)
  @MinLength(2)
  @MaxLength(32)
  @Matches(/^[a-zA-Z]+$/, {
    message: 'name must contain only letters',
  })
  readonly name?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((object: CreateUserDto) => !object.email)
  readonly googleId?: string;
}
