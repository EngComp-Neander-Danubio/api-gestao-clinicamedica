import User from '@modules/users/typeorm/entities/User';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tasks')
class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  name_task: string;

  @Column()
  priority: string;

  @Column()
  status: string;

  @Column('timestamp')
  dateBegin: Date;

  @Column('timestamp')
  dateFinish: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.tasks)
  @JoinColumn({ name: 'userId' })
  user: User;

}

export default Task;
