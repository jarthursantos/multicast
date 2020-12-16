import Bull from 'bull'

import { NewRegistrationMail } from '~/app/jobs/NewRegistrationMail'
import redisConfig from '~/configs/redis'

export interface Job<T = any> {
  key: string
  handler(job: Bull.Job<T>, options?: Bull.JobOptions): Promise<void>
}

export interface JobQueue<T = any> {
  queue: Bull.Queue
  handler(job: Bull.Job<T>, options?: Bull.JobOptions): Promise<void>
}

const jobs: Job[] = [NewRegistrationMail]

const queues: { [key: string]: JobQueue } = {}

jobs.forEach(({ key, handler }) => {
  queues[key] = {
    queue: new Bull(key, { redis: redisConfig }),
    handler
  }
})

export function enqueueJob(queue: string, job: any) {
  return queues[queue].queue.add(job)
}

export function processQueue() {
  jobs.forEach(job => {
    const { queue, handler } = queues[job.key]

    queue.process(handler)
  })
}
