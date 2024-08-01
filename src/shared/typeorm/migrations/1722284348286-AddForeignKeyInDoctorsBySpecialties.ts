import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeyInDoctorsBySpecialties1722284348286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey(
        'doctors',
        new TableForeignKey({
          columnNames: ['specialtiesId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'specialties',
          onDelete: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable('doctors');
      if (table) {
        const foreignKey = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf('specialtiesId') !== -1,
        );
        if (foreignKey) {
          await queryRunner.dropForeignKey('doctors', foreignKey);
        }
      }
    }


}
