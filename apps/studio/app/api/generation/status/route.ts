import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const configured = Boolean(process.env.VIDEO_PROVIDER_URL && process.env.VIDEO_PROVIDER_API_KEY);
  return NextResponse.json({
    ready: false,
    configured,
    status: configured ? "integration_pending" : "provider_not_configured",
    message: configured
      ? "Des paramètres de fournisseur existent, mais l'intégration vidéo n'est pas encore validée."
      : "Aucun moteur de génération vidéo n'est connecté. Aucun traitement GPU ne sera lancé.",
  }, { headers: { "Cache-Control": "no-store" } });
}
