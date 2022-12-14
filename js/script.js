const levi = document.getElementById("levi");

const pageX = -60;
const pageY = -60;

document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;
  levi.style.left = x + "px";
  levi.style.top = y + "px";
});

const contenedor = document.querySelector("#contenedor");
const modal = new bootstrap.Modal("#modal", {});

window.onload = () => {
  getPersonajes();
};

async function getPersonajes() {
  const url = "https://attackontitanapi.herokuapp.com/api/characters";
  try {
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    mostrarPersonajes(resultado);
  } catch (error) {
    console.log(error);
  }
}

function mostrarPersonajes(resultado) {
  resultado.forEach((personaje) => {
    const { name, id, gender, picture_url } = personaje;

    const personajeContenedor = document.createElement("div");
    personajeContenedor.classList.add("col-md-4");

    const personajeCarta = document.createElement("div");
    personajeCarta.classList.add("card", "mb-3");

    const personajeImagen = document.createElement("img");
    personajeImagen.classList.add("card-img-top");
    personajeImagen.src = picture_url;

    const personajeCardBody = document.createElement("div");
    personajeCardBody.classList.add("card-body");

    const personajeHeading = document.createElement("div");
    personajeHeading.classList.add("card-title", "text-center", "mb-2");
    personajeHeading.textContent = name;

    const personajeGender = document.createElement("div");
    personajeGender.classList.add("card-text", "text-center", "font-italic");
    personajeGender.textContent = gender;

    const personajeButton = document.createElement("button");
    personajeButton.classList.add("btn", "btn-danger", "w-100");
    personajeButton.textContent = "Ver personaje";
    personajeButton.onclick = function () {
      verPersonaje(id);
    };

    personajeCardBody.appendChild(personajeHeading);
    personajeCardBody.appendChild(personajeGender);
    personajeCardBody.appendChild(personajeButton);

    personajeCarta.appendChild(personajeImagen);
    personajeCarta.appendChild(personajeCardBody);

    personajeContenedor.appendChild(personajeCarta);

    contenedor.appendChild(personajeContenedor);
  });
}

async function verPersonaje(id) {
  console.log(id);
  const url = `https://attackontitanapi.herokuapp.com/api/characters/${id}`;
  try {
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();
    mostrarPersonaje(resultado);
  } catch (error) {
    console.log(error);
  }
}

function mostrarPersonaje(resultado) {
  const { name, gender, id, picture_url } = resultado;
 console.log(resultado)
  const modalTitle = document.querySelector(".modal .modal-title");
  const modalBody = document.querySelector(".modal .modal-body");
  modalTitle.textContent = name;

  modalBody.innerHTML = `
<img src=${picture_url} alt="image" class="img-fluid" />
<p class="text-center text-primary">Genero: ${gender}</p>
<p class="text-center text-primary">id:${id}</p>
`;
  modal.show();
}
