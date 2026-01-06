import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiKey } from '../../iam/entities/api-key.entity';
import { Role } from '../enums/role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: true })
  password: string;

  @Column({ type: 'varchar', enum: Role, default: Role.USER })
  role: Role;

  @JoinTable()
  @OneToMany(() => ApiKey, (apiKey) => apiKey.user)
  apiKeys: ApiKey[];

  @Column({ type: 'varchar', nullable: true })
  googleId: string;

  @Column({ type: 'boolean', default: false })
  isTfaEnabled: boolean;

  @Column({ nullable: true })
  tfaSecret: string;
}
