$(document).ready(function() {

  suma = 0;
  count = 0;
  $('#cardPile').html('');
  $('#cardSlots').html('');
  pile = (createPile(10));
  displayPile(pile);
  init();
  
});

var Card = function(num){
  this.num = num;
  this.struc = '<div class="draggable">' + this.num + '</div>';
};

var Pile = function(){
  this.cards = [];
};

function createPile(num){
  pile = new Pile();
  for (var i = 0; i < num; i++) {
    card = new Card(i);
    pile.cards.push(card);
  } 
  return pile;
}

function displayPile(pile){
  pile.cards.forEach(function(card){
    $('#cardPile').append(card.struc);
  });
}

function init(){
  $('.draggable').draggable({
    containment: '#content',
    stack: '#cardPile div',
    cursor: 'move',
    helper: "clone"
  });

  $('#cardSlots').droppable( {
    accept: '#cardPile div',
    hoverClass: 'hovered',
    drop: handleCardDrop
  }); 
}

function handleCardDrop( event, ui ) {
  count ++;
  if (count <= 10){
    var cardNumber = parseInt($(ui.helper[0]).html());
    card = new Card(cardNumber)
    suma += card.num;
    $('#cardSlots').append(card.struc);
    $('#total_sum').html(suma);  
  }
}