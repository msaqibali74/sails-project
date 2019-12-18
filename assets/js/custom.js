function login()
{
var token =  $('input[name="_csrf"]').attr('value');
var datas =  $('#loginform').serialize();
  $.ajax({
    type: 'post',
    url: '/users/loginprocess',
    data: datas,
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Csrf-Token', token);
    },
    success: function(response){
     // $("#ermsg").html(response);
     //alert(response);
     if(response=="Redirect")
      {
        $(location).attr('href', '/pages/create');
      }
      else
      {
        $("#ermsg").html(response);
      }
    }
  });
  return false;
}
function submitvalues()
{
var token =  $('input[name="_csrf"]').attr('value');
var data =  $('#registerform').serialize();
  $.ajax({
    type: 'post',
    url: '/users/create',
    data: data,
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Csrf-Token', token);
    },
    success: function(response){
      $("#ermsg").html(response);
      
    },
    error: function(response)
    {
      $("#ermsg").html(response);
    }
  });
  return false;
}
function savepage()
{ 
  var token =  $('input[name="_csrf"]').attr('value');
  var data =  $('#pageform').serialize();
  $.ajax({
    type: 'post',
    url: '/pages/createprocess',
    data: data,
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Csrf-Token', token);
    },
    success: function(response){
      $("#ermsg").html(response);
      
    },
    error: function(response)
    {
      $("#ermsg").html(response);
    }
  });
  return false;
}
function reset_password()
{
  var token =  $('input[name="_csrf"]').attr('value');
  var data =  $('#pwdresetfrm').serialize();
  $.ajax({
    type: 'post',
    url: '/users/resetpassword',
    data: data,
    beforeSend: function(xhr) {
        xhr.setRequestHeader('Csrf-Token', token);
    },
    success: function(response){
      $("#ermsg").html(response);
    },
    error: function(response)
    {
      $("#ermsg").html(response);
    }
  });
  return false;
}