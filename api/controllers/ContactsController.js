module.exports = {
    index:async function(req,res){
      var contactsListing = await Contacts.find({
        where: {owner:req.param('userid')},
        select: ['name','number', 'email']
      });
     res.view('pages/index',{cons: contactsListing}); 
    }
};

