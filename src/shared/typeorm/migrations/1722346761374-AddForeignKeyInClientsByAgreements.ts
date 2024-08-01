import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class AddForeignKeyInClientsByAgreements1722346761374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey(
        'clients',
        new TableForeignKey({
          columnNames: ['agreementId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'agreements',
          onDelete: 'CASCADE',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      const table = await queryRunner.getTable('clients');
      if (table) {
        const foreignKey = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf('agreementId') !== -1,
        );
        if (foreignKey) {
          await queryRunner.dropForeignKey('clients', foreignKey);
        }
      }
    }

}
