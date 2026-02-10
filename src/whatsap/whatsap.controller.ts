import {
    Body,
    Controller,
    Get,
    Post,
    Query,
} from '@nestjs/common';
import { WhatsapWebhookDto } from 'lib/src/apps/whatsap/whatsap-webhook.dto';
import { WhatsappService } from './whatsap.service';

@Controller('webhooks/whatsapp')
export class WhatsappWebhookController {
    constructor(private readonly whatsapService: WhatsappService) { }

    @Get()
    verify(
        @Query('hub.mode') mode: string,
        @Query('hub.verify_token') token: string,
        @Query('hub.challenge') challenge: string,
    ) {
        if (
            mode === 'subscribe' &&
            token === process.env.WHATSAPP_VERIFY_TOKEN
        ) {
            return challenge;
        }

        return 'Invalid verification';
    }

    @Post()
    async handle(@Body() payload: WhatsapWebhookDto) {
        await this.whatsapService.handleWebhook(payload);
        return 'ok';
    }
}
