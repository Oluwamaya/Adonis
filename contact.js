//This first CODE IS JUST FOR YOU TO DISPLAY AND ADD MAP TO YOUR WEBSITE BUT IT WONT WORK IF YOU DONT ADD THE LAST FUNCTION IN THIS PAGE..THEY BOTH WORK HAND IN HAND 
// function initMap() {
//     // Define the latitude and longitude of the Eiffel Tower
//     const eiffelTowerLatLng = { lat: 7.366031, lng:  3.874151 };
  
//     // Create a map centered on the Eiffel Tower
//     const map = new google.maps.Map(document.getElementById('map'), {
        
//       center: eiffelTowerLatLng, // Set the center of the map to the Eiffel Tower
//       zoom: 12, // Set an initial zoom level (adjust as needed)
//     });
//     // console.log(map)
  
//     // Add a marker at the Eiffel Tower
//     const marker = new google.maps.Marker({
//       position: eiffelTowerLatLng,
//       map: map,
//       title: 'LIBERTY STADIUM', // Optional title for the marker
//     });
//   }


//THIS SECOND SECTION LET USER GET THEIR CURRENT LOCATION ONCLICK OF MY LOCATION AND ALSO HAS A INITIAL LOCATION BEEN SET DOWN AND ALSO WORK HAND IN HAND WITH THE LAST FUNCTION IN THIS PAGE.

  
//   let map; // Define the map variable globally for access outside the function
// const initialLatLng = { lat: 7.366031, lng:  3.874151 }; // Replace with your initial coordinates

// function initMap() {
//   const mapOptions = {
//     zoom: 15,
//     center: initialLatLng, // Center the map on your initial coordinates
//     // mapTypeId: google.maps.MapTypeId.ROADMAP
//   };

//   // Create a map object
//   map = new google.maps.Map(document.getElementById('map'), mapOptions);

//   // Add a marker at the initial coordinates (optional)
//   const initialMarker = new google.maps.Marker({
//     map: map,
//     position: initialLatLng,
//     title: 'Liberty Stadium'
//   });



//   document.getElementById('map-down').addEventListener('click', function() {
//     // Map down to the initial coordinates
//     map.setCenter(initialLatLng);
//   });
  // Add click event listeners to the buttons
  document.getElementById('locate-me').addEventListener('click', function() {
    getCurrentLocationAndCenterMap();
  });


function getCurrentLocationAndCenterMap() {
  // Check if geolocation is available in the user's browser
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const userLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Center the map on the user's location
      map.setCenter(userLatLng);

      // Optionally, you can add a marker for the user's location
      const userMarker = new google.maps.Marker({
        map: map,
        position: userLatLng,
        title: 'My Location'
      });
    },
 function() {
      // Handle errors here (e.g., user denied location access)
      alert('Error: Unable to access your location.');
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}
 

//THIS LAST HOLD ALL THE FUNCTION OF THE FIRST AND SECOND SECTION ABOVE , THIS SECTION ALLOW USER TO ROUTE AND IT DIRECT THEM TO THE INITIAL LOCATION FROM THEIR CURRENT LOCATION
let map;
const initialLatLng =  { lat: 7.366031, lng:  3.874151 };
let directionsService;
let directionsRenderer;

function initMap() {
  const mapOptions = {
    zoom: 15,
    center: initialLatLng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
      // Add a marker at the initial coordinates (optional)
   const initialMarker = new google.maps.Marker({
     map: map,
     position: initialLatLng,
     title: 'Liberty Stadium'
});
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map
  });

  // ... (code for "Find My Location" and "Map Down" buttons as before)

  // Add a click event listener to the "Get Directions" button
  document.getElementById('get-directions').addEventListener('click', function() {
    calculateAndDisplayDirections();
  });
}
  // Add click event listeners to the buttons
  document.getElementById('locate-me').addEventListener('click', function() {
    getCurrentLocationAndCenterMap();
  });
  
function calculateAndDisplayDirections() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const userLatLng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      // Create a DirectionsRequest object
      const request = {
        origin: userLatLng,
        destination: initialLatLng,
        travelMode: google.maps.TravelMode.DRIVING, // You can change the travel mode as needed
      };

      // Use the Directions Service to calculate directions
      directionsService.route(request, function(result, status) {
        if (status === 'OK') {
          directionsRenderer.setDirections(result);
        } else {
          alert('Directions request failed due to ' + status);
        }
      });
    }, function() {
      alert('Error: Unable to access your location.');
    });
  } else {
    alert('Geolocation is not supported by your browser.');
  }
}



 // Ensure the API script has loaded before calling initMap
 function loadMapScript() {
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD505gDZan2Fw-dcmHHIDXAibP7mVJ9QTo&libraries=places&callback=initMap';
    script.async = true;
    document.head.appendChild(script);
  }
  loadMapScript();  
