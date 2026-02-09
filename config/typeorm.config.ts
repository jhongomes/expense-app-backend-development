import { DataSource } from 'typeorm';
import { TypeormEntityConfig } from './typeorm.entity.config';
import { Entitie } from 'lib/src/enum/entities.enum';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [...TypeormEntityConfig.getEntitiesOf(Entitie.USER)],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false, // NUNCA em produção
});

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.error('Error during Data Source initialization', err);
    });