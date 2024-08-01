import { DataSource } from "typeorm";
import { CreateUsers1721614318664 } from "./migrations/1721614318664-CreateUsers";
import { CreateUserTokens1721615845384 } from "./migrations/1721615845384-CreateUserTokens";
import { CreateEspecialities1722234690676 } from "./migrations/1722234690676-CreateEspecialities";
import { CreateDoctors1722234708195 } from "./migrations/1722234708195-CreateDoctors";
import { CreateAppointments1722234737939 } from "./migrations/1722234737939-CreateAppointments";
import { CreateClients1722235178137 } from "./migrations/1722235178137-CreateClients";
import { AddForeignKeyInDoctorsBySpecialties1722284348286 } from "./migrations/1722284348286-AddForeignKeyInDoctorsBySpecialties";
import { AddForeignKeyInAppointmantByClients1722284436676 } from "./migrations/1722284436676-AddForeignKeyInAppointmantByClients";
import { AddForeignKeyInAppointmantByDoctors1722284449251 } from "./migrations/1722284449251-AddForeignKeyInAppointmantByDoctors";
import { CreateAggrements1722346152918 } from "./migrations/1722346152918-CreateAggrements";
import { AddForeignKeyInClientsByAgreements1722346761374 } from "./migrations/1722346761374-AddForeignKeyInClientsByAgreements";
import Doctor from "@modules/doctor/typeorm/entities/Doctor";
import Appointment from "@modules/appointmant/entities/Appointment";
import Specialty from "@modules/especiality/typeorm/entities/Specialty";
import Client from "@modules/client/typeorm/entities/Client";
import Agreement from "@modules/convenio/typeorm/entities/Agreement";
import User from "@modules/users/typeorm/entities/User";
export const dataSource = new DataSource(
  {
    type: 'postgres',
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "bia220614",
    database: "app-gestaoclinica",
    entities: [Client, Doctor, Appointment, Specialty, Agreement, User],
    migrations: [
      CreateUsers1721614318664,
      CreateUserTokens1721615845384,
      CreateEspecialities1722234690676,
      CreateDoctors1722234708195,
      CreateAppointments1722234737939,
      CreateClients1722235178137,
      CreateAggrements1722346152918,
      AddForeignKeyInDoctorsBySpecialties1722284348286,
      AddForeignKeyInClientsByAgreements1722346761374,
      AddForeignKeyInAppointmantByClients1722284436676,
      AddForeignKeyInAppointmantByDoctors1722284449251,
    ]
  })