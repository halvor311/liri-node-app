require("dotenv").config();
const keys = require("./keys.js");
// var spotify = new spotify(keys.spotify);
// var Twitter = new Twitter(keys.twitter);
// var Spotify = require("node-spotify-api");
var fs = require("fs");

var userInput = process.argv[2];
// var Input = process.argv[3];
fs.readFile("random.txt", "utf8", function (error, data){ 
if (error){
  return console.log("readfile: " + error)
}
else if (userInput === "my-tweets"){
  console.log(Tweets());
}

// else if (userInput === "spotify-this-song"){
  // console.log(spotifySearch());
// }
// else if (userInput === "movies-this"){
  // console.log(movieSearch());
// }
});
function Tweets(){
  var twitter = require("twitter");
  var Twitter = new Twitter(keys.twitter);
var params = {screen_name: 'havlvor311', 
  count: 21
};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (let i = 0; i < tweets.length; i++){
      console.log(tweets[i].text);
    
  }
}
});
}