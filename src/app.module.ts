import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModule, DepartmentModule } from './modules/';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from "nestjs-pino";



@Module({
  imports: [
  ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'manish',
      password: 'test@123',
      database: 'test',
      autoLoadModels: true
    }),
    LoggerModule.forRoot({
      pinoHttp: [
        {
          name: 'add some name to every JSON line',
          level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info'
        },
      ]
    }),
    EmployeeModule,DepartmentModule
  ],
})
export class AppModule {}