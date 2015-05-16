$(document).ready(function() {
  var id, first_name;

  signIn();

  $("#sign-in").on('click', function(){
    $(".content").empty();

    sayHi(first_name);
    getFriends(id);
  })

  function signIn() {
    $.ajax({
      type: 'GET',
      url: '/me',
      dataType: "json",

      success: function (data) {
        data = JSON.parse(data)
        content = data.data.user
        first_name = content.first_name
        last_name = content.last_name
        id = content.id
      },
      error: function (request, status, error) {
        console.log(error);
      }
    });
  }

  function sayHi(name) {
    $(".content").append("<h1>Hi " + name + "</h1>")
  }

  function getFriends(id) {
    $.ajax({
      type: 'GET',
      url: '/friends',
      data: {id: id},
      dataType: "json",
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
      $('.content').append("<button class='pick-friends' data-id='" + f.id + "' data-name='" + f.display_name + "'>" + f.display_name + "</button>")
    })
    pickFriends();
  }

  function pickFriends() {
    $('.content').append("<div class='pick-container'></div>")

    $('.pick-friends').on('click', function(){
      picked_id = $(this).attr('data-id')
      picked_friend = $(this).attr('data-name')
      $('.pick-container').empty()
      $('.pick-container').html("<p class='pick'>Ok, let's send some Bro money to " + picked_friend +"</p><p>How much do you want to send?<input id='amount'></input></p><button id='send-money'>Send Bro Money</button>")

      sendMoney();
    })

  }

  function sendMoney() {
    $(".content").append("<div class='sent'></div>")

    $('#send-money').on('click', function(){
      $('.sent').empty();

      // ajax call!!!!

      amount = $('#amount').val();
        
      // check if the amount is a number
      if (isNaN(amount)) {
        $(".sent").append("<p style='color: red'>Gotta send some dollars, not words!</p>")
      } else if (amount == '') {
        $(".sent").append("<p style='color: red'>Gotta send your bro some dollars!</p>")
      } else {
        bro_amount = amount * .77;
        other_amount = amount - bro_amount;

        $(".sent").append("<p>Sending your bro what he deserves... 77 cents on the dollar</p>")
        $(".sent").append("<p>We just sent your bro $" + bro_amount + "</p>")
        $(".sent").append("<p>The rest which is $" + other_amount + " went to XXXX.</p>")
      }
    })
  }
  
});