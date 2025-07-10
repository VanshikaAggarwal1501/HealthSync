import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability= async(req,res)=> {

    try{
        const {docId}= req.body
        const docData= await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available:!docData.available})
        return res.json({success:true, message:"Availability Changed"})

    } catch(error) {
        console.error(error);
        return res.json({ success: false, message: error.message });

    }
}
const doctorList= async(req,res) => {
    try {
        const doctors= await doctorModel.find({}).select(['-password', '-email'])
        return res.json({success:true, doctors})

    } catch(error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}
// api for doctor login 
const loginDoctor= async(req,res) => {
    try{
        const {email,password}= req.body;
        const doctor = await doctorModel.findOne({email});
        if(!doctor) {
            return res.json({success:false, message: 'Invalid Credentials'})
        } 
        const isMatch= await bcrypt.compare(password, doctor.password);
        if(isMatch) {
            const token= jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
            return res.json({success:true, token})
        } else {
            return res.json({success:false, message: 'Invalid Credentials'})

        }

    } catch(error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}
// api to get doctor appointments for doc panel 
const appointmentsDoctor = async(req,res) => {
    try{
        const docId= req.docId;
        const appointments= await appointmentModel.find({docId});
        return res.json({success:true, appointments});

    } catch(error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}
// api to mark appointment completed 
const appointmentComplete= async(req,res)=> {
    try{
        const docId= req.docId;
        const {appointmentId}= req.body;
        const appointmentData= await appointmentModel.findById(appointmentId);
        if(appointmentData && appointmentData.docId=== docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true});
            return res.json({success:true, message:'Appointment Completed'})
        } else {
            return res.json({success:true, message:'Mark Failed'})
        }
    } catch(error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}
// api to mark appointment cancel
const appointmentCancel= async(req,res)=> {
    try{
        const docId= req.docId;
        const {appointmentId}= req.body;
        const appointmentData= await appointmentModel.findById(appointmentId);
        if(appointmentData && appointmentData.docId=== docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true});
            return res.json({success:true, message:'Appointment Cancelled'})

        } else {
            return res.json({success:true, message:'Cancellation Failed'})

        }
    } catch(error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}
// api for doctor dashboard
const doctorDashboard = async(req,res) =>{
    try{
        const docId= req.docId;
        const appointments= await appointmentModel.find({docId}).populate('userId', 'name image');
        let earnings= 0;
        appointments.forEach((item)=>{
            if(item.isCompleted || item.payment) {
                earnings+= item.amount;

            }
        })
        let patients= [];
        appointments.map((item)=> {
            if(!patients.includes(item.userId)){
                patients.push(item.userId);
            }
        })
        const dashData= {
            earnings, 
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments:appointments.reverse(),
        }
        return res.json({success:true, dashData})
    } catch(error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}
// api to get doctor profile 
const doctorProfile= async(req,res) =>{
    try{
        const docId= req.docId;
        const profileData= await doctorModel.findById(docId).select('-password');
        return res.json({success:true, profileData});
    } catch(error){
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}
// api to edit doctorProfile 
const updateDoctorProfile = async(req,res)=>{
    try{
        const docId= req.docId;
        const {fees, address,available}= req.body;
        await doctorModel.findByIdAndUpdate(docId, {fees,address,available});
        return res.json({success:true, message:'profile updated'})

    } catch(error){
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}
export {changeAvailability, doctorList, loginDoctor, 
    appointmentsDoctor, appointmentComplete,appointmentCancel, 
    doctorDashboard, doctorProfile, updateDoctorProfile}