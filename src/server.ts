import { app } from "./app.js";

app.listen(
  {
    port: 3333,
  },
  () => console.log("Servidor rodando em 3333"),
);
