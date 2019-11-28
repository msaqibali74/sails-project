module.exports = {
    
    index:async function(req,res){
      var contactsListing = await Contacts.find({
        where: {owner:req.param('userid')},
        select: ['name','number', 'email']
      });
      //console.log(contactsListing);
      /*
      var array=[];
      var headerup="<thead> <tr><th>Name</th> <th>Number</th><th>E-mail</th></tr></thead><tbody>";
      var headerdown="</tbody>";
      contactsListing.forEach(element => { 
        var output="<tr><td>"+element['name']+"</td><td>"+element['number']+"</td><td>"+element['email']+"<script type='text/javascript'>(function(){try{var s,a,i,j,r,c,l,b=document.getElementsByTagName('script');l=b[b.length-1].previousSibling;a=l.getAttribute('data-cfemail');if(a){s='';r=parseInt(a.substr(0,2),16);for(j=2;a.length-j;j+=2){c=parseInt(a.substr(j,2),16)^r;s+=String.fromCharCode(c);}s=document.createTextNode(s);l.parentNode.replaceChild(s,l);}}catch(e){}})();</script></td></tr>";
        array.push(output);
      });
      */
     res.view('pages/index',{cons: contactsListing});
      /*
      var x=array.toString();
      var sstring=x;
      res.json(sstring);*/
    }
};

