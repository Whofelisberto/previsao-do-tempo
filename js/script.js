const input = document.querySelector("input");
const botao = document.querySelector("button");
const img = document.querySelector("img");
const cidade = document.querySelector("#cidade");
const grau = document.querySelector("#grau");
const conteudo = document.querySelector(".content");

botao.addEventListener("click", () => {
  if(!input.value) return;
  getWeatherData(); 
});

async function getWeatherData() {
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&appid=a8cc3e20ab42161b0ebeff582448f875`
      try{
        await fetch (urlApi)
        .then((res)=> res.json())
        .then((data)=>{
          if(data?.cod && data.cod ==="404"){
                   return alert("cidade não encontrada")
          }
           loadWeatherInfo(data);
        })
      } catch (error) {
          alert(error);
      }
}


function loadWeatherInfo(data) {
  cidade.innerHTML = `${data.name}, ${data.sys.country}`;
  grau.innerHTML = `Temperatura: ${Math.floor(data.main.temp)} ° C`;
  img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  conteudo.style.display = "flex";
}