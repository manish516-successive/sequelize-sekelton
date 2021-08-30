import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModule } from './modules/employee/employee.module';
import { DepartmentModule } from './modules/department/department.module';
import { DatabaseConfig } from './common/configs/database.config'


@Module({
  imports: [
    SequelizeModule.forRoot(DatabaseConfig),
    EmployeeModule,
    DepartmentModule
  ],
})
export class AppModule {}