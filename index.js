const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.listen(8080, () => {
  console.log("O servidor está ativo na porta 8080");
});

// Usa o body-parser para lidar com dados no formato JSON
app.use(bodyParser.json());

// Array que armazena as tarefas
let tarefas = [
  { id: 1, titulo: "Tarefa 1", descricao: "Descrição 1", feito: false },
  { id: 2, titulo: "Tarefa 2", descricao: "Descrição 2", feito: false },
  { id: 3, titulo: "Tarefa 3", descricao: "Descrição 3", feito: false },
  { id: 4, titulo: "Tarefa 4", descricao: "Descrição 4", feito: false },
  { id: 5, titulo: "Tarefa 5", descricao: "Descrição 5", feito: false },
];

// Rota para retornar todas as tarefas
app.get("/tasks", (req, res) => {
  return res.json(tarefas);
});

// Rota para retornar uma tarefa específica
app.get("/tasks/:id", (req, res) => {
  let tarefa = tarefas.find((tarefa) => tarefa.id == req.params.id);
  if (tarefa) {
    res.json(tarefa);
  } else {
    // Retorna um erro 404 (não encontrado) se a tarefa não existir
    res.status(404).json({ erro: "Tarefa não encontrada" });
  }
});

// Rota para adicionar uma nova tarefa
app.post("/tasks", (req, res) => {
  let novaTarefa = {
    id: tarefas.length + 1,
    title: req.body.title,
    description: req.body.description || "",
    done: req.body.done || false,
  };

  tarefas.push(novaTarefa);

  // Retorna um código de status 201 (criado) e a nova tarefa adicionada em JSON
  return res.status(201).json(novaTarefa);
});

// Rota para atualizar uma tarefa existente
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, descricao, feito } = req.body;

  let tarefa = tarefas.find((tarefa) => tarefa.id == id);
  if (tarefa) {

    tarefa.titulo = titulo || tarefa.titulo;
    tarefa.descricao = descricao || tarefa.descricao;
    tarefa.feito = feito || tarefa.feito;
    return res.json(tarefa);
  } else {
    // Retorna um erro 404 (não encontrado) se a tarefa não existir
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
});

// Rota para excluir uma tarefa existente
app.delete("/tasks/:id", (req, res) => {
  let tarefasRestantes = tarefas.filter((tarefa) => tarefa.id != req.params.id);

  if (tarefasRestantes.length < tarefas.length) {
    // Retorna uma mensagem de sucesso se a tarefa foi excluída
    res.json({ mensagem: "Tarefa excluída com sucesso" });
  } else {
    // Retorna um erro 404 (não encontrado) se a tarefa não existir
    return res.status(404).json({ erro: "Tarefa não encontrada" });
  }
});
