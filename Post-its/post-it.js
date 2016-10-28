var Board = function( selector, name ) {
  // Aqui denerá ir el código que tenga que ver con tu tablero 
  
  // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // De esta manera no dependerás tanto de tu HTML.  
  this.name = name;
  this.color = random_color();
  this.li_html = '<li><a href="#b_' + num_board + '">'+ this.name +'</a></li>';
  this.board_html = '<div class="board" id="b_' + num_board + '"></div>';
  this.postits = [];
  var $elem = $("#b_" + num_board);
  
  function initialize() {
    // Que debe de pasar cuando se crea un nuevo tablero?
    $elem.on('dblclick', function(event){
      $elem.postits.push(create_postit(event.pageX, event.pageY));
    });
   
  };

  initialize();
};

var PostIt = function() {
  // Aquí va el código relacionado con un post-it
  this.postit_html = '<div id="p_'+ num_postit +'" class="post-it draggable ui-draggable"><div class="header"><div class="close">X</div></div><div class="content" contenteditable="true">...</div></div>';
};

$(function() {
  // Esta es la función que correrá cuando este listo el DOM 
  num_postit = 0;
  num_board = 0;

  $("#new_board").on("click",function(e) {
     var board_name = prompt("Please enter board's name", "New board");
     create_board(board_name);
  });

  $(".board").on("dblclick", '.post-it', function(e) {
    e.stopPropagation();
  });

  $(".board").on("mousedown", '.close', function(e) {
    e.stopPropagation();
    $(this).parent().parent().remove();
  });

  $('.board').on("mousedown", '.post-it', function() {
    $(this).parent().append(this);
  });  

});

function do_draggable(){
  $('.draggable').draggable( {
    containment: '.board_section',
    cursor: 'move',
    cancel: "div.content"
  } );
}

function create_postit(x,y){
  num_postit ++;
  postit = new PostIt();
  $('.board').append(postit.postit_html);
  set_position(x,y);
  do_draggable();
  return postit;
}

function create_board(name){
  num_board ++
  board = new Board('.board', name);
  $('#boards').append(board.li_html);
  $('.board_section').append(board.board_html);
  $('#b_' + num_board).css('background-color', board.color);
  $('#b_' + num_board).css('zindex', board.color);
}

function set_position(x,y){
  $("#p_" + num_postit).css("left", x - 160 + 'px');
  $("#p_" + num_postit).css("top", y - 5 + 'px');
}

function random_color(){  
 return '#'+Math.floor(Math.random()*16777215).toString(16);
}