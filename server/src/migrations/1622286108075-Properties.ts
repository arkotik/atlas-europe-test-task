import { MigrationInterface, QueryRunner } from "typeorm";

export class Properties1622286108075 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE property (
            id int(11) NOT NULL AUTO_INCREMENT,
            kind varchar(31) NOT NULL,
            location varchar(255) NOT NULL,
            bedrooms smallint unsigned,
            area decimal(9,2),
            PRIMARY KEY (id)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS property;`);
  }
}
