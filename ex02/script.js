let array = [];

class Form {
  constructor() {
    this.titulo = document.getElementById("titulo");
    this.descricao = document.getElementById("descricao");
    this.preco = document.getElementById("preco");
    this.quantidade = document.getElementById("quantidade");
  }

  salvar() {
    let objeto = {
      titulo: this.titulo.value,
      descricao: this.descricao.value,
      preco: this.preco.value,
      quantidade: this.quantidade.value,
    };

    console.log(objeto);

    array.push(objeto);

    let eVazio = Object.values(objeto).every((x) => x !== null && x !== "");

    if (!eVazio) {
      alert("Preencha todos os campos!");
      return;
    } else {
      localStorage.setItem("array", JSON.stringify(array));
      return;
    }
  }

  verDados() {
    event.preventDefault();
    let dados = localStorage.getItem("array");
    let formProducts = JSON.parse(dados);

    for (let i = 0; i < formProducts.length; i++) {
      console.log(i);

      let tituloItem = document.createElement("h3");
      tituloItem.appendChild(
        document.createTextNode(`${formProducts[i].titulo}`)
      );

      let descricaoItem = document.createElement("p");
      descricaoItem.appendChild(
        document.createTextNode(`Descrição: ${formProducts[i].descricao}`)
      );

      let precoItem = document.createElement("p");
      precoItem.appendChild(
        document.createTextNode(`Preço: R$ ${formProducts[i].preco},00`)
      );

      let quantidadeItem = document.createElement("p");
      quantidadeItem.appendChild(
        document.createTextNode(
          `Quantidade: ${formProducts[i].quantidade} unidades`
        )
      );

      document.getElementById(`c0${i}`).innerHTML = "";
      document.getElementById(`c0${i}`).appendChild(tituloItem);
      document.getElementById(`c0${i}`).appendChild(descricaoItem);
      document.getElementById(`c0${i}`).appendChild(precoItem);
      document.getElementById(`c0${i}`).appendChild(quantidadeItem);
    }
  }
}

let formulario = new Form();
