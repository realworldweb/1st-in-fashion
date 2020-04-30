const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);

// If you have a SparkPost EU account you will need to pass a different `origin` via the options parameter:
// const euClient = new SparkPost('<YOUR API KEY>', { origin: 'https://api.eu.sparkpost.com:443' });

exports.handler = function(event, context, callback){client.transmissions.send({
    options: {

    },
    content: {
      from: 'example@realworldwebportfolio.co.uk',
      subject: 'Hello, World!',
      html:'<html><body><p>Testing SparkPost - the world\'s most awesomest email service!</p></body></html>'
    },
    recipients: [
      {address: 'paulrooney60@gmail.com'}
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
  
}