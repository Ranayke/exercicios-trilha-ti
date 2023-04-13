let array = [];

alertMessage = () => {
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
  };

  appendAlert("Produto adicionado com sucesso!", "success");
};

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

    let eVazio = !Object.values(objeto).every(
      (x) => x !== undefined && x !== ""
    );

    if (eVazio) {
      alert("Preencha todos os campos!");
      return;
    } else {
      let dadosSalvos = localStorage.getItem("array");

      if (dadosSalvos === null || dadosSalvos === undefined) {
        array.push(objeto);
        alertMessage();
        localStorage.setItem("array", JSON.stringify(array));
      } else {
        let novaPosicao = JSON.parse(dadosSalvos);

        const nameAlreadyExists = novaPosicao.some(
          (data) => data.titulo === objeto.titulo
        );

        if (nameAlreadyExists) {
          alert("Produto já existe no banco de dados!");
          return;
        }
        novaPosicao.push(objeto);
        alertMessage();
        localStorage.setItem("array", JSON.stringify(novaPosicao));
      }
      return;
    }
  }

  verDados() {
    event.preventDefault();
    let dados = localStorage.getItem("array");
    let formProducts = JSON.parse(dados);
    document.getElementById("divProdutos").innerHTML = "";
    if (localStorage.array) {
      document.getElementById("divAlert").innerHTML = "";
    }

    for (let i = 0; i < formProducts.length; i++) {
      let divItem = document.createElement("div");
      divItem.setAttribute("class", "div card text-bg-light mb-3");
      divItem.setAttribute("id", `c0${i}`);

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

      document.getElementById("divProdutos").appendChild(divItem);
      document.getElementById(`c0${i}`).appendChild(tituloItem);
      document.getElementById(`c0${i}`).appendChild(descricaoItem);
      document.getElementById(`c0${i}`).appendChild(precoItem);
      document.getElementById(`c0${i}`).appendChild(quantidadeItem);
    }
  }
}

let formulario = new Form();
