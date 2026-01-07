import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Insight {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    source: string;

    @Column()
    country: string;

    @Column()
    original_url: string;

    @Column()
    original_title: string;

    @Column('text')
    ai_summary: string;

    @Column('text')
    action_idea: string;

    @Column('text', { nullable: true })
    kr_check_similar: string;

    @Column('text', { nullable: true })
    kr_check_regulation: string;

    @Column('text', { nullable: true })
    kr_check_barrier: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
