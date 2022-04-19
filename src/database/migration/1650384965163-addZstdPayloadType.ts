import { MigrationInterface, QueryRunner } from 'typeorm'

export class addZstdPayloadType1650384965163 implements MigrationInterface {
  name = 'addZstdPayloadType1650384965163'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "historyMessagePayloadEntity"
        `)

    await queryRunner.query(`
            CREATE TABLE "historyMessagePayloadEntity" (
                "id" varchar PRIMARY KEY NOT NULL,
                "payload" varchar NOT NULL,
                "payloadType" varchar CHECK(
                    payloadType IN ('Plaintext', 'Base64', 'JSON', 'Hex', 'Zstandard')
                ) NOT NULL DEFAULT ('JSON'),
                "createAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "historyMessagePayloadEntity"
        `)

    await queryRunner.query(`
            CREATE TABLE "historyMessagePayloadEntity" (
                "id" varchar PRIMARY KEY NOT NULL,
                "payload" varchar NOT NULL,
                "payloadType" varchar CHECK(
                    payloadType IN ('Plaintext', 'Base64', 'JSON', 'Hex')
                ) NOT NULL DEFAULT ('JSON'),
                "createAt" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP)
            )
        `)
  }
}
