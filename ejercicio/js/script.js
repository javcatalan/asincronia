// CREAT UNA PROMESA
const doTask = (iterations) =>
  new Promise((resolve, reject) => {
    const numbers = [];
    for (let i = 0; i < iterations; i++) {
      const number = 1 + Math.round(Math.random() * 6);
      numbers.push(number);
      if (number === 6) {
        reject({
          error: true,
          message: "Salio un 6",
          value: numbers,
        });
      }
    }
    resolve({
      error: false,
      message: "todo ok",
      value: numbers,
    });
  });

doTask(5).then((result) => console.log(result));

// SIMULANDO UN CASO REAL

async function getData() {
  // TRAER INFORMACION DEL SERVIDOR
  fetch("data/users.json")
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        //true or false
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.warn(error));
}

// MAIN

const data = await getData();
console.log(data);
