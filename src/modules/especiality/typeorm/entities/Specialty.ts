import Doctor from '@modules/doctor/typeorm/entities/Doctor';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('specialties')
class Specialty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_specialty: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Doctor, doctor => doctor.specialty)
  doctors: Doctor[];

}

export default Specialty;
