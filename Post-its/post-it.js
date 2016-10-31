var Board = function( name ) {
  // Aqui denerá ir el código que tenga que ver con tu tablero 
  
  // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // De esta manera no dependerás tanto de tu HTML.  
  this.name = name;
  this.color = random_color();
  this.postits = [];
  this.li_html = '<li><a class="link_board" id= "b_' + num_board + '" href="#b_' + num_board + '">'+ this.name +'</a></li>';
  this.board_html = '<div class="board" id="b_' + num_board + '"></div>';
  $elem = $("#b_" + num_board + '.board');
};

var PostIt = function() {
  // Aquí va el código relacionado con un post-it
  this.postit_html = '<div id="p_'+ num_postit +'" class="post-it draggable ui-draggable"><div class="header"><div class="close">X</div></div><div class="content" contenteditable="true">...</div></div>';
};

$(function() {
  // Esta es la función que correrá cuando este listo el DOM 
  num_postit = 0;
  num_board = 0;
  boards = [];

  $("#new_board").on("click",function(e) {
     var board_name = prompt("Please enter board's name", "New board");
     boards.push(create_board(board_name));
  });

  $(".board_section").on("dblclick", '.post-it', function(e) {
    e.stopPropagation();
  });

  $(".board").on("mousedown", '.close', function(e) {
    e.stopPropagation();
    $(this).parent().parent().remove();
  });

  $('.board').on("mousedown", '.post-it', function() {
    $(this).parent().append(this);
  });

  $('#boards').on("click", 'a.link_board' ,function(event) {
    event.preventDefault();
    id = $($(this)[0]).attr('id');
    $board = $('#' + id + '.board');
    console.log(id);
    $('.board_section').append($board);
  });

  $('.board_section').on('dblclick', function(event){
      event.stopPropagation();
      console.log($(this).find('div:last-child').attr('id'));
      postit = create_postit(event.pageX, event.pageY,num_board);
      index = $elem.selector.substring(3,4);
      boards[parseInt(index)-1].postits.push(postit);
    });

});

function do_draggable(){
  $('.draggable').draggable( {
    containment: '.board_section',
    cursor: 'move',
    cancel: "div.content"
  } );
}

function create_postit(x,y,b_index){
  num_postit ++;
  postit = new PostIt();
  // console.log('#b_' + (b_index) +'.board');
  $('#b_' + b_index +'.board').append(postit.postit_html);
  set_position(x,y);
  do_draggable();
  return postit;
}

function create_board(name){
  num_board ++
  board = new Board(name);
  $('#boards').append(board.li_html);
  $('.board_section').append(board.board_html);
  $('#b_' + num_board + '.board').css('background-color', board.color);
  return board;
}

function set_position(x,y){
  $("#p_" + num_postit).css("left", x - 160 + 'px');
  $("#p_" + num_postit).css("top", y - 5 + 'px');
}

function random_color(){  
 return '#'+Math.floor(Math.random()*16777215).toString(16);
}