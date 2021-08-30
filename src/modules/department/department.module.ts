import { Module } from '@nestjs/common';
import { DepartmentService } from './services/department.service';
import { DepartmentController } from './department.controller'
import { Department } from './models/department.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModule } from '../employee/employee.module';


@Module({
  imports: [SequelizeModule.forFeature([Department]), EmployeeModule],
  controllers: [DepartmentController],
  providers: [ DepartmentService ],
})
export class DepartmentModule {}
