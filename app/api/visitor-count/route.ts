import { getDeployStore, getStore } from "@netlify/blobs";
import { NextResponse } from "next/server";

const STORE_NAME = "site-metrics";
const COUNTER_KEY = "homepage-visits";

function getCounterStore() {
  if (process.env.CONTEXT === "production") {
    return getStore(STORE_NAME);
  }

  return getDeployStore(STORE_NAME);
}

async function readCount() {
  const store = getCounterStore();
  const stored = await store.get(COUNTER_KEY, { consistency: "strong" });
  const count = Number.parseInt(stored ?? "0", 10);
  return Number.isFinite(count) ? count : 0;
}

export async function GET() {
  try {
    const count = await readCount();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}

export async function POST() {
  try {
    const store = getCounterStore();
    const current = await readCount();
    const count = current + 1;
    await store.set(COUNTER_KEY, String(count));

    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
