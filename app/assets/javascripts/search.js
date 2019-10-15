$(document).on('turbolinks:load', function() {
  var search_list = $('.user-search-result');
  var search_list_add = $('.chat-group-users');

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  };

  function appendNotUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user}</p>
                </div>`
    search_list.append(html);
  };

  function appendUserAdd(user_id, user_name) {
    var html = `<div class="chat-group-user clearfix" id=chat-group-user-${user_id}>
                  <input type="hidden" name="group[user_ids][]" value="${user_id}">
                  <p class="chat-group-user__name">
                    ${user_name}
                  </p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${user_id}">
                    削除
                  </a>
                </div>`
    search_list_add.append(html);
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    $.ajax({
      url: '/users',
      type: "GET",
      data: { name: input },
      dataType: 'json',
    })
    .done(function(users) {
      $('.user-search-result').empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else {
        appendNotUser('一致するユーザーが見つかりません');
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $('.user-search-result').on('click', '.user-search-add', function() {
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    var insertHTML = appendUserAdd(user_id, user_name);
    $('.chat-group-users').append(insertHTML);
    $(this).parent('.chat-group-user').remove();
  });

  $('.chat-group-users').on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  });
});