import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  readonly password: string;

  @IsOptional()
  @IsNumberString()
  @Length(6, 6)
  @Matches(/^\d{6}$/, {
    message: 'tfaCode must be a 6 digit code',
  })
  readonly tfaCode?: string;
}
