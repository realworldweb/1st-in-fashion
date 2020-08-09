const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);
let body



exports.handler = function(event, context, callback){
if (event.body) {
    body = JSON.parse(event.body)
	
  } else {
    console.log('something went wrong err1')
  }
	if(body.item){
	
		
	client.transmissions.send({
    options: {

    },
    content: {
      from: 'sales@1stinfashion.co.uk',
      subject: 'order details',
      html:`<html>
			<body>
			<h1>Weve got your order details</h1>
			<p>thanks for your Order of<br>items:<br>${body.item}</p>
			<p>Once we confirm stock we will take payment and send the item(s) we will send another email to confirm payment and est delivery</p>
	<p>sendingaddress:<br>${body.address}</p></body></html>`
    },
	total_accepted_recipients: 3,
    recipients: [
      {address: 'pr.1stinfashion@gmail.com'},
	  {address: body.email}
	
    ]
  })
  .then(data => {
    console.log('Woohoo! You just sent your first mailing!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  })
	}else{
	 console.log('something went wrong err2')
	}
  
}