import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async get(id: number) {
    return this.propertyRepository.findOne(id);
  }

  async findAll(where?: Object, orderBy?: string, orderDir?: 'ASC' | 'DESC'): Promise<Property[]> {
    const query = this.propertyRepository.createQueryBuilder();
    if (where) {
      query.where(where);
    }
    if (orderBy) {
      query.orderBy(orderBy, orderDir);
    }

    return query.getMany();
  }
}