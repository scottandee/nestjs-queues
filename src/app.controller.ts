import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-mail')
  sendMail(@Body() sendMailDto: SendEmailDto) {
    return this.appService.addToQueue(sendMailDto);
  }
}
