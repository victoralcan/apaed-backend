import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import FoodStamp from './FoodStamp';
import Ncm from './Ncm';

@Entity('product')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  ncm_id: string;

  @ManyToOne(() => Ncm, { eager: true })
  ncm: Ncm;

  /*  @Column()
  foodStamp_id: string;

  @ManyToOne(() => FoodStamp, { eager: true })
  foodStamp: FoodStamp; */

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
