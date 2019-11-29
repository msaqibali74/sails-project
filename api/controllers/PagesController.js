/**
 * PagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create:async function(req,res)
  {
    res.view('pages/create');
  },
  createprocess:async function(req,res)
  { 
    var params = req.allParams();
    var ErrorMessage="";
    var result = await Pages.find({
      select: ['name'],
      where: {or:[
          {name:req.param('name')}
      ]}
    });
    var myJSON = JSON.stringify(result);
    var myj = JSON.parse(myJSON);

    
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
  },
};

