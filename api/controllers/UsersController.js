module.exports = {

  login: function(req, res)
  {
    
    res.view('users/login',{layout: 'layouts/loginlayout',title: 'Login'});
    var olddate=new Date();
    var newdate=new Date(olddate.getTime()+60000);
    req.session.cookie.expires=newdate;
    req.session.authenticated=true;
    //console.log(req.session);
  },
  
  loginprocess:async function(req,res)
  {
    Users.find(
      {where: {email:req.param('email')},
      select: ['email','password']
  }, function foundUser(err, user) {
      if (err)
      {
         console.log(err)
      }
      if (user=="")
      {
        console.log("User not Found");
      }
      else if(user!="")
      {
        var oldpwd=req.param('password')
        const machinepack=require('machinepack-passwords');
        machinepack.checkPassword({passwordAttempt: oldpwd,encryptedPassword:  user[0]['password']})
        .exec({
        error: function (err){
          console.log("There is Error");
          console.log(err);
        },
        incorrect: function (){
          console.log("Incorrect password")
        },
        success: function (){
          req.session.me = user[0]['id'];
         //res.locals.me = _.clone(req.session.me);
          console.log("loggin with Id of "+req.session.me);
        }
      });
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
