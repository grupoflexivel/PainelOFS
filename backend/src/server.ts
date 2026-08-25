import { createApp } from "./app.js";
import { loadConfig } from "./config.js";
import { PainelCache } from "./painelCache.js";

const config = loadConfig();
const painelCache = new PainelCache(config);
painelCache.start();

const app = createApp(painelCache, config);

app.listen(config.PORT, () => {
  console.log(`Painel OF backend ouvindo na porta ${config.PORT}`);
  console.log(`Atualizando a cada ${config.PAINEL_REFRESH_INTERVAL_MINUTES} min a partir de ${config.PAINEL_API_BASE_URL}`);
});

function shutdown() {
  painelCache.stop();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
