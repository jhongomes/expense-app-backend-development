import { Controller, Post, Body, Get, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExpensesService } from './expense.service';
import { Expense } from './entity/expense.entity';
import { ResponseTypeDto } from 'lib/src/general';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateExpenseDto } from 'lib/src/apps/expense/create-expense.dto';
import { PeriodType } from 'lib/src/util/date-range.util';

@ApiTags('Expense')
@Controller('expense')
export class ExpensesController {
    constructor(private readonly expensesService: ExpensesService) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidUnknownValues: true }))
    @ApiBody({ type: CreateExpenseDto })
    @ApiCreatedResponse({ type: Expense, description: 'The Expense has been successfully created.' })
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async createExpense(@Body() dto: CreateExpenseDto) {
        return this.expensesService.addExpense(dto.user_id, dto);
    }

    @Get('summary/today/:userId')
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async todaySummary(@Param('userId') userId: string) {
        return this.expensesService.getTodaySummary(userId);
    }

    @Get('summary/month/:userId')
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async monthSummary(@Param('userId') userId: string, @Query('date') date: Date, @Query('period') period: PeriodType) {
        return this.expensesService.getMonthlySummary(userId, date, period);
    }

    @Get(':userId')
    @ApiBadRequestResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiInternalServerErrorResponse({ type: ResponseTypeDto, description: 'An error ocurred. A message explaining will be notified.' })
    @ApiUnauthorizedResponse({ type: ResponseTypeDto, description: 'Unauthorized' })
    async listExpenses(
        @Param('userId') userId: string,
        @Query('start') start: string,
        @Query('end') end: string,
    ) {
        return this.expensesService.listByPeriod(
            userId,
            new Date(start),
            new Date(end),
        );
    }
}
