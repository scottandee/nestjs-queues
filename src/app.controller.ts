import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendEmailDto } from './emails/dto/send-email.dto';
import { EmailsService } from './emails/emails.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailsService: EmailsService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-mail')
  sendMail(@Body() sendMailDto: SendEmailDto) {
    const job = this.emailsService.addToQueue(sendMailDto);
    return {
      message: "Job added to queue"
    }
  }
}
