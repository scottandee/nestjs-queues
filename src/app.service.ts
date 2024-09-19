import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // async addToQueue(sendEmailDto: SendEmailDto) {
  //   const job = await this.emailQueue.add(
  //     'welcome mail',
  //     sendEmailDto,
  //     { priority: 1 },
  //   );
  //   return job;
  // }
  
  // sendMail(sendEmailDto: SendEmailDto) {
  //   const subject = `NestJs Queue`;
  //   const message = `Hi ${sendEmailDto.name}`;
  //   this.mailService.sendMail({
  //     from: 'nestjs-queue <nestjs.queue@gmail.com>',
  //     to: sendEmailDto.email,
  //     subject: subject,
  //     text: message,
  //   });
  // }
}
