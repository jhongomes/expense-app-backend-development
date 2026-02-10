import { Injectable, Logger } from '@nestjs/common';
import { WhatsapMessageDto } from 'lib/src/apps/whatsap/whatsap-message.dto';
import { WhatsapWebhookDto } from 'lib/src/apps/whatsap/whatsap-webhook.dto';
import { WhatsappMessageHandlerService } from './whatsapp-message-handler.service';
import { WhatsapSendService } from './services/whatsap-send.service';

@Injectable()
export class WhatsappService {
    private readonly logger = new Logger(WhatsappService.name);

    constructor(
        private readonly messageHandler: WhatsappMessageHandlerService,
        private readonly whatsapSendService: WhatsapSendService,
    ) { }

    async handleWebhook(payload: WhatsapWebhookDto): Promise<void> {
        const changes = payload.entry?.[0]?.changes?.[0]?.value;

        if (!changes?.messages?.length) return;

        for (const message of changes.messages) {
            await this.handleMessage(message);
        }
    }

    private async handleMessage(message: WhatsapMessageDto) {
        this.logger.log(
            `Mensagem recebida de ${message.from} - tipo: ${message.type}`,
        );

        if (message.type !== 'text') return;

        const text = message.text?.body;
        if (!text) return;

        const result = await this.messageHandler.handleTextMessage({
            from: message.from,
            text,
            userId: message.from,
        });

        await this.dispatchHandlerResponse(message.from, result);
    }

    private async dispatchHandlerResponse(
        to: string,
        result: { type: string; message: string },
    ) {
        switch (result.type) {
            case 'reply':
            case 'saved':
            case 'ask_confirmation':
                await this.whatsapSendService.sendText(to, result.message);
                break;

            default:
                this.logger.warn(
                    `Tipo de resposta desconhecido: ${result.type}`,
                );
        }
    }
}
