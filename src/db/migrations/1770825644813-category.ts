import { MigrationInterface, QueryRunner } from "typeorm";

export class Category1770825644813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    `);

        await queryRunner.query(`
        CREATE TABLE category (
        "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        "user_id" UUID NOT NULL,
        "name" VARCHAR NOT NULL,
        "slug" VARCHAR NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "fk_category_user"
          FOREIGN KEY ("user_id")
          REFERENCES "user"(id)
          ON DELETE CASCADE
      );
    `);

        await queryRunner.query(`
        CREATE UNIQUE INDEX idx_category_user_slug
        ON category ("user_id", slug);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      DROP INDEX IF EXISTS idx_category_user_slug;
    `);

        await queryRunner.query(`
      DROP TABLE IF EXISTS category;
    `);
    }

}
