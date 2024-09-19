import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Injectable()
export class EmailsService {
  constructor(
    @InjectQueue('EMAILS')
    private emailQueue: Queue,
    private readonly mailService: MailerService,
  ) {}

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
