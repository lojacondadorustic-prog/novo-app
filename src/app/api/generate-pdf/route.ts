import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";

interface Ingredient {
  item: string;
  gramas: number;
}

interface Recipe {
  title: string;
  ingredients: Ingredient[];
  instructions: string;
  calories: number;
  macros: {
    proteinas: number;
    gorduras: number;
    carboidratos: number;
  };
}

interface PDFPayload {
  type?: "recipe" | "weekly";
  metadata?: {
    pet_nome: string;
    raca: string;
    peso_kg: number;
    calorias_diarias_kcal: number;
  };
  recipe?: Recipe;
  shopping_list?: string[];
  alerts?: string[];
  data?: any;
}

interface Meal {
  name: string;
  calories?: number;
}

interface DayPlan {
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
}

type WeekPlan = {
  [key: string]: DayPlan;
};

interface WeeklySummary {
  title: string;
  week: WeekPlan;
  totalMeals: number;
  totalCalories: number;
}

export async function POST(request: NextRequest) {
  try {
    const payload: PDFPayload = await request.json();
    const { type = "recipe" } = payload;

    if (type === "weekly") {
      return generateWeeklyPDF(payload.data as WeeklySummary);
    } else {
      return generateRecipePDF(payload);
    }
  } catch (error) {
    console.error("Erro ao gerar PDF:", error);
    return NextResponse.json(
      { error: "Erro ao gerar PDF", details: error instanceof Error ? error.message : "Erro desconhecido" },
      { status: 500 }
    );
  }
}

function generateWeeklyPDF(data: WeeklySummary) {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Função para verificar se precisa de nova página
  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // ===== CABEÇALHO =====
  doc.setFillColor(15, 90, 138);
  doc.rect(0, 0, pageWidth, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("NutriDog Pro", margin, 15);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Plano Semanal de Alimentação", margin, 25);
  
  doc.setFontSize(10);
  doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, margin, 32);

  yPosition = 50;

  // ===== RESUMO GERAL =====
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPosition, contentWidth, 25, "F");
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Resumo da Semana", margin + 5, yPosition + 8);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Total de Refeições: ${data.totalMeals}`, margin + 5, yPosition + 16);
  doc.text(`Calorias Totais: ${data.totalCalories} kcal`, margin + 5, yPosition + 22);

  yPosition += 35;

  // ===== PLANO DIÁRIO =====
  const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  
  days.forEach((day) => {
    const dayPlan = data.week[day];
    const mealsCount = (dayPlan.breakfast ? 1 : 0) + (dayPlan.lunch ? 1 : 0) + (dayPlan.dinner ? 1 : 0);
    
    if (mealsCount === 0) return; // Pula dias sem refeições

    checkNewPage(50);

    // Cabeçalho do dia
    doc.setFillColor(15, 90, 138);
    doc.rect(margin, yPosition, contentWidth, 10, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(day, margin + 5, yPosition + 7);

    yPosition += 15;

    // Café da Manhã
    if (dayPlan.breakfast) {
      doc.setFillColor(255, 237, 213); // Laranja claro
      doc.rect(margin, yPosition, contentWidth, 12, "F");
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Café da Manhã", margin + 5, yPosition + 5);
      
      doc.setFont("helvetica", "normal");
      doc.text(dayPlan.breakfast.name, margin + 5, yPosition + 10);
      
      if (dayPlan.breakfast.calories) {
        doc.setFont("helvetica", "bold");
        doc.text(`${dayPlan.breakfast.calories} kcal`, pageWidth - margin - 25, yPosition + 10);
      }
      
      yPosition += 15;
    }

    // Almoço
    if (dayPlan.lunch) {
      doc.setFillColor(219, 234, 254); // Azul claro
      doc.rect(margin, yPosition, contentWidth, 12, "F");
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Almoço", margin + 5, yPosition + 5);
      
      doc.setFont("helvetica", "normal");
      doc.text(dayPlan.lunch.name, margin + 5, yPosition + 10);
      
      if (dayPlan.lunch.calories) {
        doc.setFont("helvetica", "bold");
        doc.text(`${dayPlan.lunch.calories} kcal`, pageWidth - margin - 25, yPosition + 10);
      }
      
      yPosition += 15;
    }

    // Jantar
    if (dayPlan.dinner) {
      doc.setFillColor(243, 232, 255); // Roxo claro
      doc.rect(margin, yPosition, contentWidth, 12, "F");
      
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Jantar", margin + 5, yPosition + 5);
      
      doc.setFont("helvetica", "normal");
      doc.text(dayPlan.dinner.name, margin + 5, yPosition + 10);
      
      if (dayPlan.dinner.calories) {
        doc.setFont("helvetica", "bold");
        doc.text(`${dayPlan.dinner.calories} kcal`, pageWidth - margin - 25, yPosition + 10);
      }
      
      yPosition += 15;
    }

    // Calorias do dia
    const dayCalories = (dayPlan.breakfast?.calories || 0) + (dayPlan.lunch?.calories || 0) + (dayPlan.dinner?.calories || 0);
    if (dayCalories > 0) {
      doc.setFillColor(217, 164, 65);
      doc.rect(margin, yPosition, contentWidth, 8, "F");
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(`Total do dia: ${dayCalories} kcal`, margin + 5, yPosition + 5);
      
      yPosition += 13;
    } else {
      yPosition += 5;
    }
  });

  // ===== RODAPÉ =====
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `NutriDog Pro - Plano Semanal - Página ${i} de ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  const pdfBuffer = doc.output("arraybuffer");

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="plano-semanal-${Date.now()}.pdf"`,
    },
  });
}

function generateRecipePDF(payload: PDFPayload) {
  const { metadata, recipe, shopping_list, alerts } = payload;

  if (!metadata || !recipe || !shopping_list) {
    throw new Error("Dados incompletos para gerar PDF de receita");
  }

  const doc = new jsPDF();
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 10) => {
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return lines.length * (fontSize * 0.5);
  };

  const checkNewPage = (requiredSpace: number) => {
    if (yPosition + requiredSpace > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      yPosition = 20;
    }
  };

  // ===== CABEÇALHO =====
  doc.setFillColor(15, 90, 138);
  doc.rect(0, 0, pageWidth, 40, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("NutriDog Pro", margin, 15);
  
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Dieta Personalizada", margin, 25);
  
  doc.setFontSize(10);
  doc.text(`Gerado em: ${new Date().toLocaleDateString("pt-BR")}`, margin, 32);

  yPosition = 50;

  // ===== TÍTULO DA RECEITA =====
  doc.setTextColor(15, 90, 138);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  const titleHeight = addText(recipe.title, margin, yPosition, contentWidth, 18);
  yPosition += titleHeight + 8;

  // ===== INFORMAÇÕES DO PET =====
  doc.setFillColor(241, 245, 249);
  doc.rect(margin, yPosition, contentWidth, 25, "F");
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Informações do Pet", margin + 5, yPosition + 8);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Nome: ${metadata.pet_nome}`, margin + 5, yPosition + 14);
  doc.text(`Raça: ${metadata.raca}`, margin + 5, yPosition + 20);
  doc.text(`Peso: ${metadata.peso_kg}kg`, margin + 80, yPosition + 14);
  doc.text(`Meta diária: ${metadata.calorias_diarias_kcal} kcal`, margin + 80, yPosition + 20);
  
  yPosition += 32;

  // ===== ALERTAS =====
  if (alerts && alerts.length > 0) {
    checkNewPage(30 + alerts.length * 6);
    
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(239, 68, 68);
    doc.setLineWidth(0.5);
    
    const alertBoxHeight = 15 + alerts.length * 6;
    doc.rect(margin, yPosition, contentWidth, alertBoxHeight, "FD");
    
    doc.setTextColor(153, 27, 27);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text("⚠️ ALERTAS IMPORTANTES", margin + 5, yPosition + 8);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    alerts.forEach((alert, index) => {
      doc.text(`• ${alert}`, margin + 5, yPosition + 14 + index * 6);
    });
    
    yPosition += alertBoxHeight + 10;
  }

  // ===== CALORIAS E MACROS =====
  checkNewPage(40);
  
  doc.setFillColor(217, 164, 65);
  doc.rect(margin, yPosition, contentWidth / 2 - 5, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Calorias", margin + 5, yPosition + 10);
  
  doc.setFontSize(24);
  doc.text(`${recipe.calories}`, margin + 5, yPosition + 22);
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("kcal por refeição", margin + 5, yPosition + 30);

  doc.setFillColor(77, 175, 124);
  doc.rect(margin + contentWidth / 2 + 5, yPosition, contentWidth / 2 - 5, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Macronutrientes", margin + contentWidth / 2 + 10, yPosition + 10);
  
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Proteínas: ${recipe.macros.proteinas}g`, margin + contentWidth / 2 + 10, yPosition + 18);
  doc.text(`Gorduras: ${recipe.macros.gorduras}g`, margin + contentWidth / 2 + 10, yPosition + 24);
  doc.text(`Carboidratos: ${recipe.macros.carboidratos}g`, margin + contentWidth / 2 + 10, yPosition + 30);
  
  yPosition += 45;

  // ===== INGREDIENTES =====
  checkNewPage(20 + recipe.ingredients.length * 6);
  
  doc.setTextColor(15, 90, 138);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Ingredientes", margin, yPosition);
  yPosition += 8;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  recipe.ingredients.forEach((ingredient) => {
    checkNewPage(8);
    doc.text(`• ${ingredient.item}`, margin + 5, yPosition);
    doc.setFont("helvetica", "bold");
    doc.text(`${ingredient.gramas}g`, pageWidth - margin - 20, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 6;
  });
  
  yPosition += 5;

  // ===== MODO DE PREPARO =====
  checkNewPage(30);
  
  doc.setTextColor(15, 90, 138);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Modo de Preparo", margin, yPosition);
  yPosition += 8;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  const instructions = recipe.instructions.split("\n").filter(line => line.trim());
  instructions.forEach((line) => {
    checkNewPage(15);
    const lineHeight = addText(line.trim(), margin + 5, yPosition, contentWidth - 10, 10);
    yPosition += lineHeight + 4;
  });
  
  yPosition += 5;

  // ===== LISTA DE COMPRAS =====
  checkNewPage(20 + shopping_list.length * 6);
  
  doc.setTextColor(15, 90, 138);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Lista de Compras", margin, yPosition);
  yPosition += 8;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  shopping_list.forEach((item) => {
    checkNewPage(8);
    doc.text(`☐ ${item}`, margin + 5, yPosition);
    yPosition += 6;
  });

  // ===== RODAPÉ =====
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `NutriDog Pro - Dieta Personalizada para ${metadata.pet_nome} - Página ${i} de ${totalPages}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  const pdfBuffer = doc.output("arraybuffer");

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="dieta-${metadata.pet_nome.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.pdf"`,
    },
  });
}
