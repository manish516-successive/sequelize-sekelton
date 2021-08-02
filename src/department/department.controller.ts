import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, Body} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Department } from './department.model';
import { CreateDepartmentDto } from './create-department.dto';
import { InternalServerErrorException } from '@nestjs/common';


@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get()
  async getDepartments(): Promise<Department[]> {
    return await this.departmentService.findAll();
  }

  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    try{
      return this.departmentService.create(createDepartmentDto);
    }catch(err){
      throw new InternalServerErrorException(err);
    }
  }

  @Get()
  findAll(): Promise<Department[]> {
    return this.departmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Department> {
    return this.departmentService.findOne(id);
  }
}
