import { NextResponse } from "next/server";
import { getVaultData } from "@/services/vault";

export async function GET() {
  try {
    const data = await getVaultData();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Vault API error:", error);

    return NextResponse.json(
      { error: "Failed to load Vault data" },
      { status: 500 },
    );
  }
}