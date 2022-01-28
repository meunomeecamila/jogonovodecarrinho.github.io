var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distanceX = 0;
var distanceY = 0;
var database;

var form, player, game;
var c1, c2, /*c3, c4,*/ cars;

var c1_img, c2_img /*c3_img, c4_img*/;
var track_img;
var ground_img;

function preload(){
  track_img = loadImage("../images/track.jpg");
  ground_img = loadImage("../images/track.png");
  c1_img = loadImage("../images/car1.png");
  c2_img = loadImage("../images/car2.png");
  //c3_img = loadImage("../images/car3.png");
  //c4_img = loadImage("../images/car4.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}

