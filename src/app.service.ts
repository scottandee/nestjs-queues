import { MailerService } from '@nestjs-modules/mailer';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('EMAILS')
    private emailQueue: Queue,
    private readonly mailService: MailerService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async addToQueue(sendEmailDto: SendEmailDto) {
    const job = await this.emailQueue.add(
      'welcome mail',
      sendEmailDto,
      { priority: 1 },
    );
    return job;
  }
  
  sendMail(sendEmailDto: SendEmailDto) {
    const subject = `NestJs Queue`;
    const message = `Hi ${sendEmailDto.name}`;
    this.mailService.sendMail({
      from: 'nestjs-queue <nestjs.queue@gmail.com>',
      to: sendEmailDto.email,
      subject: subject,
      text: message,
    });
  }
}
