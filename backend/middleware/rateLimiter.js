import ratelimit from "../config/upstash.js";

// custom middleware
const rateLimiter = async (req,res,next) => {

    try {
        const response = await ratelimit.limit("limit") // auth

        if (!response.success) { // if repsonse fails 
            return res.status(429).json({message:'Too many requests. Please try again later'})
        }
        next();
    }
    catch(err) {
        console.log(`Rate limiter error: ${err}`);

    }
}

export default rateLimiter;
