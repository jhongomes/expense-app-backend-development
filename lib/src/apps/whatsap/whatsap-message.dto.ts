export type WhatsappMessageType = 'text' | 'audio';

export class WhatsapMessageDto {
  from: string;
  id: string;
  timestamp: string;
  type: WhatsappMessageType;

  text?: {
    body: string;
  };

  audio?: {
    id: string;
    mime_type: string;
  };
}
