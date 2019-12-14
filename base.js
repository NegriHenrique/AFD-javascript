let quantidadeEstados = "1";
let estadoInicial = "-1";
let alfabeto = [];
let estadosFinais = [];
let automato = [];

function atribuiOptions(id, quantidade, label, multiple = false) {
  let message =
    `<label for='${id}'>${label}</label>` +
    `<select id='${id}' name='${id}' class='selectpicker' ${
      multiple ? "multiple" : ""
    }>`;
  if (!multiple) message += "<option value='-1'>Escolha um estado</option>";
  for (let i = 0; i < quantidade; i++) {
    message += `<option value='${i}'>q${i}</option>`;
  }
  message += "</select>";
  return message;
}

function atribuiOptionsValores(id, valores, label, multiple = false) {
  let message =
    `<label for='${id}'>${label}</label>` +
    `<select id='${id}' name='${id}' class='selectpicker' ${
      multiple ? "multiple" : ""
    }>`;
  if (!multiple) message += "<option value='-1'>Escolha um estado</option>";
  for (let i = 0; i < valores.length; i++) {
    message += `<option value='${valores[i]}'>${valores[i]}</option>`;
  }
  message += "</select>";
  return message;
}

function adicionarTransacao() {
  const inicio = $("#inicio").val();
  const valores = $("#valor").val();

  for (let i = 0; i < valores.length; i++) {
    const transicao = {
      destino: $("#destino").val(),
      valor: valores[i]
    };

    if (automato[inicio].find(a => a.valor === transicao.valor)) {
      return;
    } else {
      automato[inicio] = [...automato[inicio], transicao];
      const message = `(q${inicio}, ${transicao.valor}) -> q${transicao.destino} <br/>`;
      $("#transicoes-texto").append(message);
    }
  }
  $("#inicio")
    .val("-1")
    .change();
  $("#valor")
    .val([])
    .change();
  $("#destino")
    .val("-1")
    .change();
}

function finalizar() {
  let mensagemErro = "";
  if ($("#transicoes-texto").html() === "")
    mensagemErro = "O autômato precisa ter pelo menos uma transição.";

  $("#erro").html(mensagemErro);

  if (mensagemErro !== "") return;

  let message =
    "<h4>Palavras</h4>" +
    "<div class='row'>" +
    "<div class='col-12 col-md-6 d-inline-flex flex-column'>" +
    "<label for='palavra'> Palavra </label>" +
    "<input id='palavra' type='text'/>" +
    "</div>" +
    "<div class='align-items-center col-12 d-flex d-inline-flex flex-column justify-content-end'>" +
    "<span id='resultado-palavra'> </span>" +
    "</div>" +
    "</div>";

  $("#main-content").html(message);

  listenerPalavraInput();
}

function handleNext() {
  let mensagemErro = "";
  if (estadoInicial === "-1") mensagemErro += "Estado inicial inválido.";
  if (estadosFinais.length === 0) mensagemErro += " Estados finais inválidos.";
  if (alfabeto.length === 0) mensagemErro += " Alfabeto inválido";
  if (parseInt(quantidadeEstados) < 1)
    mensagemErro += " Quantidade de estados inválido.";

  $("#erro").html(mensagemErro);

  if (mensagemErro !== "") {
    return;
  }

  message = "<h4>Transições</h4>" + "<div class='row'>";

  message +=
    "<div class='col-12 d-flex justify-content-center align-items-center flex-column'>";
  message += atribuiOptions("inicio", quantidadeEstados, "Início");
  message += "</div>";

  message +=
    "<div class='mt-4 col-12 d-flex justify-content-center align-items-center flex-column'>";
  message += atribuiOptionsValores("valor", alfabeto, "Valor", true);
  message += "</div>";

  message +=
    "<div class='mt-4 col-12 d-flex justify-content-center align-items-center flex-column'>";
  message += atribuiOptions("destino", quantidadeEstados, "Destino");
  message += "</div>";

  message +=
    "<div class='mt-5 d-flex col-12 justify-content-end'>" +
    "<button class='btn btn-success mr-3' onClick='adicionarTransacao()'> Adicionar e continuar </button>" +
    "<button class='btn btn-primary' onClick='finalizar()'> Finalizar </button>" +
    "</div>";

  message += "</div>";
  automato = new Array(parseInt(quantidadeEstados)).fill([]);
  $("#main-content").html(message);

  $("#inicio").selectpicker();
  $("#valor").selectpicker();
  $("#destino").selectpicker();
}

function verificaPalavra(palavra) {
  let atualEstado = estadoInicial;
  for (let i = 0; i < palavra.length; i++) {
    const valor = palavra[i];
    const rec = automato[atualEstado].find(a => a.valor === valor);
    if (rec) {
      atualEstado = rec.destino;
    } else {
      return false;
    }
  }
  if (estadosFinais.includes(atualEstado)) return true;

  return false;
}

$("#alfabeto").on("change", function() {
  alfabeto = $(this)
    .val()
    .split(",");

  alfabeto = alfabeto.filter((este, i) => alfabeto.indexOf(este) === i);

  $("#alfabeto-texto").html(alfabeto.join(", "));
});

$("#qtd-estados").on("change", function() {
  quantidadeEstados = $(this).val();
  const estadoInicialSelectDiv = $("#div-estado-inicial");
  const estadoInicialSelect = atribuiOptions(
    "estado-inicial",
    quantidadeEstados,
    "Estado inicial"
  );
  estadoInicialSelectDiv.html(estadoInicialSelect);

  const estadosFinaisSelectDiv = $("#div-estados-finais");
  const estadosFinaisSelect = atribuiOptions(
    "estados-finais",
    quantidadeEstados,
    "Estados finais",
    true
  );
  estadosFinaisSelectDiv.html(estadosFinaisSelect);

  $("#estado-inicial").selectpicker();
  $("#estados-finais").selectpicker();

  listenerEstadoInicial();
  listenerEstadosFinais();

  estadoInicial = -1;
});

function listenerPalavraInput() {
  $("#palavra").on("change", function() {
    const resultado = $("#resultado-palavra");
    if (verificaPalavra($(this).val())) {
      resultado.html("Está palavra é aceita na linguagem");
      resultado.removeClass("text-danger");
      resultado.addClass("text-success");
    } else {
      resultado.html("Está palavra NÃO é aceita na linguagem");
      resultado.removeClass("text-success");
      resultado.addClass("text-danger");
    }
  });
}

function listenerEstadosFinais() {
  $("#estados-finais").on("change", function() {
    estadosFinais = $(this).val();
    $("#estados-finais-texto").html(estadosFinais.join(", "));
  });
}

function listenerEstadoInicial() {
  $("#estado-inicial").on("change", function() {
    estadoInicial = $(this).val();
    $("#estado-inicial-texto").html(estadoInicial);
  });
}

$(document).ready(function() {
  listenerEstadoInicial();
  listenerEstadosFinais();
});
