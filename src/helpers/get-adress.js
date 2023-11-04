export async function getAddress(ipAddress){
  const response = await fetch(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=b2e9685c93dc4c58bc460bac70bd6eff&ip_address=${ipAddress}`
     // `https://maps.googleapis.com/maps/api/geocode/json?address=${ipInput.value}&key=AIzaSyAGvyMUZBhP9fq4phV9zE0Wj0k7x3LE2oY`
    );
    // AIzaSyAGvyMUZBhP9fq4phV9zE0Wj0k7x3LE2oY   === API kay
     return await response.json();
}
