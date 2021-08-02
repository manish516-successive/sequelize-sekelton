import { Injectable, Inject } from '@nestjs/common';
import { Employee } from './employee.model';
import { CreateEmployeeDto } from './create-employee.dto'
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { QueryTypes } from 'sequelize';




@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee)
    private readonly employeeModel: typeof Employee) {}

  create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new Employee();
    employee.name = createEmployeeDto.name;
    employee.designation = createEmployeeDto.designation;
    return employee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.findAll();
  }

  findMultiple(empIds: number[] ): Promise<Employee[]> {
    return this.employeeModel.findAll({
      where: {
        id : empIds
      }
    });
  }

  findOne(id: number): Promise<Employee> {
    return this.employeeModel.findOne({
      where: {
        id 
      }
    });
  }
}
