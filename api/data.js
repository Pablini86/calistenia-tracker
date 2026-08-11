const { getRedis } = require("../lib/redis");

const DATA_KEY = "calistenia:logs";

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");

  const redis = getRedis();
  if (!redis) {
    res.status(500).json({ error: "Base de datos no configurada: falta la variable REDIS_URL en Vercel" });
    return;
  }

  try {
    if (req.method === "GET") {
      const raw = await redis.get(DATA_KEY);
      if (!raw) {
        res.status(200).json({ data: null, updatedAt: 0 });
        return;
      }
      res.status(200).json(JSON.parse(raw));
      return;
    }

    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") body = JSON.parse(body);
      if (!body || !Array.isArray(body.data)) {
        res.status(400).json({ error: "Falta 'data' (arreglo) en el cuerpo de la petición" });
        return;
      }
      const updatedAt = Date.now();
      await redis.set(DATA_KEY, JSON.stringify({ data: body.data, updatedAt }));
      res.status(200).json({ ok: true, updatedAt });
      return;
    }

    res.status(405).json({ error: "Método no permitido" });
  } catch (err) {
    res.status(500).json({ error: String((err && err.message) || err) });
  }
};
