import { Column, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Department } from "../../department/models/department.model";


@Table
export class Employee extends Model {
  @Column
  name: string;

  @Column
  designation: string;

  @ForeignKey(() => Department)
  @Column
  departmentId: number

  @BelongsTo(() => Department)
  department: Department
}


