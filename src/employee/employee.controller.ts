import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, Body} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';
import { CreateEmployeeDto } from './create-employee.dto'
import { Logger } from "nestjs-pino";


@Controller('employee')
export class EmployeeController {
 
  constructor(private readonly employeeService: EmployeeService,
        private readonly logger: Logger
    ) {}

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
    this.logger.debug("getHello()");
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Employee> {
    return this.employeeService.findOne(id);
  }
}
