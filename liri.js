require("dotenv").config();
const keys = require("./keys.js");
// var spotify = new spotify(keys.spotify);
// var Twitter = new Twitter(keys.twitter);
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");
var inquirer = require("inquirer");
//this is for the user's input for the movies and songs
var command = process.argv[2];
var input = process.argv[3];
var songTitle = "";
var movieTitle = "";
//setting up switch cases for each command
switch (command){
  case "my-tweets":
  twitter();
  break;
  case "spotify-this-song":
  Spotify();
  break;
  case "movie-this":
  movie();
  break;
  case "do-what-it-says":
  asYouWish();
  break;
  default:
    console.log("No command entered");
    break;
}

//inquirer part
inquirer
.prompt([
  {type: "list",
  message: "What information do you want?",
  choices: ["Spotify", "Twitter", "imdb", "random text"],
  name: ["social media"]
  }]).then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
      console.log("\nWelcome " + inquirerResponse.username);
      console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
    }
    else {
      console.log("That's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
    };
  });
//for the random portion
var fs = require("fs");

var userInput = process.argv[2];
var Input = process.argv[3];
//meant to allow for the different choices
fs.readFile("random.txt", "utf8", function (error, data){ 
if (error){
  return console.log("readfile: " + error)
}
else if (userInput === "my-tweets"){
  console.log(Tweets());
}

else if (userInput === "spotify-this-song"){
  console.log(Spotify());
}
else if (userInput === "movies-this"){
  console.log(movieSearch());
}
});
function Tweets(){
  var client = new Twitter(keys.twitter);
var params = {screen_name: 'halvor311', 
  // count: 21
};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (let i = 0; i < tweets.length; i++){
      console.log(tweets[i].text);
    
  }
}
});
}
function Spotify(){
  var client = new Spotify(keys.spotify);
  var spotify = require("node-spotify-api");
  var nodeInput = process.argv;

  for (var i = 0; i < nodeInput.length; i++){
    if (i > 3 && i <nodeInput.length) {
      songTitle = songTitle + " " + nodeInput[i]
    }
    else {
      songTitle += nodeInput[i]
    }
    console.log(nodeInput);
  }
  client.search({
    type: "track",
    query: nodeInput
  },
  function (error, data){
    if (error) {
      return console.log("Oops, Error: " + error);
    } else if (error, data){
      console.log(data);
      console.log("Song Name is: ", nodeInput);
      console.log("Song Name is: ", nodeInput);
    }
  });
}
function movie(){
var request = require("request");
var nodeArgs = process.argv;
for (var i = 2; i < nodesArgs.length; i++)
if (i > 2 && i < nodeArgs.length){
  movieName = movieName + "+" + nodeArgs.length[i];
}
else {
  movieName += nodeArgs[i];
}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl);
request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Release Year: " + JSON.parse(body).Year + "Movie Title: " + JSON.parse(body).t + "IMDB Rating: " + JSON.parse(body).imdbRating + "plot " + JSON.parse(body).plot);
  }
});
}
