# Sequelize skeleton

- [Database Connectivity using sequelize](#database-connectivity-using-sequelize)
- [Config Change](#config-change)

### Database Connectivity Using Sequelize

[Sequelize](https:///https://sequelize.org/) is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server. It features solid transaction support, relations, eager and lazy loading, read replication and more.

- Connection: For Connection,Skeleton use .env files. Please refer [Config Change](#config-change) to know how to define Database credentials for mongodb
- Model: Sequelize implements the Active Record pattern. With this pattern, we can use model classes directly to interact with the database.For example, employee table needs [employee model](https://github.com/manish516-successive/sequelize-sekelton/blob/main/src/modules/employee/models/employee.model.ts) for interaction with DB 
- Service: Sequelize skeleton interacts with models though services i.e [employee service](https://github.com/manish516-successive/sequelize-sekelton/blob/main/src/modules/employee/services/employee.service.ts) interacts with [employee model](https://github.com/manish516-successive/sequelize-sekelton/blob/main/src/modules/employee/models/employee.model.ts)
- Relationship: Sequelize Support multiple options to implememt relationship . Sequelize Skeleton demonstrate one to many releationship between Employee and Department Tables with following Structure

```
Table employee as E {
  id int [pk, increment] // auto-increment
  name varchar
  designation varchar
  department_id integer
}

Table department {
  id int [pk]
  name varchar
 }

// Creating references
// You can also define relaionship separately
// > many-to-one; < one-to-many; - one-to-one
Ref: E.department_id > department.id  
```
Sequelize skeleton define following models

- Employee Model

```
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
```

- Department Model

```
import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Employee } from "../../employee/models/employee.model";


@Table
export class Department extends Model {
  @Column
  name: string;

  @HasMany(() => Employee)
  employees?: Employee[]
}
```
Sequelize skeleton uses include to fetch a department with all the employees

```
async findAll(): Promise<Department[]> {
    return this.departmentModel.findAll({ include: [Employee] });
  }
  
```
And it uses transaction to save department and associate a employee with the department

```
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
  
```
### Config change

Sequelize Skeleton use .env file for each environment i,e For Dev Env it used dev.env and for Test Env it use test.env file. 

Sample .env file for development file

```
NODE_ENV=dev
DB_TYPE=<DB_TYPE>
DB_HOST=<DB_HOST>
DB_PORT=<DB_PORT>
DB_USERNAME=<DB_USERNAME>
DB_PASSWORD=<DB_PASSWORD>
DB_NAME=<DB_NAME>
```
