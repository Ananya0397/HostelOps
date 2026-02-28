const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let users = [];
let complaints = [];

/* ---------------- LOGIN / REGISTER ---------------- */

app.post("/api/register",(req,res)=>{
 users.push(req.body);
 res.json({message:"Registered"});
});

app.post("/api/login",(req,res)=>{
 const user = users.find(
   u=>u.username===req.body.username &&
      u.password===req.body.password
 );

 if(user){
   res.json({success:true,role:user.role});
 }else{
   res.json({success:false});
 }
});

/* ---------------- COMPLAINTS ---------------- */

app.post("/api/complaints",(req,res)=>{
 complaints.push({
   id: Date.now(),
   title:req.body.title,
   category:req.body.category,
   priority:req.body.priority,
   status:"Pending"
 });

 res.json({message:"Complaint Added"});
});

app.get("/api/complaints",(req,res)=>{
 res.json(complaints);
});

app.put("/api/complaints/:id",(req,res)=>{
 complaints = complaints.map(c=>{
   if(c.id==req.params.id){
     c.status="Resolved";
   }
   return c;
 });
 res.json({message:"Updated"});
});

app.listen(5000,()=>{
 console.log("Backend Running");
});