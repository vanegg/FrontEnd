var Board = function( selector ) {
  // Aqui denerá ir el código que tenga que ver con tu tablero 
  
  // Utiliza esta sintaxis para referirte al selector que representa al tablero.
  // De esta manera no dependerás tanto de tu HTML.  
  var $elem = $( selector );
  
  function initialize() {
    // Que debe de pasar cuando se crea un nuevo tablero?
    $elem.on('dblclick', function(event){
      postit = create_postit(event.pageX, event.pageY);
    });
   
  };

  initialize();
};

var PostIt = function() {
  // Aquí va el código relacionado con un post-it
  this.postit_html = '<div id="p_'+ num_postit +'" class="post-it draggable ui-draggable"><div class="header"><div class="close">X</div></div><div class="content" contenteditable="true">...</div></div>';
};

$(function() {
  // Esta es la fucnión que correrá cuando este listo el DOM 
  num_postit = 0;
  new Board('#board');

  $("#board").on("dblclick", '.post-it', function(e) {
    e.stopPropagation();
  });

  $("#board").on("mousedown", '.close', function(e) {
    e.stopPropagation();
    $(this).parent().parent().remove();
  });

  $('#board').on("mousedown", '.post-it', function() {
    $(this).parent().append(this);
  });

});

function do_draggable(){
  $('.draggable').draggable( {
    containment: '#board',
    cursor: 'move',
    cancel: "div.content"
  } );
}

function create_postit(x,y){
  num_postit ++;
  postit = new PostIt();
  $('#board').append(postit.postit_html);
  set_position(x,y);
  do_draggable();
  return postit;
}

function set_position(x,y){
  $("#p_" + num_postit).css("left", x + 'px');
  $("#p_" + num_postit).css("top", y + 'px');
}