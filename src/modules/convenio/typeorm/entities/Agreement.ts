import Client from '@modules/client/typeorm/entities/Client';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

@Entity('agreements')
class Agreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name_agreement: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Client, client => client.agreement)
  client: Client[];

}

export default Agreement;
