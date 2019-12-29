module.exports = {
    'new':async function(req,res)
    {
       res.view('contacts/new',{layout: 'layouts/layout'});
    },
    listing:async function(req,res){
      res.view('pages/listing');
    },
    clisting:async function(req,res){
     var contactsListing = await Contacts.find({where: {owner:req.param('userid')}}).populate("owner");
     var allres=[];
     contactsListing.forEach(function(contact){
      var result="";
      result+="<tr role='row'>";
        result+="<td>"+contact.name+"</td>";
        result+="<td>"+contact.number+"</td>";
        result+="<td>"+contact.email+"</td>";
        result+="<td>"+contact.owner.name+"</td>";
        result+="<td><button class='btn ra-100 btn-info'>Edit </button><button class='btn ra-100 btn-danger'>Delete</button></td>";
      result+="</tr>";
      allres.push(result);
     });
     if(allres=="")
     {
       res.json("<tr><td colspan='5'>No Data Found</td></tr>");
     }
     res.json(allres);
    },
    beforeCreate: function (values, cb) {
      
    },
    create:async function(req,res)
    { 
      uploadedfile=[];
      console.log("Hey there");
      var params = req.allParams();
      req.file('avatar').upload(async function (err, uploadedFiles){
        if (err){
          return res.serverError(err);
        }
        if(uploadedFiles.length === 0){
          return res.badRequest('No file was uploaded');
        }
        else{
          uploadedfile.push(uploadedFiles[0].fd);
          filename=uploadedfile.toString();
          var createdContact = await Contacts.create({
              name:req.param('name'),
              number:req.param('number'),
              email: req.param('email'),
              owner: req.param('owner'),
              image:filename
          })
          .fetch();
          res.redirect('../contacts/new');
        }
      });
    }
};