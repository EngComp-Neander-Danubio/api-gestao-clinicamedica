import appointmentsRoutes from "@modules/appointmant/routes/appointment.routes";
import clientsRoutes from "@modules/client/routes/clients.routes";
import agreementRoutes from "@modules/convenio/routes/agreements.routes";
import doctorsRoutes from "@modules/doctor/routes/doctor.routes";
import specialtiesRoutes from "@modules/especiality/routes/specialty.routes";
import tasksRoutes from "@modules/tasks/routes/tasks.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import sessionRouter from "@modules/users/routes/session.routes";
import usersRouter from "@modules/users/routes/user.routes";
import { Router } from "express";

const routes = Router();
routes.use('/tasks', tasksRoutes);
routes.use('/users', usersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/doctors', doctorsRoutes);
routes.use('/clients', clientsRoutes);
routes.use('/specialties', specialtiesRoutes);
routes.use('/agreements', agreementRoutes);
routes.use('/appointments', appointmentsRoutes);


export default routes;