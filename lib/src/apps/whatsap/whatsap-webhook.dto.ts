import { WhatsapMessageDto } from "./whatsap-message.dto";

export class WhatsapWebhookDto {
    entry: Array<{
        changes: Array<{
            value: {
                messages?: WhatsapMessageDto[];
                contacts?: Array<{
                    wa_id: string;
                    profile: { name: string };
                }>;
            };
        }>;
    }>;
}
