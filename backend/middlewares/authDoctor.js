import jwt from 'jsonwebtoken'

// doctor authentication middleware
const authDoctor= async(req,res,next)=>{
    try{
        const {dtoken} = req.headers;
        
        if(!dtoken){
            return res.json({success:false, message:"Not Authorized. login Again"});
        }
        const token_decode= jwt.verify(dtoken, process.env.JWT_SECRET)
        req.docId = token_decode.id
        next()
        

    } catch (error){
        console.error('Auth error:', error.message);
        res.json({ success: false, message: 'Unauthorized Access'})
    }
}
export default authDoctor;
