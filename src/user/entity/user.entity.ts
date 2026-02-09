import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @ApiProperty({ type: 'string' })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ type: 'string', required: true })
    @Column({ unique: true })
    phone: string;

    @ApiProperty({ type: 'string', required: true })
    @Column({ nullable: true })
    name?: string;

    @ApiProperty({ type: 'string', required: true, default: 'free', enum: ['free', 'premium'] })
    @Column({ default: 'free' })
    plan: 'free' | 'premium';

    @ApiProperty({ type: 'string', nullable: true })
    @Column({ type: 'timestamp', nullable: true })
    trialEndsAt?: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //@OneToMany(() => Expense, expense => expense.user)
    //expenses: Expense[];
    //
    //@OneToOne(() => Subscription, sub => sub.user)
    //subscription: Subscription;
}
