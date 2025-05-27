import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as crypto from 'crypto';
import encry from '../../utils/crypto';
import { Role } from 'src/menu/entities/role.entity';

@Entity('rh_user')
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint', // 使用大整数类型
  })
  id: number; // 标记为主键，值自动生成

  @Column({ length: 30 })
  username: string; //用户名

  @Column({ nullable: true })
  nickname: string; //昵称

  @Column()
  password: string; //密码

  @Column({ nullable: true })
  avatar: string; //头像

  @Column({ nullable: true })
  email: string; //邮箱

  @Column({ nullable: true })
  salt: string; //盐值

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'rh_user_role_relation', // 用户角色关系表
  })
  roles: Role[]; //角色

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;

  @BeforeInsert()
  beforeInsert() {
    this.salt = crypto.randomBytes(4).toString('base64');
    this.password = encry(this.password, this.salt);
  }
}
