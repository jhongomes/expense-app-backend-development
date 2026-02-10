import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ type: 'string', required: true, maxLength: 14, minLength: 14 })
    @IsNotEmpty()
    @IsString()
    @Length(14, 14, { message: 'Phone number must be exactly 14 characters long, including country code and dashes.' })
    phone: string;

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ type: 'string', required: false, default: 'free', enum: ['free', 'premium'] })
    @IsOptional()
    @IsString()
    plan?: 'free' | 'premium';

    @ApiProperty({ type: 'string', required: false })
    @IsOptional()
    trial_ends_at?: Date

    @ApiProperty({ type: 'number' })
    created_at: number;

    @ApiProperty({ type: 'number' })
    updated_at: number;
}