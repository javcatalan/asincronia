// function displayOnConsole(message = "Hello") {
//   console.log(`Message : '${message}' was sent after 5 seconds`);
// }
// function stopProcess(_id) {
//   console.log("El proceso", _id, " se ha detenido");
//   clearInterval(_id);
// }

// // setTimeout(displayOnConsole,5000);

// console.log("Tarea síncrona"); // automaticamente

// let intervalID = setInterval(displayOnConsole, 1000); /// Después de 1 segundo
// // let intervalID = setInterval(displayOnConsole,1000*60*5); // Después 5MIN

// console.log("IntervalId:", intervalID);

// setTimeout(() => stopProcess(intervalID), 5000);

// setTimeout(displayOnConsole,5000);

// PETICIONES CON FETCH

fetch("data/robots.txt")
  .then((response) => {
    //console.log("Informacion recuperada correctamente");
    console.log(response);
    return response.text(); // return Promise
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

fetch("data/robots.txt")
  .then((response) => response.text()) // return Promise
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
  .finally(() => console.log("Promise ended"));

let saludo = "No data";

fetch("data/robots.txt")
  .then((response) => response.text()) // return Promise
  .then((data) => {
    console.log("inside promise:", data);
    saludo = data;
  })
  .catch((error) => console.log(error))
  .finally(() => console.log("Promise ended"));

setTimeout(() => {
  console.log("outside promise", saludo);
}, 3000);
