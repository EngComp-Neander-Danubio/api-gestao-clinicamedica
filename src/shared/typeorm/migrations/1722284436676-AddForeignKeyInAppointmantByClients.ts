import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeyInAppointmantByClients1722284436676 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        columnNames: ['clientId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('appointments');
    if (table) {
      const foreignKey = table.foreignKeys.find(
        (fk) => fk.columnNames.indexOf('clientId') !== -1,
      );
      if (foreignKey) {
        await queryRunner.dropForeignKey('appointments', foreignKey);
      }
    }
  }

}

