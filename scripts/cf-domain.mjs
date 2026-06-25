import { execSync } from "child_process";

const ACCOUNT_ID = "af49f02166b348c161373e50ba9661d4";
const PROJECT_NAME = "ckn-landingpage";
const DOMAIN = "nesteye.ai";

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

async function main() {
  const zones = await api(`/zones?name=${DOMAIN}`);
  console.log("zone_count:", zones.result_info?.count ?? 0);
  if (!zones.result?.length) {
    console.error(`ERROR: ${DOMAIN} is not on this Cloudflare account.`);
    process.exit(1);
  }

  const zone = zones.result[0];
  console.log("zone_id:", zone.id, "status:", zone.status);

  for (const host of [DOMAIN, `www.${DOMAIN}`]) {
    console.log(`Adding custom domain: ${host}`);
    const result = await api(
      `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/domains`,
      { method: "POST", body: JSON.stringify({ name: host }) }
    );
    console.log("success:", result.success, "errors:", result.errors?.length ? result.errors : "none");
  }

  const domains = await api(
    `/accounts/${ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/domains`
  );
  console.log("Project domains:");
  for (const d of domains.result || []) {
    console.log(`- ${d.name} (${d.status || "unknown"})`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
