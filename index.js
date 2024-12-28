const express=require("express");
const port =9090;
const app=express();
const cors=require("cors");
const{router}=require("./routes/routes.js");

//builtine middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"*",
    credentials:true,
    methods:["POST","GET","DELETE","PUT","PATCH"]
}));
app.use(express.static("public"));
app.use(express.static("node_modules"));

app.use("/",router);




app.listen(port,()=>{
    console.log(`server has been started at port number:${port}`);
})