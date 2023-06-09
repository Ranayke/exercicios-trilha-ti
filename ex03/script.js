const array = [];
let indexMotoristaBuscado = "";
let indexCarroBuscado = "";
let motoristasSalvos = "";
let carrosSalvos = "";

class Form {
  constructor() {
    this.nome;
    this.idade;
    this.peso;
    this.email;

    this.marca;
    this.modelo;
    this.pesoCarro;
    this.vaga;
  }

  salvarMotorista() {
    this.nome = document.getElementById("name").value;
    this.idade = document.getElementById("age").value;
    this.peso = document.getElementById("weight").value;
    this.email = document.getElementById("email").value;

    const obj = {
      nome: this.nome,
      idade: this.idade,
      peso: this.peso,
      email: this.email,
    };

    let eVazio = !Object.values(obj).every((x) => x !== undefined && x !== "");

    if (eVazio) {
      alert("Preencha todos os campos!");
      return;
    } else {
      let dadosSalvos = localStorage.getItem("motorista");

      if (dadosSalvos === null || dadosSalvos === undefined) {
        array.push(obj);
        localStorage.setItem("motorista", JSON.stringify(array));
        alert("Motorista salvo!");
      } else {
        let novaPosicao = JSON.parse(dadosSalvos);
        const motoristaAlreadyExists = novaPosicao.some(
          (data) => data.nome === obj.nome
        );
        if (motoristaAlreadyExists) {
          alert("Motorista já existe no banco de dados!");
          return;
        }
        novaPosicao.push(obj);
        localStorage.setItem("motorista", JSON.stringify(novaPosicao));
        alert("Motorista salvo!");
      }
    }
  }

  gerarMotoristas() {
    let times = 0;
    while (times < 9) {
      var stringAleatoria = "";
      var caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++) {
        stringAleatoria += caracteres.charAt(
          Math.floor(Math.random() * caracteres.length)
        );
      }
      var numeroAleatorio = "";
      var numeros = "0123456789";
      for (var i = 0; i < 2; i++) {
        numeroAleatorio += numeros.charAt(
          Math.floor(Math.random() * numeros.length)
        );
      }
      const objeto = {
        nome: stringAleatoria,
        idade: numeroAleatorio,
        peso: numeroAleatorio,
        email: `${stringAleatoria}@email.com`,
      };
      array.push(objeto);
      localStorage.setItem("motorista", JSON.stringify(array));
      times++;
    }
    alert("Foram gerados 9 motoristas aleatórios");
  }

  buscarMotorista() {
    const buscar = document.getElementById("name").value;
    motoristasSalvos = JSON.parse(localStorage.getItem("motorista"));

    indexMotoristaBuscado = motoristasSalvos
      .map((data) => data.nome)
      .indexOf(buscar);

    if (indexMotoristaBuscado == -1) {
      alert("Motorista não existe no banco de dados!");
      return;
    }

    alert("Motorista encontrado!");
    document.getElementById("name").value =
      motoristasSalvos[indexMotoristaBuscado].nome;
    document.getElementById("age").value =
      motoristasSalvos[indexMotoristaBuscado].idade;
    document.getElementById("weight").value =
      motoristasSalvos[indexMotoristaBuscado].peso;
    document.getElementById("email").value =
      motoristasSalvos[indexMotoristaBuscado].email;
  }

  atualizarMotorista() {
    const obj = {
      nome: document.getElementById("name").value,
      idade: document.getElementById("age").value,
      peso: document.getElementById("weight").value,
      email: document.getElementById("email").value,
    };

    const nameAlreadyExists = JSON.parse(localStorage.motorista).some(
      (data) => data.nome === obj.nome
    );

    if (nameAlreadyExists) {
      alert("Motorista já existe no banco de dados!");
      return;
    }
    motoristasSalvos[indexMotoristaBuscado] = obj;
    localStorage.setItem("motorista", JSON.stringify(motoristasSalvos));
    alert("Cadastro do motorista atualizado!");
  }

  salvarCarro() {
    this.marca = document.getElementById("brand").value;
    this.modelo = document.getElementById("model").value;
    this.pesoCarro = document.getElementById("carWeight").value;
    this.vaga = document.getElementById("parking").value;

    const obj = {
      marca: this.marca,
      modelo: this.modelo,
      pesoCarro: this.pesoCarro,
      vaga: this.vaga,
    };

    let eVazio = !Object.values(obj).every((x) => x !== undefined && x !== "");

    if (eVazio) {
      alert("Preencha todos os campos!");
      return;
    } else {
      let dadosSalvos = localStorage.getItem("carro");

      if (dadosSalvos === null || dadosSalvos === undefined) {
        array.push(obj);
        localStorage.setItem("carro", JSON.stringify(array));
      } else {
        let novaPosicao = JSON.parse(dadosSalvos);
        const carAlreadyExists = novaPosicao.some(
          (data) => data.marca === obj.marca
        );
        if (carAlreadyExists) {
          alert("Carro já existe no banco de dados!");
          return;
        }
        novaPosicao.push(obj);
        localStorage.setItem("carro", JSON.stringify(novaPosicao));
      }
    }
  }

  gerarCarros() {
    let times = 0;
    while (times < 9) {
      var stringAleatoria = "";
      var caracteres =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 7; i++) {
        stringAleatoria += caracteres.charAt(
          Math.floor(Math.random() * caracteres.length)
        );
      }
      var numeroAleatorio = "";
      var numeros = "0123456789";
      for (var i = 0; i < 3; i++) {
        numeroAleatorio += numeros.charAt(
          Math.floor(Math.random() * numeros.length)
        );
      }
      const objeto = {
        marca: stringAleatoria,
        modelo: stringAleatoria,
        pesoCarro: numeroAleatorio,
        vaga: numeroAleatorio,
      };
      array.push(objeto);
      localStorage.setItem("carro", JSON.stringify(array));
      times++;
    }
  }

  buscarCarro() {
    const buscar = document.getElementById("parking").value;
    carrosSalvos = JSON.parse(localStorage.getItem("carro"));

    indexCarroBuscado = carrosSalvos.map((data) => data.vaga).indexOf(buscar);

    if (indexCarroBuscado == -1) {
      alert("Vaga vazia!!");
      return;
    }

    alert("Carro encontrado!");
    document.getElementById("brand").value =
      carrosSalvos[indexCarroBuscado].marca;
    document.getElementById("model").value =
      carrosSalvos[indexCarroBuscado].modelo;
    document.getElementById("carWeight").value =
      carrosSalvos[indexCarroBuscado].pesoCarro;
    document.getElementById("parking").value =
      carrosSalvos[indexCarroBuscado].vaga;
  }

  atualizarCarro() {
    const obj = {
      marca: document.getElementById("brand").value,
      modelo: document.getElementById("model").value,
      pesoCarro: document.getElementById("carWeight").value,
      vaga: document.getElementById("parking").value,
    };

    const vagaAlreadyExists = JSON.parse(localStorage.carro).some(
      (data) => data.vaga === obj.vaga
    );

    if (vagaAlreadyExists) {
      alert("Já existe um carro nessa vaga!");
      return;
    }
    carrosSalvos[indexCarroBuscado] = obj;
    localStorage.setItem("carro", JSON.stringify(carrosSalvos));
    alert("Vaga do carro atualizada com sucesso!");
  }
}

const formulario = new Form();
