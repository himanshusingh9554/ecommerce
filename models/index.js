import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const config = {
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'mysecretpassword',
  database: process.env.DB_NAME || 'ecommerce',
  host: process.env.DB_HOST || 'db',
  dialect: 'postgres',
};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db = {};

const files = fs
  .readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== path.basename(__filename) && file.slice(-3) === '.js');

for (const file of files) {
  const filePath = path.join(__dirname, file);
  const fileUrl = pathToFileURL(filePath);
  const module = await import(fileUrl.href);

  if (module.default && typeof module.default.init === 'function') {
    const model = module.default;
    model.init(sequelize);
    db[model.name] = model;
  }

  for (const key in module) {
    const exportedModel = module[key];
    if (exportedModel && typeof exportedModel.init === 'function') {
      exportedModel.init(sequelize);
      db[exportedModel.name] = exportedModel;
    }
  }
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
