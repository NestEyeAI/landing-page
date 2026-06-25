import { execSync } from "child_process";

const ACCOUNT_ID = "af49f02166b348c161373e50ba9661d4";
const PROJECT_NAME = "ckn-landingpage";

const token = execSync("npx wrangler auth token", { encoding: "utf8" })
  .trim()
  .split("\n")
  .pop();

async function api(path, options = {}) {
  const res = await fetch(`https://api.cloudflare.com/client/v4${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  return res.json();
}

const domains = await api(
  `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/domains`
);

for (const d of domains.result || []) {
  console.log(`Removing Pages domain: ${d.name}`);
  const result = await api(
    `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/domains/${d.name}`,
    { method: "DELETE" }
  );
  console.log("success:", result.success, "errors:", result.errors?.length ? result.errors : "none");
}
