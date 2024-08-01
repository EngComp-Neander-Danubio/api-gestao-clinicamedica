
import Appointment from '@modules/appointmant/entities/Appointment';
import Agreement from '@modules/convenio/typeorm/entities/Agreement';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_client: string;

  @Column('timestamp')
  age: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Agreement, agreement => agreement.client)
  @JoinColumn({ name: 'agreementId' })
  agreement: Agreement;

  @OneToMany(() => Appointment, appointment => appointment.appointmentClients)
  appointmentClient: Appointment[];

}

export default Client;
