const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");

const app=express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})


app.post("/",function(req,res) {
  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{

          FNAME:firstName,
          LNAME:lastName

        }
      }
    ]
  };
  var jsonData=JSON.stringify(data);
  const url="https://us2.api.mailchimp.com/3.0/lists/7927f0a519";
  const options={
    method:"POST",
    auth:"shwetha:e3c40804348c55759ffde643c6f19e3a-us2"
  }


  const request=https.request(url,options, function(response){
    if(response.statusCode==200){
      res.sendFile(__dirname+"/success.html")
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});


// list id7927f0a519
//e3c40804348c55759ffde643c6f19e3a-us2
app.post("failure",function(){
  res.redirect("/");
})
app.listen(process.eve.PORT || 3000,function(){
  console.log("server port running on port 3000");
});
