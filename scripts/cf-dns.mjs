import { execSync } from "child_process";

const ZONE_ID = "0adc61e19b76c4747135740464248308";
const DOMAIN = "nesteye.ai";
const TARGET = "ckn-landingpage.pages.dev";

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

async function ensureCname(name) {
  const existing = await api(
    `/zones/${ZONE_ID}/dns_records?type=CNAME&name=${encodeURIComponent(name)}`
  );

  if (existing.result?.length) {
    const record = existing.result[0];
    if (record.content === TARGET && record.proxied) {
      console.log(`OK: ${name} already points to ${TARGET} (proxied)`);
      return;
    }
    console.log(`Updating ${name} -> ${TARGET}`);
    const updated = await api(`/zones/${ZONE_ID}/dns_records/${record.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        type: "CNAME",
        name,
        content: TARGET,
        proxied: true,
      }),
    });
    console.log("success:", updated.success, "errors:", updated.errors?.length ? updated.errors : "none");
    return;
  }

  console.log(`Creating CNAME ${name} -> ${TARGET} (proxied)`);
  const created = await api(`/zones/${ZONE_ID}/dns_records`, {
    method: "POST",
    body: JSON.stringify({
      type: "CNAME",
      name,
      content: TARGET,
      proxied: true,
    }),
  });
  console.log("success:", created.success, "errors:", created.errors?.length ? created.errors : "none");
}

async function main() {
  await ensureCname(DOMAIN);
  await ensureCname(`www.${DOMAIN}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
