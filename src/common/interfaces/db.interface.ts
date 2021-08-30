export interface DatabaseInterface {
	dialect: any,
   	host: string;
   	port: number,
   	username: string,
   	password: string,
   	database: string,
   	autoLoadModels: boolean,
}