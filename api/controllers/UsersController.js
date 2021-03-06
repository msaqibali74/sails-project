module.exports = {
  logout:function(req,res)
  {
    console.log("Logout !!");
    req.session.destroy(function (err)
    {
      res.redirect('/users/login');
    });
  },
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
      res.json('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>User Doesnt Exists<br></div>');
    }
    const machinepack=require('machinepack-passwords');
        machinepack.checkPassword({passwordAttempt: req.param('password'),encryptedPassword:  userRecord['password']})
        .exec({
        error: function (err){
          res.json('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>There is Error in checking password<br></div>');
        },
        incorrect: function (){
          res.json('<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>Incorrect password <br></div>');
        },
        success: function (){
          req.session.userId = userRecord['id'];
          req.session.userName = userRecord['username'];
          req.session.Name = userRecord['name'];
          req.session.title = userRecord['title'];
          if (req.param('rememberme') == "on") {
            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 30;
          }
          res.json("Redirect");
        }
      });
  },
  register: function(req,res)
  {
    res.view('users/register',{layout: 'layouts/loginlayout',title:'Register'});
  },
  resetpassword:async function(req,res)
  {
    var ErrorMessage="";
    var result = await Users.find({
      select: [ 'email'],
      where: {or:[
          {email:req.param('email')}
      ]}
    });
    if(result=="")
    {
      ErrorMessage+="Email Not Registered  <a href='users/register'>Make account</a><br>";
    }
    var myJSON = JSON.stringify(result);
    var myj = JSON.parse(myJSON);
    myj.forEach(function(currentValue, index, arr)
    {
      //console.log(arr[index]['email']);
      if(myj[index]['email']==req.param('email'))
      {
        //Email send code here
        ErrorMessage+="Email Already Exits  <br>";
      }
    });
    if(ErrorMessage!="")
    {
      var myResponse='<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>'+ErrorMessage+'</div>';
      res.json(myResponse);
    }
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
