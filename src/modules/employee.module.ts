import { Module } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { EmployeeController } from '../employee/employee.controller'
import { Employee } from '../employee/employee.model';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [ EmployeeService ],
  exports: [EmployeeService]
})
export class EmployeeModule {}
