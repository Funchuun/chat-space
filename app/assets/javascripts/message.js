$(function(){
  function buildHTML(message){
    var insertImage = message.image.url ?  `<img src="${message.image.url}">` : '';
    var html = `<div class="message" data-id="${message.id}>
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                    ${insertImage}
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
});