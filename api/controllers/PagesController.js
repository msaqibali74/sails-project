
module.exports = {
  create:async function(req,res)
  {
    res.view('pages/create');
  },
  createprocess:async function(req,res)
  { 

    /**iMage upload code**/
    /*var fs = require('fs');
    console.log(req.files);

fs.readFile(req.files.upload.path, function (err, data) {
  var newPath = 'assets/files/' + req.files.upload.content;
    fs.writeFile(newPath, data, function (err) {
    if (err) res.view({err: err});
      html = "";
      html += "<script type='text/javascript'>";
      html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
      html += "    var url     = \"/files/" + req.files.upload.content + "\";";
      html += "    var message = \"Uploaded file successfully\";";
      html += "";
      html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
      html += "</script>";

      res.send(html);
  });

});*/
    /**iMage upload code**/

    var params = req.allParams();
    var ErrorMessage="";
    if(req.param('name')=="")
    {
      ErrorMessage+="Name of page can't be Empty";
    }
    var result = await Pages.find({
      select: ['name'],
      where: {or:[
          {name:req.param('name')}
      ]}
    });
    var myJSON = JSON.stringify(result);
    var myj = JSON.parse(myJSON);
    if(req.param('owner')=="")
    {
      ErrorMessage+="Error in saving page no associated owner found Maybe you are not authorized to create page try to login and create page again<br>";
    }
    myj.forEach(function(currentValue, index, arr)
    {
      console.log(arr[index]['email']);
      if(myj[index]['name']==req.param('name'))
      {
        ErrorMessage+="Same Name of page Already Exits please choose different Name <br>";
      }
    });
    if(ErrorMessage=="")
    {
      var CreatedPage = await Pages.create(params).fetch();
      var successmsg='<div class="alert alert-success" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>Page created with ID '+CreatedPage.id+' </div>';
      res.json(successmsg)
    }
    else
    {
      var myResponse='<div class="alert alert-danger" role="alert"><button type="button" class="close" data-dismiss="alert">&times;</button>'+ErrorMessage+'</div>';
      res.json(myResponse);
    }
  },
};

