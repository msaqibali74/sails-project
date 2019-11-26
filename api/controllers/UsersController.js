module.exports = {
  login: function(req, res)
  {
    res.view('users/login',{layout: 'layouts/loginlayout',title: 'Login'});
  },
  
  loginprocess:async function(req,res)
  {
    var userRecord = await Users.findOne({
      email: req.param('email').toLowerCase(),
    }); 
    if(!userRecord) {
      console.log("User Doesnt Exists");
    }
    const machinepack=require('machinepack-passwords');
        machinepack.checkPassword({passwordAttempt: req.param('password'),encryptedPassword:  userRecord['password']})
        .exec({
        error: function (err){
          console.log("There is Error in checking password");
          console.log(err);
        },
        incorrect: function (){
          console.log("Incorrect password provided")
        },
        success: function (){
          req.session.userId = userRecord['id'];
          req.session.userName = userRecord['username'];
          req.session.Name = userRecord['name'];
          req.session.title = userRecord['title'];
          res.json("User Logged in");
        }
      });
  },
  register: function(req,res)
  {
    res.view('users/register',{layout: 'layouts/loginlayout',title:'Register'});
    console.log(req.session.authenticated);
  },
  create:async function(req,res,next)
  {
     var ErrorMessage="";
    var result = await Users.find({
      select: [ 'email','username'],
      where: {or:[
          {username:req.param('username')},
          {email:req.param('email')}
      ]}
    });
    var myJSON = JSON.stringify(result);
    var myj = JSON.parse(myJSON);
    if(req.param('email')=="")
    {
      ErrorMessage+=" Email Can not Empty <br> ";
    }
    if(req.param('email')!="" )
    {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(req.param('email').match(mailformat))
      {
        ErrorMessage+="";
      }
      else
      {
        ErrorMessage+=" Please Enter Valid Email Address <br> ";
      }
    }
    if(req.param('username')=="")
    {
      ErrorMessage+=" Username Can not Empty <br> ";
    }
    if(req.param('password')=="")
    {
      ErrorMessage+=" Password can not be empty <br>";
    }
    if(req.param('password')!="" && req.param('password').length<6)
    {
      ErrorMessage+=" Password Length should be greater then 6  <br>";
    }
    if(req.param('password')!=req.param('confirm-password'))
    {
      ErrorMessage+=" Both Passwords should be Same  <br>";
    }
    myj.forEach(function(currentValue, index, arr)
    {
      console.log(arr[index]['email']);
      if(myj[index]['email']==req.param('email'))
      {
        ErrorMessage+="Email Already Exits  <br>";
      }
      if(myj[index]['username']==req.param('username'))
      {
        ErrorMessage+="Username Already Exits  <br>";
      }
    });
    if(ErrorMessage=="")
    {
      var params = req.allParams();
      var createdUser = await Users.create(params).fetch();
      var successmsg='<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>'+createdUser.id+' Data Entered </div>';
      res.json(successmsg)
    }
    else
    {
      var myResponse='<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>'+ErrorMessage+'</div>';
      res.json(myResponse);
    }
  }
};
