import { execSync } from "child_process";

const ACCOUNT_ID = "af49f02166b348c161373e50ba9661d4";
const PROJECT_NAME = "ckn-landingpage";

const token = execSync("npx wrangler auth token", { encoding: "utf8" })
  .trim()
  .split("\n")
  .pop();

async function api(path) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

const domains = await api(
  `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/domains`
);

for (const d of domains.result || []) {
  console.log(`${d.name}: ${d.status || "unknown"}`);
}

const allActive = (domains.result || []).every((d) => d.status === "active");
process.exit(allActive ? 0 : 1);
