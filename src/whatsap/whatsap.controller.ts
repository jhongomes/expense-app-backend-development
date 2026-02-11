import {
    Body,
    Controller,
    Post,
    UseGuards,
} from '@nestjs/common';
import { WhatsapWebhookDto } from 'lib/src/apps/whatsap/whatsap-webhook.dto';
import { WhatsappService } from './whatsap.service';
import { WhatsappSignatureGuard } from 'lib/src/guard/whatsapp-signature.guard';

@UseGuards(WhatsappSignatureGuard)
@Controller('webhooks/whatsapp')
export class WhatsappWebhookController {
    constructor(private readonly whatsapService: WhatsappService) { }

    @Post()
    async handle(@Body() payload: WhatsapWebhookDto) {
        await this.whatsapService.handleWebhook(payload);
        return 'ok';
    }
}
