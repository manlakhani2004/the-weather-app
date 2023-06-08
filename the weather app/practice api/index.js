console.log("hello world");
// const APIkey = '8e7d3850cf218959a2dcd2c9f4219db4';
// let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`);
// // https://api.openweathermap.org/data/2.5/weather?q=goa&appid=8e7d3850cf218959a2dcd2c9f4219db4
// ${data?.main?.temp_max.toFixed(2)} °C


// 1 API call ****************

// const APIkey = '8e7d3850cf218959a2dcd2c9f4219db4';
// async function weatherAPI()
// {
    
//     try
//     {
//     let city = "goa";
//     const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`);
 
//     const data = await response.json();
      
//     console.log(data);

//     renderweather(data);
//     }

//     catch(e)
//     {
//        console.log("error has come >", e);
//     } 
// }


//  function renderweather(data)
// {
//    let newpera = document.createElement('p');
//    newpera.textContent = `${data?.main?.temp.toFixed(2)} °C`;
//    document.body.appendChild(newpera);
// }


// 2 switching your weather and current weather*************
// 3 how to loading impliment*******************

// 4 get your current location

function getlocation()
{
   if(navigator.geolocation)
   {
      navigator.geolocation.getCurrentPosition(showposition);
   }
   else{
      console.log('cannot find your location !');
   }
}

function showposition(position)
{
  let lat = position.coords.latitude;
  let longi = position.coords.longitude;

  console.log(lat);
  console.log(longi);
}

