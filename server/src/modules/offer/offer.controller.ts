import { Controller, Get, Param, Query } from '@nestjs/common';
import { OfferService } from './offer.service';
import { FindOperator, MoreThanOrEqual } from 'typeorm';

@Controller('offers')
export class OfferController {
  constructor(private offerService: OfferService) {
  }

  @Get('/')
  findAll(
    @Query('price_gte') price_gte?: number,
    @Query('orderBy') orderBy?: Object,
    @Query('property') property?: number,
  ) {
    const where: { price?: FindOperator<number>, property_id?: number } = {};
    if (price_gte) {
      where.price = MoreThanOrEqual(price_gte);
    }
    if (property && !isNaN(+property)) {
      where.property_id = +property;
    }
    const [[prop, dir]] = Object.entries(orderBy || { id: 'DESC' });
    return this.offerService.findAll(where, prop, dir.toUpperCase());
  }

  @Get('/:id')
  get(@Param() params) {
    return this.offerService.get(params.id);
  }
}
