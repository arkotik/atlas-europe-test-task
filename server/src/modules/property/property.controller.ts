import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('properties')
export class PropertyController {
  constructor(private propertyService: PropertyService) {
  }

  @Get('/')
  findAll(@Query('kind') kind?: string) {
    const where: { [kind: string]: String } = {};
    if (kind) {
      where.kind = kind;
    }
    return this.propertyService.findAll(where);
  }

  @Get('/:id')
  get(@Param() params) {
    return this.propertyService.get(params.id);
  }
}
