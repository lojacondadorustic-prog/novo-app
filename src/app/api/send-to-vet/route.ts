import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vetEmail, dietData } = body;

    if (!vetEmail || !dietData) {
      return NextResponse.json(
        { error: "E-mail do veterinário e dados da dieta são obrigatórios" },
        { status: 400 }
      );
    }

    // Validação básica de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(vetEmail)) {
      return NextResponse.json(
        { error: "E-mail inválido" },
        { status: 400 }
      );
    }

    // Preparar dados do log
    const logEntry = {
      timestamp: new Date().toISOString(),
      vetEmail,
      petName: dietData.metadata?.pet_nome || "Pet",
      recipeName: dietData.recipe?.title || "Receita",
      calories: dietData.recipe?.calories || 0,
      sentAt: new Date().toLocaleString("pt-BR"),
    };

    // Caminho do arquivo de log
    const logDir = path.join(process.cwd(), "logs");
    const logFile = path.join(logDir, "vet-emails.log");

    // Criar diretório de logs se não existir
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    // Adicionar ao log
    const logLine = `[${logEntry.timestamp}] E-mail enviado para: ${vetEmail} | Pet: ${logEntry.petName} | Receita: ${logEntry.recipeName} | Calorias: ${logEntry.calories}kcal\n`;
    fs.appendFileSync(logFile, logLine);

    console.log("✅ E-mail registrado no log:", logEntry);

    // Simular envio de e-mail (em produção, aqui seria integração com serviço real)
    // Exemplos: SendGrid, Resend, AWS SES, etc.

    return NextResponse.json({
      success: true,
      message: `Dieta enviada com sucesso para ${vetEmail}!`,
      logEntry,
    });
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { error: "Erro ao processar envio de e-mail" },
      { status: 500 }
    );
  }
}
