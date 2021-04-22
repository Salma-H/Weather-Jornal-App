/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=1c720336cf0cd53386168015e7c145b5&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;

    getWeather(zipCode)
    .then( (data) => {
        postData('/addFeeling', {temp: data.main.temp, date: newDate, userInput: feeling
        });
    })
    .then( updateUI )
}


const getWeather = async (zip)=>{
    // const res = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=94040&appid=1c720336cf0cd53386168015e7c145b5')

  const res = await fetch(baseURL+zip+key)
  try {

    const data = await res.json();
    // console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}


const postData = async ( url = '', data = {})=>{
    // console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        // console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
}


const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const data = await request.json();
    //   console.log(data);
      document.getElementById('date').innerHTML = "Date: " + data.date;
      document.getElementById('temp').innerHTML = "Temperature: " + data.temp + " C";
      document.getElementById('content').innerHTML = "Your feelings and thoughts for the day: " + data.input;
    }catch(error){
      console.log("error", error);
    }
  }
