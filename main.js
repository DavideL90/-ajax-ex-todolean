$(document).ready(function(){
   //check if the list is empty and print it
   loadList();
   //on click take the value and add to the list
   $('#toDoButton').click(function(){
      var inputToDo = $('#toDoText').val();
      if(inputToDo != ''){
         $('#toDoText').val('');
         addListElement(inputToDo);
      }
      else{
         alert('Inserisci qualcosa nella casella di testo');
      }
   });
   //on click on element list show the dropdown menu
   $(document).on('click', '.list-item', function(){
      $(this).children('.dropDown').show();
   });
   //on mouseleave makes the dropdown menu disappear
   $(document).on('mouseleave', '.list-item', function(){
      $(this).children('.dropDown').hide();
   });
   //if click on elimina delete the element from the list
   $(document).on('click', '.delete', function(){
      var idOfElement = $(this).parents('.list-item').attr('id');
      removeElement(idOfElement);
   });
   // if click on modifica change the element of the list
   $(document).on('click', '.change', function(){
      var idOfElement = $(this).parents('.list-item').attr('id');
      console.log(idOfElement);
      changeElement(idOfElement);
   });
});

function loadList(){
   $.ajax({
      url: 'http://138.68.64.12:3003/todo/',
      method: 'GET',
      success: function(data){
         if(data.length != 0){
            for (var i = 0; i < data.length; i++) {
               $('#toDoList').append('<li class="list-item" id="' + data[i].id + '">' +
                                     '<span class="text-list">' + data[i].text + '</span>' +
                                     '<div class="dropDown">' +
                                     '<div class="delete"> Elimina </div>' +
                                     '<div class="change"> Modifica </div>' +
                                     '<div class="rectangle">' +
                                     '<div class="arrow-left"></div>' +
                                     '</div>' +
                                     '</div>' +
                                     '</li>')
            }
         }
      },
      error: function(){
         alert('Error!');
      }
   });
}

function addListElement(inputElement){
   $.ajax({
      url: 'http://138.68.64.12:3003/todo/',
      method: 'POST',
      data: {
         text: inputElement
      },
      success: function(data){
         $('#toDoList').append('<li class="list-item" id="' + data.id + '">' +
                               '<span class="text-list">' + data.text + '</span>' +
                               '<div class="dropDown">' +
                               '<div class="delete"> Elimina </div>' +
                               '<div class="change"> Modifica </div>' +
                               '<div class="rectangle">' +
                               '<div class="arrow-left"></div>' +
                               '</div>' +
                               '</div>' +
                               '</li>');
      },
      error: function(){
         alert('Error!');
      }
   });
}

function removeElement(idToRemove){
   $.ajax({
      url: 'http://138.68.64.12:3003/todo/' + idToRemove,
      method: 'DELETE',
      success: function(data){
         console.log(data);
         $('#' + idToRemove).remove();
      },
      error: function(){
         alert('Error!');
      }
   });
}

function changeElement(idToChange){
   var newText = prompt('Modifica l\'elemento');
   $.ajax({
      url: 'http://138.68.64.12:3003/todo/' + idToChange,
      method: 'PUT',
      data: {
         text: newText
      },
      success: function(data){
         $('#' + idToChange).children('.text-list').text(newText);
      },
      error: function(){
         alert('Error!');
      }
   });
}
