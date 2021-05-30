import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './offer.entity';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {
  }

  async get(id: number) {
    return this.offerRepository.findOne(id, {
      relations: ['property'],
    });
  }

  async findAll(where?: Object, orderBy?: string, orderDir?: 'ASC' | 'DESC'): Promise<Offer[]> {
    const query = this.offerRepository.createQueryBuilder()
      .leftJoinAndSelect('Offer.property', 'property');
    if (where) {
      query.where(where);
    }
    if (orderBy && ['area', 'bedrooms'].includes(orderBy)) {
      query.orderBy(`property.${orderBy}`, orderDir);
    } else if (this.offerRepository.metadata.ownColumns.some(el => el.propertyName === orderBy)) {
      query.orderBy(`Offer.${orderBy}`, orderDir);
    } else {
      query.orderBy(`Offer.id`, 'DESC');
    }
    return query.getMany();
  }
}
