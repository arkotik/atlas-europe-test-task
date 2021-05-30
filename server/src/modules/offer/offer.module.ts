import { Module } from '@nestjs/common';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './offer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer])],
  exports: [OfferService],
  providers: [OfferService],
  controllers: [OfferController]
})
export class OfferModule {}
