import { Module } from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './employee.controller'
import { Employee } from './models/employee.model';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
  imports: [SequelizeModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [ EmployeeService ],
  exports: [EmployeeService]
})
export class EmployeeModule {}
