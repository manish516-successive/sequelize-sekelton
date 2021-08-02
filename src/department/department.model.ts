import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Employee } from "../employee/employee.model";


@Table
export class Department extends Model {
  @Column
  name: string;

  @HasMany(() => Employee)
  employees?: Employee[]
}


