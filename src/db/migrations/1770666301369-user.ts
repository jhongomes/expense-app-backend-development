import { MigrationInterface, QueryRunner } from "typeorm";

export class User1770666301369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "phone" VARCHAR(20) NOT NULL UNIQUE,
        "name" VARCHAR(100),
        "plan" VARCHAR(20) NOT NULL DEFAULT 'free',
        "trial_ends_at" TIMESTAMP,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now()
      );
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
