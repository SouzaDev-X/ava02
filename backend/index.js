// backend/index.js
const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults({
  static: path.join(__dirname, "public"),
  logger: true,
  noCors: false,
});

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Defaults ao criar
server.post("/chamados", (req, res, next) => {
  req.body.status = req.body.status || "aberto";
  req.body.prioridade = req.body.prioridade || "média";
  req.body.createdAt = new Date().toISOString();
  next();
});

server.post("/eventos", (req, res, next) => {
  req.body.createdAt = new Date().toISOString();
  next();
});

// Rota custom para mudar status do chamado
server.patch("/chamados/:id/status", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: "status é obrigatório" });

  const db = router.db; // lowdb
  const chamado = db.get("chamados").find({ id }).value();
  if (!chamado) return res.status(404).json({ error: "Chamado não encontrado" });

  db.get("chamados").find({ id }).assign({ status }).write();
  return res.json({ ...chamado, status });
});

// Router padrão (GET/POST/PUT/PATCH/DELETE)
server.use(router);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 JSON Server rodando em http://0.0.0.0:${PORT}`);
});
