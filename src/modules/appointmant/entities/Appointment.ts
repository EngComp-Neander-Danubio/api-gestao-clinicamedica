import Client from "@modules/client/typeorm/entities/Client";
import Doctor from "@modules/doctor/typeorm/entities/Doctor";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp')
  date_appointment: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Client, client => client.appointmentClient)
  @JoinColumn({ name: 'clientId' })
  appointmentClients: Client;

  @ManyToOne(() => Doctor, doctor => doctor.appointmentDoctor)
  @JoinColumn({ name: 'doctorId' })
  appointmentDoctors: Doctor;
}

export default Appointment;