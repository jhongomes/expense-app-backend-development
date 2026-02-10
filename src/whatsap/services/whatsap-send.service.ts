import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsapSendService {
    private readonly logger = new Logger(WhatsapSendService.name);

    private readonly apiUrl = `${process.env.WHATSAPP_API_URL}${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    private readonly token = process.env.WHATSAPP_TOKEN;

    async sendText(to: string, message: string): Promise<void> {
        try {
            await axios.post(
                this.apiUrl,
                {
                    messaging_product: 'whatsapp',
                    to,
                    type: 'text',
                    text: {
                        body: message,
                    },
                },
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                },
            );
        } catch (error) {
            this.logger.error(
                `Erro ao enviar mensagem para ${to}`,
                error?.response?.data || error,
            );

            throw new Error(`Erro ao enviar mensagem para ${to} - ${error?.response?.data || error}`);
        }
    }
}
