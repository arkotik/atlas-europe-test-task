import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { OffersSeed, PropertiesSeed } from '../seed/dummy.seed';

export class DummyData1622287961954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('Property').save(PropertiesSeed);
    await getRepository('Offer').save(OffersSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
