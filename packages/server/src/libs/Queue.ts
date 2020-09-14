import Bull from 'bull'
import * as redisConfig from 'configs/redis'
import NewRegistrationMail from 'jobs/NewRegistrationMail'

export interface Job<T = any> {
  key: string
  handler(job: Bull.Job<T>, options?: Bull.JobOptions): Promise<void>
}

export interface JobQueue<T = any> {
  queue: Bull.Queue
  handler(job: Bull.Job<T>, options?: Bull.JobOptions): Promise<void>
}

const jobs: Job[] = [NewRegistrationMail]

class QueueManager {
  private queues: { [key: string]: JobQueue } = {}

  constructor() {
    jobs.forEach(({ key, handler }) => {
      this.queues[key] = {
        queue: new Bull(key, { redis: redisConfig }),
        handler
      }
    })
  }

  add(queue: string, job: any) {
    console.log('job added', { queue, job })

    return this.queues[queue].queue.add(job)
  }

  processQueue() {
    jobs.forEach(job => {
      const { queue, handler } = this.queues[job.key]

      queue.process(handler)
    })

    console.log('queue processed')
  }
}

export default new QueueManager()
