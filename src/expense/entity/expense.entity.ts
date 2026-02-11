import { Category } from "src/category/entity/category.entity";
import { User } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
@Index(['user', 'expense_date'])
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.expenses)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('numeric', { precision: 10, scale: 2 })
  amount: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'uuid' })
  category_id: string;

  @Column()
  category_slug: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'date' })
  expense_date: Date;

  @Column({ nullable: true })
  source?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
