const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);
let body



exports.handler = function(event, context, callback){
if (event.body) {
    body = JSON.parse(event.body)
  } else {
    console.log('something went wrong err1')
  }
	if(body.items){
	
		
	client.transmissions.send({
    options: {

    },
    content: {
      from: 'sales@1stinfashion.co.uk',
      subject: 'sales request',
      html:'<html><body><p>Order for<br>items:<br>'+''+body.items+''+'</p><p>sendingaddress:<br>'+''+body.address+''+'</p></body></html>'
    },
    recipients: [
      {address: 'coolkidsformal@gmail.com'}
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