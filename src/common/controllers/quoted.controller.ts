import { Controller, Get, Post, Param, Body, Delete, Put } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { QuotedIdRequestParamsDto } from '../dtos/Quoted.dto';
import { QuotedDto } from '../dtos/quoted.dto';
import { QuotedService } from '../services/quoted.service';

@Controller('quoted')
@ApiUseTags('quoted')
export class QuotedController {
  constructor(private readonly quotedService: QuotedService) { }

  /* Create Quoted */
  /*--------------------------------------------*/
  @ApiOperation({ title: 'Create Quoted' })
  @ApiResponse({ status: 200, description: 'Create Quoted.' })
  @Post()
  async createQuoted(@Body() quotedDto: QuotedDto): Promise<QuotedDto> {
    const quotedId = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    return this.quotedService.createQuoted({...{quotedId}, ...quotedDto});
  }

  /* Update Quoted */
  /*--------------------------------------------*/
  @ApiOperation({ title: 'Update quoted' })
  @ApiResponse({ status: 200, description: 'Update quoted.' })
  @Put(':quotedId')
  async updateQuoted(@Param() quotedId: QuotedIdRequestParamsDto, @Body() quotedDto: QuotedDto) {
    return this.quotedService.updateQuoted({...quotedId, ...quotedDto});
  }

  /* Delete Quoted */
  /*--------------------------------------------*/
  @ApiOperation({ title: 'Delete Quoted' })
  @ApiResponse({ status: 200, description: 'Delete Quoted.' })
  @Delete(':quotedId')
  async deleteQuoted(@Param() quotedId: QuotedIdRequestParamsDto) {
    return this.quotedService.deleteQuoted(quotedId);
  }

  /* TODO: List Quoted */
  /*--------------------------------------------*/
  @ApiOperation({ title: 'List Quoted' })
  @ApiResponse({ status: 200, description: 'List Quoted.' })
  @Get()
  async findQuoted(@Param() param) {
    return this.quotedService.findQuoted();
  }

  /* TODO: Find Quoted */
  /*--------------------------------------------*/
  @ApiOperation({ title: 'Get Quoted' })
  @ApiResponse({ status: 200, description: 'Get Quoted.' })
  @Get(':quotedId')
  async findOneQuoted(@Param() quotedId: QuotedIdRequestParamsDto) {
    return this.quotedService.findQuoted();
  }
}
