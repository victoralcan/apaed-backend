import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTransferProductLocalDonation1632960996293
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transfer_product_local_donation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'transfer_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'product_local_donation_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'active',
            type: 'boolean',
            isNullable: false,
            default: true,
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

    await queryRunner.createForeignKey(
      'transfer_product_local_donation',
      new TableForeignKey({
        name: 'TPLDT',
        columnNames: ['transfer_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transfer',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transfer_product_local_donation',
      new TableForeignKey({
        name: 'TPLDPLD',
        columnNames: ['product_local_donation_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product_local_donation',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'transfer_product_local_donation',
      'TPLDT',
    );

    await queryRunner.dropForeignKey(
      'transfer_product_local_donation',
      'TPLDPLD',
    );

    await queryRunner.dropTable('transfer_product_local_donation');
  }
}