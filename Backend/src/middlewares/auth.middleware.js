import jwt from 'jsonwebtoken'
import {redis} from '../config/cache.js'
export async function authMiddleware(req,res,next){

try{
    const token  = req.cookies.token
     if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const isAlreadyBlackListed = await redis.get(token)

    if(isAlreadyBlackListed){
      return res.status(200).json({
        message:"token already blacklisted"
      })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

