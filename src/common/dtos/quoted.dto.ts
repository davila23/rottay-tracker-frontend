import { IsString, IsDate } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class QuotedIdRequestParamsDto {
  @IsString()
  readonly quotedId!: string;
}

export class QuotedDto {
  @IsString()
  @ApiModelProperty()
  readonly quotedId!: string;
  @IsString()
  @ApiModelProperty()
  readonly destination!: string;
  @IsString()
  @ApiModelProperty()
  readonly origin!: string;
  @IsString()
  @ApiModelProperty()
  readonly description!: string;
  @IsDate()
  @ApiModelProperty()
  readonly date!: string;
  
  
}