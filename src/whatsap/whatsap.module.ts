import { Module } from '@nestjs/common';
import { WhatsappWebhookController } from './whatsap.controller';
import { WhatsappService } from './whatsap.service';
import { WhatsappMessageHandlerService } from './whatsapp-message-handler.service';
import { WhatsapSendService } from './services/whatsap-send.service';
import { ExpensesModule } from 'src/expense/expense.module';
import { PendingExpenseStore } from 'lib/src/validators/pending-expense.store';

@Module({
    imports: [ExpensesModule],
    controllers: [WhatsappWebhookController],
    providers: [WhatsappService, WhatsappMessageHandlerService, WhatsapSendService, PendingExpenseStore],
    exports: [WhatsappService],
})
export class WhatsapModule { }
