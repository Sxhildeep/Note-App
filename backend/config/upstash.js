import {Redis} from '@upstash/redis'
import  {Ratelimit} from '@upstash/ratelimit';
import dotenv from "dotenv";
dotenv.config();

// setting up rate limiter
const ratelimit = new Ratelimit({

    redis: Redis.fromEnv(), 
    limiter:Ratelimit.slidingWindow(30, "60s") // 5 requests in 10 seconds
});

export default ratelimit;
