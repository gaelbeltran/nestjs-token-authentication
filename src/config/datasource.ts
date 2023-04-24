import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'devtools',
  database: 'nestjs_dev',
  synchronize: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*.{js,ts}'],
});
