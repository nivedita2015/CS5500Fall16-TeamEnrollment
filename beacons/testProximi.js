// Template for Beacon APIs

var PROXIMIIO_TOKEN = 'OUR_APPLICATION_TOKEN';


// To authenticate the Proximi.io Proximity Platform, we need to set the TOKEN Id which is avaialble on the Proximi web portal
proximiio.setToken(PROXIMIIO_TOKEN);


// ReadyCallback is triggered when Proximio.io SDK is fully initialized
  proximiio.setProximiioReadyCallback(function(visitorId) {
    document.getElementById("visitor_id").innerHTML = visitorId;
  });

// TriggerCallback is triggered when someone enters or exits a defined geofence.
  proximiio.setGeofenceTriggerCallback(function(enter, geofence) {
  document.getElementById("address").innerHTML = geofence.address                                
    document.getElementById("lat").innerHTML = geofence.area.lat                                
    document.getElementById("long").innerHTML = geofence.area.lng                                
    document.getElementById("createdAt").innerHTML = geofence.createdAt                              
    document.getElementById("department_id").innerHTML = geofence.department_id                          
    document.getElementById("id").innerHTML = geofence.id                                     
    document.getElementById("name").innerHTML = geofence.name                                   
    document.getElementById("organization_id").innerHTML = geofence.organization_id                        
    document.getElementById("place_id").innerHTML = geofence.place_id                               
    document.getElementById("radius").innerHTML = geofence.radius                                 
    document.getElementById("updatedAt").innerHTML = geofence.updatedAt                              
});

// positionChangeCallback is triggered when Proximi.io SDK detects a major change in the users position.
proximiio.setPositionChangeCallback(function(coords) {
    // Your code here, for example:
    document.getElementById("position-latitude").innerHTML = coords.coordinates.lat;
    document.getElementById("position-longitude").innerHTML = coords.coordinates.lon;
    document.getElementById("position-accuracy").innerHTML = coords.accuracy;
});

//floorChangedCallback is triggered when Proximi.io SDK detects a floor change.
proximiio.setFloorChangedCallback(function(floor) {
    // Your code here, for example:
    document.getElementById("floor-anchors").innerHTML = JSON.stringify(floor.anchors, null, 4)
    document.getElementById("floor-createdAt").innerHTML = floor.createdAt;
    document.getElementById("floor-id").innerHTML = floor.id;
    document.getElementById("floor-name").innerHTML = floor.name;
    document.getElementById("floor-organization_id").innerHTML = floor.organization_id;
    document.getElementById("floor-.place_id").innerHTML = floor.place_id;
    document.getElementById("floor-updatedAt").innerHTML = floor.updatedAt;
});

// beaconFoundCallback is triggered when Proximio.io SDK detects a beacon
proximiio.setBeaconFoundCallback(function(beacon) {
    document.getElementById("beacon-uuid").innerHTML = beacon.uuid;
    document.getElementById("beacon-major").innerHTML = beacon.major;
    document.getElementById("beacon-minor").innerHTML = beacon.minor;
  });

// beaconLostCallback is triggered when Proximio.io SDK looses beacon from sight
  proximiio.setBeaconLostCallback(function(beacon) {
    document.getElementById("beacon-uuid").innerHTML = beacon.uuid;
    document.getElementById("beacon-major").innerHTML = beacon.major;
    document.getElementById("beacon-minor").innerHTML = beacon.minor;
  });

// floorChangedCallback is triggered when Proximio.io SDK detects a floor change
    proximiio.setFloorChangedCallback(function(floor) {
    document.getElementById("floor").innerHTML = floor;
  });

// sets Proximi.io SDK to handle output Push messages automatically
   proximiio.handlePush(true);