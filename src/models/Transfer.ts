import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Local from './Local';
import ProductLocalDonation from './ProductLocalDonation';

@Entity('transfer')
class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('datetime')
  transfer_date: Date;

  @Column()
  origin_id: string;

  @ManyToOne(() => Local, { eager: true })
  origin: Local;

  @Column()
  destiny_id: string;

  @ManyToOne(() => Local, { eager: true })
  destiny: Local;

  @Column()
  product_local_donation_id: string;

  @ManyToOne(() => ProductLocalDonation, { eager: true })
  productLocalDonation: ProductLocalDonation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transfer;
