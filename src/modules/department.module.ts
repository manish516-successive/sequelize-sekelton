import { Module } from '@nestjs/common';
import { DepartmentService } from '../department/department.service';
import { DepartmentController } from '../department/department.controller'
import { Department } from '../department/department.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { EmployeeModule } from './employee.module';


@Module({
  imports: [SequelizeModule.forFeature([Department]), EmployeeModule],
  controllers: [DepartmentController],
  providers: [ DepartmentService ],
})
export class DepartmentModule {}
