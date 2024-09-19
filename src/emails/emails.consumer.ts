import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { Mail } from "./interfaces/mail.interface";
import { EmailsService } from "./emails.service";

@Processor('EMAILS')
export class EmailsConsumer extends WorkerHost {
  constructor (
    private readonly emailsService: EmailsService
  ) {
    super();
  }
  async process(job: Job<Mail>) {
    return this.emailsService.sendMail(job.data);
  }

  @OnWorkerEvent('active')
  onActive(job: Job<Mail>) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnWorkerEvent("completed")
  onCompleted(job: Job<Mail>, result:number) {
    console.log(
      `Completed job ${job.id} of type ${job.name} with result  ${result}...`,
    );
  }

  @OnWorkerEvent("error")
  onError() {
    console.log(
      `error job`,
    );
  }

  @OnWorkerEvent("failed")
  onfailed(job: Job) {
    console.log(
      `Failed job ${job.id} of type ${job.name} with result...`,
    );
  }
}