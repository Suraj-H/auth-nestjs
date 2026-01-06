import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiKey } from './api-key.entity';

export enum ScopeType {
  READ = 'read',
  WRITE = 'write',
  DELETE = 'delete',
  ALL = 'all',
}

@Entity('scopes')
export class Scope {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    enum: ScopeType,
    default: ScopeType.READ,
    unique: true,
  })
  scope: string;

  @ManyToOne(() => ApiKey, (apiKey) => apiKey.scopes)
  apiKey: ApiKey;
}
