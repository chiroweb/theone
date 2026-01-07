import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class S3Service {
    private s3Client: S3Client;
    private bucket: string;

    constructor(private configService: ConfigService) {
        this.s3Client = new S3Client({
            region: this.configService.get<string>('AWS_S3_REGION') || 'ap-northeast-2',
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID') || '',
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || '',
            },
        });
        this.bucket = this.configService.get<string>('AWS_S3_BUCKET') || '';
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const key = `${uuidv4()}-${file.originalname}`;
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                // ACL: 'public-read', // Check if ACLs are enabled on the bucket, otherwise omit or use bucket policy
            }),
        );
        return `https://${this.bucket}.s3.${this.configService.get<string>('AWS_S3_REGION')}.amazonaws.com/${key}`;
    }
}
