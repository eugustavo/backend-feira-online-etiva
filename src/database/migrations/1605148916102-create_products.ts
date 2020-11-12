import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createProducts1605148916102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "products",
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()'
					},
					{
						name: 'name',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'description',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'price',
						type: 'varchar',
						isNullable: false,
					},
					{
						name: 'user_id',
						type: 'uuid',
						isNullable: false,
					}
				]
			})
		)

		await queryRunner.createForeignKey(
			'products',
			new TableForeignKey({
				name: 'ProductsForeignKey',
				columnNames: ['user_id'],
				referencedTableName: 'users',
				referencedColumnNames: ['id'],
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			})
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('products', 'ProductsForeignKey');
		await queryRunner.dropTable('products');
	}

}
