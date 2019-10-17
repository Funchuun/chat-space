$(function(){
  function buildHTML(message){
    var image = message.image.url ?  `<img src="${message.image.url}">` : '';
    var html = `<div class="message" data-id="${message.id}">
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
                        ${message.content}
                      </p>
                    </div>
                    ${image}
                  </div>`;
      return html;
  }

  function ScrollMessage() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, '500');
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
      ScrollMessage();
        $('.new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('no message');
    })
  })
a
  $(function() {
    var reloadMessages = function() {
      last_message_id = $('.message').last().data('id');
      var url = 'api/messages'
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(data) {
        data.forEach(function(message) {
          var insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          ScrollMessage();
            $('.new_message')[0].reset();
        });
      })
      .fail(function() {
        alert('自動更新に失敗しました')
      })
    }
    setInterval(reloadMessages, 5000);
  });
});