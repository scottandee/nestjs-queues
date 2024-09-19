import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { AppService } from "./app.service";

@Processor('EMAILS')
export class AppProcessor extends WorkerHost {
  constructor(private readonly appService: AppService) {
    super()
  }
  async process(job: Job<any>): Promise<any> {
    return this.appService.sendMail(job.data);
  }

  @OnWorkerEvent('active')
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnWorkerEvent("completed")
  onCompleted(job: Job, result) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with result  ${result}...`,
    );
  }

  @OnWorkerEvent("error")
  onError(reason) {
    console.log(
      `error job ${reason}`,
    );
  }

  @OnWorkerEvent("failed")
  onfailed(job: Job, error) {
    console.log(
      `Failed job ${job.id} of type ${job.name} with result  ${error}...`,
    );
  }
}