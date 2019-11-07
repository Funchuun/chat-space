$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var content = message.content ?  `${ message.content}` : "";
    var image = message.image.url ?  `<img src="${message.image.url}">` : '';
    var html = `<div class="message" data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${content}
                      </p>
                        ${image}
                    </div>
                  </div>`;
    $('.messages').append(html);
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('no message');
    })
    return false;
  })


  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'GET',
        dataType: 'json',
        data: {last_id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function() {
        console.log('error');
      });
    }
  }
  setInterval(reloadMessages, 5000);
});
