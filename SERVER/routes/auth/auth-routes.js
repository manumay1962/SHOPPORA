const express=require('express');
const {registerUser, loginUser,logoutUser,authMiddleware}=require('../../controllers/auth/auth-controller')

const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/login",logoutUser);
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        messgae:'Authenticated User',
        user
    })
})
module.exports=router;