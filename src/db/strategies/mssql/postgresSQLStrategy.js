const ICrud = require("./../interfaces/interfaceCrud");
const Sequelize = require('sequelize');

class PostgreSQLStrategy extends ICrud {
	constructor(connection, schema) {
		super();
		this._db = schema;
		this._connection = connection;
	}

	static async defineModel(connection, schema) {
		const model = connection.define(
			schema.name, schema.schema, schema.options,
		);
		await model.sync()
		return model
	}

	static async connect() {
		const sequelize = new Sequelize(
			process.env.DATABASE_SQL, //database
			process.env.DATABASE_USER, // user
			process.env.DATABASE_PASS, //senha
			{
				host: process.env.DATABASE_HOST,
				dialect: process.env.DATABASE_DIALECT,
				// case sensitive
				quoteIdentifiers: false,
				// deprecation warning
				//	operatorsAliases: false,
				//disable logging
				logging: false
				// dialectOptions: {
				//   ssl: true,
			}
		);
		return sequelize;
	}

	async isConnected() {
		try {
			//await this._connect();
			await this._connection.authenticate();
			console.log("====================")
			return true;
		} catch (error) {
			console.error("fail!", error);
			return false;
		}
	}

	create(item) {
		return this._db.create(item, {
			raw: true
		});
	}

	read(item) {
		return this._db.findAll({
			where: item,
			raw: true
		});
	}

	update(id, item, upsert = false) {
		const fn = upsert ? "upsert" : "update";
		return this._db[fn](item, {
			where: {
				id
			}
		});
	}

	delete(id) {
		const query = id
			? {
				id
			}
			: {};
		return this._db.destroy({
			where: query
		});
	}
}

module.exports = PostgreSQLStrategy; 
