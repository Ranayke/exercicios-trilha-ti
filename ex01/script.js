let res = document.getElementById("res");

class Form {
  constructor() {
    this.nome = document.getElementById("nome");
    this.sobrenome = document.getElementById("sobrenome");
    this.idade = document.getElementById("idade");
    this.email = document.getElementById("email");
    this.curso = document.getElementById("curso");
    this.nascimento = document.getElementById("nascimento");
    this.estado = document.getElementById("estado");
    this.cidade = document.getElementById("cidade");
    this.bairro = document.getElementById("bairro");
    this.cor = document.getElementById("cor");
  }

  salvar() {
    const objeto = {
      nome: this.nome.value,
      sobrenome: this.sobrenome.value,
      idade: this.idade.value,
      email: this.email.value,
      curso: this.curso.value,
      nascimento: this.nascimento.value,
      estado: this.estado.value,
      cidade: this.cidade.value,
      bairro: this.bairro.value,
      cor: this.cor.value,
    };

    let eVazio = Object.values(objeto).every((x) => x !== null && x !== "");

    if (!eVazio) {
      alert("Preencha todos os campos!");
      return;
    } else {
      localStorage.setItem("objeto", JSON.stringify(objeto));
      return;
    }
  }

  verDados() {
    let dados = localStorage.getItem("objeto");
    let formObj = JSON.parse(dados);
    console.log(formObj);

    res.innerHTML = "";

    let nomeCompleto = document.createElement("p");
    nomeCompleto.appendChild(
      document.createTextNode(
        `Nome completo: ${formObj.nome} ${formObj.sobrenome}`
      )
    );
    res.appendChild(nomeCompleto);

    let idade = document.createElement("p");
    idade.appendChild(document.createTextNode(`Idade: ${formObj.idade}`));
    res.appendChild(idade);

    let email = document.createElement("p");
    email.appendChild(document.createTextNode(`E-mail: ${formObj.email}`));
    res.appendChild(email);

    let curso = document.createElement("p");
    curso.appendChild(document.createTextNode(`Curso: ${formObj.curso}`));
    res.appendChild(curso);

    let nascimento = document.createElement("p");
    nascimento.appendChild(
      document.createTextNode(`Data de nascimento: ${formObj.nascimento}`)
    );
    res.appendChild(nascimento);

    let estado = document.createElement("p");
    estado.appendChild(document.createTextNode(`Estado: ${formObj.estado}`));
    res.appendChild(estado);

    let cidade = document.createElement("p");
    cidade.appendChild(document.createTextNode(`Cidade: ${formObj.cidade}`));
    res.appendChild(cidade);

    let bairro = document.createElement("p");
    bairro.appendChild(document.createTextNode(`Bairro: ${formObj.bairro}`));
    res.appendChild(bairro);

    document.getElementById("modalTitle").style.color = formObj.cor;
  }
}

let formulario = new Form();
