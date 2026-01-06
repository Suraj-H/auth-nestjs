import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Scope } from './scope.entity';

@Entity('api_keys')
export class ApiKey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  key: string;

  @Column({ type: 'uuid', unique: true, default: () => 'gen_random_uuid()' })
  uuid: string;

  @ManyToOne(() => User, (user) => user.apiKeys)
  user: User;

  @JoinTable()
  @OneToMany(() => Scope, (scope) => scope.apiKey)
  scopes: Scope[];
}
