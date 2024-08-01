import Appointment from '@modules/appointmant/entities/Appointment';
import Specialty from '@modules/especiality/typeorm/entities/Specialty';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('doctors')
class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_doctor: string;

  @Column('timestamp')
  age: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Specialty, specialty => specialty.doctors)
  @JoinColumn({ name: 'specialtiesId' })
  specialty: Specialty;

  @OneToMany(() => Appointment, appointment => appointment.appointmentDoctors)
  appointmentDoctor: Appointment[];
}

export default Doctor;
