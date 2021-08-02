import { Injectable, Inject } from '@nestjs/common';
import { Department } from './department.model';
import { CreateDepartmentDto } from './create-department.dto'
import { InjectModel } from '@nestjs/sequelize';
import { EmployeeService } from "../employee/employee.service";
import { InternalServerErrorException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Employee } from "../employee/employee.model";


@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department)
    private readonly departmentModel: typeof Department,
    private readonly employeeService: EmployeeService,
    private sequelize: Sequelize
    ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<any> {
    try{
      let department;
      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
        department = new Department(createDepartmentDto);
        await department.save(transactionHost)
        if(createDepartmentDto.employees){
          await department.$add('employees', 
            await this.employeeService.findMultiple(createDepartmentDto.employees.map((employee) => employee.id)),
            transactionHost
          );
        }
      });
      return department;
    }catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  async findAll(): Promise<Department[]> {
    return this.departmentModel.findAll({ include: [Employee] });
  }

  findOne(id: string): Promise<Department> {
    return this.departmentModel.findOne({
      where: {
        id,
      },
    });
  }
}
