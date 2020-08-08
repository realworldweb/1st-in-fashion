const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);
let body



exports.handler = function(event, context, callback){
if (event.body) {
    body = JSON.parse(event.body)
	console.log(body)
  } else {
    console.log('something went wrong err1')
  }
	if(body.item){
	
		
	client.transmissions.send({
    options: {

    },
    content: {
      from: 'sales@1stinfashion.co.uk',
      subject: 'sales request',
      html:'<html><body><p>Order for<br>items:<img src="'+body.img+'"><br>'+''+body.item+''+'</p><p>sendingaddress:<br>'+''+body.address+''+'</p></body></html>'
    },
    recipients: [
      {address: 'coolkidsformal@hotmail.co.uk'}
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