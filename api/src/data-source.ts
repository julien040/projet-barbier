import "reflect-metadata";
import { DataSource } from "typeorm";
import { Candidature } from "./entity/Candidature";

export const AppDataSource = new DataSource({
    type: "mysql",
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    entities: [Candidature],
    migrations: [],
    subscribers: [],
});
