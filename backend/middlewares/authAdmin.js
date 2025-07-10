import jwt from 'jsonwebtoken'

// admin authentication middleware
const authAdmin= async(req,res,next)=>{
    try{
        const {atoken} = req.headers;
        
        if(!atoken){
            return res.json({success:false, message:"Not Authorized. login Again"});
        }
        const token_decode= jwt.verify(atoken, process.env.JWT_SECRET)
        if(token_decode.email !== process.env.ADMIN_EMAIL){
            return res.json({success:false, message:"Not Authorized login Again"});
        }
        next()
        

    } catch (error){
        console.error('Auth error:', error.message);
        res.json({ success: false, message: 'Unauthorized Access'})
    }
}
export default authAdmin;
