import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('clinics')
export default class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_clinica: string;

  @Column()
  address_clinica: string;

  @Column()
  phone: string;

  @Column('timestamp')
  created_at: string;

  @Column('timestamp')
  updated_at: string;

}