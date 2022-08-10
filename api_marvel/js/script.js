// fetch(
//   "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=73f3344d28b3680c88804a9a5a356a02&hash=f5fba45031efceeee968e9168bdbf811"
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// http://gateway.marvel.com/v1/public/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150

// Your public key
// 73f3344d28b3680c88804a9a5a356a02
// Your private key
// 31456dea05ca564a34369d236a1f9059ac2cd89a
//e9fcbd74bd379f7b8ee97446b7b005aa

//f5fba45031efceeee968e9168bdbf811

// fetch(
//   "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=73f3344d28b3680c88804a9a5a356a02&hash=f5fba45031efceeee968e9168bdbf811"
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data));

// const APIKEY = "14d8a14b31c283549128e029eb25dbba"; // Public Key
// const HASH = "21c27c3418a2fddfff1fd7d4f5df4c46"; // md5(ts+privateKey+publicKey) -> https://www.md5hashgenerator.com
// const TS = "1";

// const URL = "https://gateway.marvel.com/v1/public/";

// async function sendRequest(path) {
//   const to = URL + path + "?ts=" + TS + "&apikey=" + APIKEY + "&hash=" + HASH;
//   console.log(to);
//   const response = await fetch(to);
// }

// sendRequest("comics");

// // MINIFICADA
// const APIKEY = "14d8a14b31c283549128e029eb25dbba"; // Public Key
// const HASH = "21c27c3418a2fddfff1fd7d4f5df4c46"; // md5(ts+privateKey+publicKey) -> https://www.md5hashgenerator.com
// const TS = "1";
// const URL = "https://gateway.marvel.com/v1/public/";

// async function sendRequest(path) {
//   const response = await fetch(
//     URL +
//       path +
//       "?ts=" +
//       TS +
//       "&apikey=" +
//       APIKEY +
//       "&hash=" +
//       HASH
//   );
//   console.log(response);
// }

// sendRequest("stories");

// OFFLINE

const APIKEY = "14d8a14b31c283549128e029eb25dbba"; // Public Key
const HASH = "21c27c3418a2fddfff1fd7d4f5df4c46"; // md5(ts+privateKey+publicKey) -> https://www.md5hashgenerator.com
const TS = "1";
const URL = "https://gateway.marvel.com/v1/public/";
//const URL = "data/";
async function sendRequest(path) {
  // 1. Hacer Peticion
  const response = await fetch(
    URL + path + "?ts=" + TS + "&apikey=" + APIKEY + "&hash=" + HASH
  );
  // Validar la respuesta
  if (!response.ok) throw Error(response.statusText);
  // Extraer la información
  const json = await response.json();
  return json.data.results;
}

// async function sendRequestLocal(path) {
//   // 1. Hacer Peticion
//   const response = await fetch(URL + path + ".json");
//   // Validar la respuesta
//   if (!response.ok) throw Error(response.statusText);
//   // Extraer la información
//   const json = await response.json();
//   console.log(json);
//   return json.data.results;
// }

function itemClick() {
  alert("Producto añadido");
}

// Crear la funcion main para consumir el recurso...
async function main() {
  const comics = await sendRequest("comics");
  //const comics = await sendRequestLocal("comics");
  console.log(comics);
  //PROCESAR INFORMACION

  const container = document.getElementById("card_container");

  comics.forEach((comic) => {
    const template = document.querySelector("#card_template");

    const clone = template.cloneNode(true);
    clone.removeAttribute("style"); // removiendo el diplay:none

    // VALIDACION DE COMICS SIN IMAGEN
    if (comic.thumbnail.path.includes("image_not_available")) {
      return;
    }
    // CARGAR IMAGEN
    clone
      .querySelector(".comic_img")
      .setAttribute(
        "src",
        `${comic.thumbnail.path}.${comic.thumbnail.extension}`
      );
    // SETEAR TITULO
    clone.querySelector(".comic_name").textContent = comic.title;

    // Calcular precio
    let original_price =
      comic.prices[0].price == 0 ? 2.99 : comic.prices[0].price; // TERNARIO
    // SETEAR PRECIO ORIGINAL
    clone.querySelector(".comic_ori_price").textContent = original_price;

    // SETEAR PRECIO TOTAL
    clone.querySelector(".comic_price").textContent = (
      original_price - 2.0
    ).toFixed(2); // 1.0

    // Acción al botón
    // Acción al botón
    clone.querySelector(".comic_button").addEventListener("click", () => {
      localStorage.setItem("product_id", comic.id);
      //window.location.href = "product.html";
      window.open("/product.html", "_blank");
    });

    container.appendChild(clone);
  });
}

main();
