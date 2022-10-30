const levi = document.getElementById("levi");

const pageX = -60;
const pageY = -60;

document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;
  levi.style.left = x + "px";
  levi.style.top = y + "px";
});

const contenedor = document.querySelector('#contenedor')
// const modal = new bootstrap.Modal('#modal', {})

window.onload = () => {
  getPersonajes();
};

async function getPersonajes() {
  const url = "https://attackontitanapi.herokuapp.com/api/characters";
  try {
    const respuesta = await fetch(url)
    const resultado = await respuesta.json()
    console.log(resultado)
    
  } catch (error) {
    console.log(error)
  }
}
