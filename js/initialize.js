var geocoder = new google.maps.Geocoder();

$(".shareCard").hide();

let initiatorLink;
let guestLink;



getCoordsFromNav();
document.addEventListener('submit', function(e){
    e.preventDefault();

    let address = $('#location').val();
    let email = $('#email').val();
    let guestCount = $('#num-guest').val();

    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') { var lat; var long;
          console.log(results)
            long = results[0].geometry.bounds.b.b;
            lat = results[0].geometry.bounds.f.b;

            let data = {
              email: email,
              location: {
                lat: lat,
                long: long

              },
              guests: guestCount
            }

            console.log(data)
            fetch('https://cors-anywhere.herokuapp.com/https://letshavelunchserver.herokuapp.com/api/session_start', {
              method: 'post',
              headers: {
                     'Accept': 'application/json',
                     'Content-Type': 'application/json'
                   },
              body: JSON.stringify(data)
            }).then(res => res.json())
            .then(data => {
              console.log(data);
              initiatorLink = "./Voting2.html?initiator=true&session="+data;
              guestLink = "./Voting2.html?initiator=false&session="+data;

              console.log(guestLink);
              console.log(initiatorLink);

              $(".startForm").slideUp();
              $(".shareCard").slideDown();
              var a2a_config = a2a_config || {};
              $(".a2a_kit").attr("data-a2a-url", guestLink);
              $(".a2a_kit").attr("data-a2a-title", "Let's do lunch together!");
              $("#voteBtn").attr("href", initiatorLink);

            });

        }
    });


});


function getCoordsFromNav() {
  let  err = (err) => console.log(err);

  navigator.geolocation.getCurrentPosition(function(position) {
   console.log(position);
   let lat = position.coords.latitude;
   let lon = position.coords.longitude
   $('#latitude').attr('value', lat);
   $('#longitude').attr('value', lon);
  } ,err,{timeout:60000});
}
