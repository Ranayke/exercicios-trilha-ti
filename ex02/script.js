let array = [];
let indexSearch = "";
let buscarTitulo = "";

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

  deleteOneProduct(indexThatArray) {
    let arrayToDeleteProduct = JSON.parse(localStorage.array);
    arrayToDeleteProduct.splice(indexThatArray, 1);
    localStorage.setItem("array", JSON.stringify(arrayToDeleteProduct));
    this.verDados();
  }

  buscar() {
    buscarTitulo = JSON.parse(localStorage.array);
    indexSearch = buscarTitulo
      .map((produto) => produto.titulo)
      .indexOf(this.titulo.value);

    this.titulo.value = buscarTitulo[indexSearch].titulo;
    this.descricao.value = buscarTitulo[indexSearch].descricao;
    this.preco.value = buscarTitulo[indexSearch].preco;
    this.quantidade.value = buscarTitulo[indexSearch].quantidade;
  }

  atualizar() {
    let newObjeto = {
      titulo: this.titulo.value,
      descricao: this.descricao.value,
      preco: this.preco.value,
      quantidade: this.quantidade.value,
    };
    buscarTitulo[indexSearch] = newObjeto;
    localStorage.setItem("array", JSON.stringify(buscarTitulo));
  }

  verDados() {
    let dados = localStorage.getItem("array");
    let formProducts = JSON.parse(dados);
    document.getElementById("divProdutos").innerHTML = "";
    if (localStorage.array && localStorage.array !== "[]") {
      document.getElementById("divAlert").innerHTML = "";
    } else {
      document.getElementById("divAlert").innerHTML = [
        `<h3>Não foram encontrados produtos</h3>
        <h4>Atualize a lista ou insira um novo dado</h4>`,
      ].join("");
    }

    for (let i = 0; i < formProducts.length; i++) {
      let divItem = document.createElement("div");
      divItem.setAttribute("role", "alert");
      divItem.setAttribute("class", "div card text-bg-light mb-3 alert");
      divItem.setAttribute("id", `c0${i}`);
      divItem.innerHTML = [
        `<div class="deleteProduct"><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="formulario.deleteOneProduct(${i})"></button></div>`,
      ].join("");

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
