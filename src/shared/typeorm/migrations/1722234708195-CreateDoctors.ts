import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDoctors1722234708195 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'doctors',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name_doctor',
              type: 'varchar',
            },
            {
              name: 'age',
              type: 'timestamp',
            },
            {
              name: 'specialtiesId',
              type: 'uuid',
            },
            {
              name: 'appointmentId',
              type: 'uuid',
              isNullable: true,
            },

            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('doctors');
    }

}
