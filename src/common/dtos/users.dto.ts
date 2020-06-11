import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';


export class UserIdRequestParamsDto {
  @IsString()
  readonly userId!: string;
}

export class UserDto {
  @IsString()
  @ApiModelProperty()
  readonly userId!: string;
  @IsString()
  @ApiModelProperty()
  readonly firstName!: string;
  @IsString()
  @ApiModelProperty()
  readonly lastName!: string;
}