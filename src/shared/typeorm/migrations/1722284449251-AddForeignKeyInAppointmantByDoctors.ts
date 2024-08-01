import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeyInAppointmantByDoctors1722284449251 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        columnNames: ['doctorId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'doctors',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('appointments');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('doctorId') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('appointments', foreignKey);
      }
    }
  }

}

