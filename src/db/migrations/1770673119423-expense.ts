import { MigrationInterface, QueryRunner } from "typeorm";

export class Expense1770673119423 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "expense" (
            "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
            "user_id" uuid NOT NULL,
            "amount" NUMERIC(10,2) NOT NULL,
            "category" VARCHAR(30) NOT NULL,
            "description" VARCHAR(255),
            "expense_date" DATE NOT NULL,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "fk_expense_user"
              FOREIGN KEY ("user_id")
              REFERENCES "user"("id")
              ON DELETE CASCADE
    )`);
        await queryRunner.query(`
            CREATE INDEX idx_expense_user_date
            ON expense (user_id, expense_date);
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "expense"`);
    }
}
