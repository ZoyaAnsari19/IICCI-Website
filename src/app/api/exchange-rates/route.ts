import { NextResponse } from "next/server";
import { getExchangeRates } from "@/lib/exchange-rates";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function GET() {
  const payload = await getExchangeRates();
  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    },
  });
}
