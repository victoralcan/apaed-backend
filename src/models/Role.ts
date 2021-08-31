import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('roles')
class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

export default Role;
