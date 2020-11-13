import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import Product from './Product';

@Entity('images')
export default class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @ManyToOne(() => Product, product => product.images)
  @JoinColumn({ name: 'product_id'})
  product: Product;
}