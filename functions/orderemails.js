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
      html:`<html><head><style>img{ position: relative; display: block; margin: 0 auto 0 auto; } .confirmed__items{ position: relative;
		width: 60%;
		display: block;
		margin: 0 auto 0 auto;
		border: 2px solid $mainBlue;
		font-size: 1.5rem;
	th:first-child{
    width: 80%;
     }		 
		th{
			
			background-color: $mainBlue;
			color: #fff;
			width: 20%;
		}
		tr{
		 text-align: center;
		 border: 2px solid $mainBlue;
		 }
		td{
		border: 2px solid $mainBlue;
			}}</style>
			</head>
			<body>
			<p>Order for<br>items:<img class="img" src="'+body.img+'"><br>'+''+body.item+''+'</p>
			<p>sendingaddress:<br>'+''+body.address+''+'</p></body></html>`
    },
    recipients: [
      {address: 'pr.1stinfashion@gmail.com'}
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