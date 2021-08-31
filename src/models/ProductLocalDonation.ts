import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Donation from './Donation';
import Local from './Local';
import Product from './Product';

@Entity('product_local_donation')
class ProductLocalDonation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('date')
  expiration_date: Date;

  @Column()
  donation_id: string;

  @ManyToOne(() => Donation, { eager: true })
  donation: Donation;

  @Column()
  local_id: string;

  @ManyToOne(() => Local, { eager: true })
  local: Local;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column('boolean')
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductLocalDonation;
