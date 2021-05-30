import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Property } from '../property/property.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  offered_by: string;

  @Column('double')
  price: string;

  @Column({ type: 'integer', name: 'property_id' })
  property_id: number;

  @ManyToOne(() => Property, offer => offer.id)
  @JoinColumn({ name: 'property_id' })
  property: Property
}
