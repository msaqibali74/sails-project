module.exports = {
    index:async function(req,res){
      /*
      var contactsListing = await Contacts.find({
        where: {owner:req.param('userid')},
        select: ['name','number', 'email']
      });
      */
     var contactsListing = await Contacts.find({where: {owner:req.param('userid')}}).populate("owner");
     var contactsListing = await Contacts.find().populate("owner");
     //res.json(contactsListing);
     contactsListing.forEach(function(contact) {
      console.log(contact.owner.username);
     }); 
     //console.log(contactsListing);
     res.view('pages/index',{cons: contactsListing}); 
    }
};

