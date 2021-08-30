import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, Body} from '@nestjs/common';
import { EmployeeService } from './services/employee.service';
import { Employee } from './models/employee.model';
import { CreateEmployeeDto } from './dto/create-employee.dto'


@Controller('employee')
export class EmployeeController {
 
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getEmployees(): Promise<Employee[]> {
    return await this.employeeService.findAll();
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create({
      name: createEmployeeDto.name,
      designation: createEmployeeDto.designation
    });
  }

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }
}
