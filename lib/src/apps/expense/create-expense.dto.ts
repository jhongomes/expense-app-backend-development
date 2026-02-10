import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateExpenseDto {
    @ApiProperty({ type: 'string', required: true })
    @IsUUID()
    userId: string;

    @ApiProperty({ type: 'number', required: true })
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsString()
    category: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    description?: string;
    
    @ApiProperty({ type: 'string', required: true })
    @IsNotEmpty()
    @IsDateString()
    expense_date: Date;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    source?: string;
}
