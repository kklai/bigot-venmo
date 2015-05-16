$(document).ready(function() {

  var id, access_token, first_name;

  $.ajax({
    type: 'GET',
    url: '/me',

    dataType: "json",

    // crossDomain: true,
    success: function (data) {
      data = JSON.parse(data)
      content = data.data.user
      first_name = content.first_name
      last_name = content.last_name
      id = content.id

      sayHi(first_name);
      getFriends(id);
    },
    error: function (request, status, error) {
      console.log(error);
    }
  });

  function sayHi(name) {
    $("body").append("Hi " + name)
  }

  function getFriends(id) {
    $.ajax({
      type: 'GET',
      url: '/friends',
      data: {id: id},

      dataType: "json",

      // crossDomain: true,
      success: function (data) {
        data = JSON.parse(data)
        chooseFriend(data.data)
      },
      error: function(error) {
        console.log(error)
      }
    })
  }

  function chooseFriend(friends) {
    _.each(friends, function(f){
      $('body').append("<button class='pick-friends' data-id='" + f.id + "' data-name='" + f.display_name + "'>" + f.display_name + "</button>")
    })
    pickFriends();
  }

  function pickFriends() {
    $('.pick-friends').on('click', function(){
      picked_id = $(this).attr('data-id')
      picked_friend = $(this).attr('data-name')
      console.log(picked_id, picked_friend)
    })
  }




  


  // friends_url = "https://api.venmo.com/v1/users/" + id + "/friends?access_token=4e4sw1111111111t8an8dektggtcbb45"
  // $.ajax({
  //   type: 'GET',
  //   url: friends_url,

  //   dataType: "json",
  //   success: function (data) {
  //     console.log(data)
  //   },
  //   error: function (request, status, error) {
  //     console.log(error);
  //   }
  // })

  
});