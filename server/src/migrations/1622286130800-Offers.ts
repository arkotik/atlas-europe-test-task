import { MigrationInterface, QueryRunner } from "typeorm";

export class Offers1622286130800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE offer (
            id int(11) NOT NULL AUTO_INCREMENT,
            offered_by varchar(255) NOT NULL,
            price double unsigned,
            property_id integer,
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS offer;`);
  }
}
