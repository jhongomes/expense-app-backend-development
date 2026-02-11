import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as crypto from 'crypto';
import { Request } from 'express';

@Injectable()
export class WhatsappSignatureGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request>();

        const signature = req.headers['x-hub-signature-256'] as string;
        if (!signature) {
            throw new UnauthorizedException('Missing WhatsApp signature');
        }

        const secret = process.env.WHATSAPP_APP_SECRET;

        if (!secret) {
            throw new Error('WHATSAPP_APP_SECRET not set');
        }

        const rawBody = (req as any).rawBody;

        if (!rawBody) {
            throw new UnauthorizedException('Missing rawBody');
        }

        const receivedSignature = signature.replace('sha256=', '');

        const computedSignature = crypto
            .createHmac('sha256', secret)
            .update(rawBody)
            .digest();

        const receivedBuffer = Buffer.from(receivedSignature, 'hex');

        if (
            receivedBuffer.length !== computedSignature.length ||
            !crypto.timingSafeEqual(receivedBuffer, computedSignature)
        ) {
            throw new UnauthorizedException('Invalid WhatsApp signature');
        }

        return true;
    }
}
