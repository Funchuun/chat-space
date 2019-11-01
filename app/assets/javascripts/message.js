$(document).on('turbolinks:load', function(){
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
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('no message');
    })
  })

  $(function() {
    var reloadMessages = function() {
      last_message_id = $('.message').last().data('id');
      group_id = $('.left-header__title').data('group_id');
      var url = location.href;
      if (url.match(/\/groups\/\d+\/messages/)) {
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
        var api_url = 'api/messages'
        $.ajax({
          url: api_url,
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          if (messages.length !== 0) {
            messages.forEach(function(message) {
              var insertHTML = buildHTML(message);
              $('.messages').append(insertHTML);
              $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
            });
          }
        })
        .fail(function() {
          alert('自動更新に失敗しました')
        })
      }
    }
    setInterval(reloadMessages, 5000);
  });
});
