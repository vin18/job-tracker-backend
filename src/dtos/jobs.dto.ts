import { ArrayUnique, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  @ArrayUnique()
  public company: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(32)
  public position: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(10)
  public jobStatus: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  public jobType: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  public jobLocation: string;
}
