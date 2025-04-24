
// // // Show the login modal
// // function showLogin() {
// //   document.getElementById("loginModal").style.display = "block";
// // }

// // // Show the signup modal
// // function showSignup() {
// //   document.getElementById("signupModal").style.display = "block";
// // }

// // // Show the contact modal
// // function showContact() {
// //   document.getElementById('contactModal').style.display = 'block';
// // }

// // // Close the modal (for any modal)
// // function closeModal(modalId) {
// //   document.getElementById(modalId).style.display = "none";
// // }

// // // Close the modal when clicking outside of the modal content
// // function handleOutsideClick(event, modalClass) {
// //   const modal = document.querySelector(`.${modalClass}`);
// //   if (!modal) return; // Exit if the modal does not exist
// //   const modalContent = modal.querySelector(".modal-content");
// //   if (!modalContent.contains(event.target)) {
// //     closeModal(modalClass); // Close the modal
// //   }
// // }

// // function handleOutsideClick(event, modalId) {
// //   const modalContent = document.querySelector(`#${modalId} .modal-content`);
// //   if (!modalContent.contains(event.target)) {
// //       closeModal(modalId);
// //       window.location.href = "app.html"; // Redirect to homepage
// //   }
// // }

// //predicting
// function getBathValue() {
//   var uiBathrooms = document.getElementsByName("uiBathrooms");
//   for(var i in uiBathrooms) {
//     if(uiBathrooms[i].checked) {
//         return parseInt(i)+1;
//     }
//   }
//   return -1; // Invalid Value
// }

// function getBHKValue() {
//   var uiBHK = document.getElementsByName("uiBHK");
//   for(var i in uiBHK) {
//     if(uiBHK[i].checked) {
//         return parseInt(i)+1;
//     }
//   }
//   return -1; // Invalid Value
// }

// function onClickedEstimatePrice() {
//   console.log("Estimate price button clicked");
//   var sqft = document.getElementById("uiSqft");
//   var bhk = getBHKValue();
//   var bathrooms = getBathValue();
//   var location = document.getElementById("uiLocations");
//   var estPrice = document.getElementById("uiEstimatedPrice");

//   var url = "http://127.0.0.1:5000/predict_home_price"; //Use this if you are NOT using nginx which is first 7 tutorials
//   //var url = "/api/predict_home_price"; // Use this if  you are using nginx. i.e tutorial 8 and onwards

//   $.post(url, {
//       total_sqft: parseFloat(sqft.value),
//       bhk: bhk,
//       bath: bathrooms,
//       location: location.value
//   },function(data, status) {
//       console.log(data.estimated_price);
//       estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
//       console.log(status);
//   });
// }

// function onPageLoad() {
//   console.log( "document loaded" );
//   var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx which is first 7 tutorials
//  // var url = "/api/get_location_names"; // Use this if  you are using nginx. i.e tutorial 8 and onwards
//   $.get(url,function(data, status) {
//       console.log("got response for get_location_names request");
//       if(data) {
//           var locations = data.locations;
//           var uiLocations = document.getElementById("uiLocations");
//           $('#uiLocations').empty();
//           for(var i in locations) {
//               var opt = new Option(locations[i]);
//               $('#uiLocations').append(opt);
//           }
//       }
//   });
// }

// function redirectToCalculator() {
//   window.location.href = "calculator.html";  // This will redirect to the calculator page.
// }



// window.onload =onPageLoad;


// Predicting
function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for(var i in uiBathrooms) {
    if(uiBathrooms[i].checked) {
        return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for(var i in uiBHK) {
    if(uiBHK[i].checked) {
        return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  // Prevent default behavior
  // event.preventDefault();

  console.log("Estimate price button clicked");

  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_home_price"; // Use this if you are NOT using nginx

  $.post(url, {
      total_sqft: parseFloat(sqft.value),
      bhk: bhk,
      bath: bathrooms,
      location: location.value
  }, function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log("document loaded");

  var url = "http://127.0.0.1:5000/get_location_names"; // Use this if you are NOT using nginx

  $.get(url, function(data, status) {
      console.log("got response for get_location_names request");
      if(data) {
          var locations = data.locations;
          var uiLocations = document.getElementById("uiLocations");
          $('#uiLocations').empty();
          for(var i in locations) {
              var opt = new Option(locations[i]);
              $('#uiLocations').append(opt);
          }
      }
  });
}

function redirectToCalculator() {
  window.location.href = "calculator.html";  // This will redirect to the calculator page.
}

window.onload = onPageLoad;
