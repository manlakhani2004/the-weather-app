const yourweathertab = document.querySelector("[data-your-weather]");
const searchtab  = document.querySelector("[data-search-weather]");
const searchform = document.querySelector("[data-search-form]");
const grantlocation = document.querySelector(".grantLocation-container");
const weathercontainer = document.querySelector(".weather-container");
const userweatherinfo = document.querySelector(".weatherinfo-container");
const loadinggif = document.querySelector("[loading-gif]");


const API_KEY = 'd1845658f92b31c64bd94f06f7188c9c';
let currentTab = yourweathertab;
currentTab.classList.add("currenttab");
getFromSesionStorage();

yourweathertab.addEventListener("click", ()=>
{
    switchtab(yourweathertab);
});

searchtab.addEventListener("click" , ()=>
{
    switchtab(searchtab);
});

function switchtab(clicktab)
{
    if(currentTab != clicktab)
    {
       currentTab.classList.remove("currenttab");
       currentTab = clicktab;
       currentTab.classList.add("currenttab");

       if(!searchform.classList.contains("active"))
       {
        //me phale yourweather par tha ab me search weather par aagaya when first click on search weather

        //  etle searchform invisible hase to tene visible karav 

        //  searchform wala container is invisible if yes then make it visible
         userweatherinfo.classList.remove("active");
         grantlocation.classList.remove("active");
         searchform.classList.add("active");
       }
       else
       {
        //me phela searchweather par hato have yourweather par avyo to yourweather visible kar and searchform invisible kar
        searchform.classList.remove("active");
        weathercontainer.classList.remove("active");

        //ab me your weather tab ma aavi gayo to yourweather pn display karvu padse , so let's check local storage first for coordinates if we have saved them thare
         getFromSesionStorage();
       }

    }
}


function getFromSesionStorage()
{
    const locatcordinates = sessionSection.getItem("usercordinates");

    if(!locatcordinates)
    {
        grantlocation.classList.add("active");
    }
    else
    {
        let cordinates = JSON.parse(locatcordinates);
        fetchuserinfo(cordinates);
    }
}

 async function fetchuserinfo(cordinates)
{
    const  {lat , lon} = cordinates;
    //remove grant acess
    grantlocation.classList.remove("active");
    //addloading 
    loadinggif.classList.add("active");

    try{
       let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
       let data = await response.json();
       loadinggif.classList.remove("active");
       userweatherinfo.classList.add("active");
       renderuserinfo(data);
    }
   catch(err)
   {
    loadinggif.classList.remove("active");

   }
    
}


function renderuserinfo(weatherinfo)
{
    const cityname = document.querySelector("[cityname]");
    const contryflag = document.querySelector("[contry-flag]");
    const weatherdesc = document.querySelector("[weather-desc]");
    const weatherimg = document.querySelector("[weather-img]");
    const datatemp = document.querySelector("[data-temp]");

    const winddata = document.querySelector("[wind-data]");
    const humidata = document.querySelector("[humi-data]");
    const clouddata = document.querySelector("[clouds-data]");
    
    console.log("weather info");
    cityname.innerText = weatherinfo?.name;
    contryflag.src = `https://flagcdn.com/144x108/${weatherinfo?.sys?.country.toLowerCase()}.png`; 
    weatherdesc.innerText = weatherinfo?.weather?.[0]?.description;
    weatherimg.src = `http://openweathermap.org/img/w/${weatherinfo?.weather?.[0]?.icon}.png`;
    datatemp.innerText  = weatherinfo?.main?.temp;

    winddata.innerText = weatherinfo?.wind?.speed;
    humidata.innerText = weatherinfo?.main?.humidity;
    clouddata.innerText = weatherinfo?.clouds?.all;
}


const grantaccess_btn = document.querySelector("[grant-access-btn]");

grantaccess_btn.addEventListener("click", getlocation);

function getlocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showposition);
    }
    else
    {
        alert('no geolocation support available')
    }
}
 
function showposition(position)
{
    const usercordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionSection.setItem("usercordinates",JSON.stringify(usercordinates)); 
    fetchuserinfo(usercordinates);
}

const searchinput = document.querySelector("[data-search-input]");

searchform.addEventListener("submit", (e)=>
{
  e.preventDefault();
  let cityname = searchinput.value;

   if(cityname === "")
   {
    return;
   }
   else
   {
       fetchsearchweather(cityname);
   }
});


 async function fetchsearchweather(city)
{
    loadinggif.classList.add("active");
    userweatherinfo.classList.remove("active");
    grantlocation.classList.remove("active");
    
        try
        {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await response.JSON();
            loadinggif.classList.remove("active");
            userInfoContainer.add("active");
            renderuserinfo(data);
        }
        catch(err)
        {

        }

}