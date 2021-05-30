import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Offer } from '../offer/offer.entity';

@Entity()
export class Property {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 31 })
  kind: string;

  @Column('varchar',{ length: 255 })
  location: string;

  @Column('smallint')
  bedrooms: number;

  @Column('decimal', { precision: 9, scale: 2 })
  area: number;

  @OneToMany(() => Offer, offer => offer.property_id)
  offers: Offer[]
}