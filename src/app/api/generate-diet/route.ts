import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Inicializar cliente OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Lista de ingredientes tóxicos para cães com substituições
const TOXIC_INGREDIENTS = {
  'chocolate': {
    toxic: true,
    reason: 'Contém teobromina, que é altamente tóxica para cães e pode causar vômitos, diarreia, tremores, convulsões e até morte',
    substitutes: ['alfarroba em pó (carob)', 'pasta de amendoim natural sem xilitol']
  },
  'uva': {
    toxic: true,
    reason: 'Pode causar insuficiência renal aguda em cães',
    substitutes: ['maçã sem sementes', 'melancia sem sementes', 'banana']
  },
  'passa': {
    toxic: true,
    reason: 'Pode causar insuficiência renal aguda em cães',
    substitutes: ['maçã desidratada', 'banana desidratada']
  },
  'cebola': {
    toxic: true,
    reason: 'Contém compostos que destroem os glóbulos vermelhos, causando anemia',
    substitutes: ['cenoura', 'abóbora']
  },
  'alho': {
    toxic: true,
    reason: 'Contém compostos que destroem os glóbulos vermelhos, causando anemia',
    substitutes: ['cenoura', 'batata-doce']
  },
  'abacate': {
    toxic: true,
    reason: 'Contém persina, que pode causar vômitos e diarreia',
    substitutes: ['banana', 'manga']
  },
  'xilitol': {
    toxic: true,
    reason: 'Causa liberação rápida de insulina, levando a hipoglicemia e insuficiência hepática',
    substitutes: ['mel natural (em pequenas quantidades)', 'banana amassada']
  },
  'café': {
    toxic: true,
    reason: 'Contém cafeína, que é tóxica para cães',
    substitutes: ['caldo de carne sem sal']
  },
  'chá': {
    toxic: true,
    reason: 'Contém cafeína, que é tóxica para cães',
    substitutes: ['caldo de frango sem sal']
  },
  'macadâmia': {
    toxic: true,
    reason: 'Pode causar fraqueza, vômitos, tremores e hipertermia',
    substitutes: ['amendoim natural sem sal', 'castanha de caju']
  }
};

// Função para detectar ingredientes tóxicos
function detectToxicIngredients(ingredients: string[]): {
  found: string[];
  alerts: string[];
  safeIngredients: string[];
} {
  const found: string[] = [];
  const alerts: string[] = [];
  const safeIngredients: string[] = [];

  ingredients.forEach(ingredient => {
    const lowerIngredient = ingredient.toLowerCase().trim();
    let isToxic = false;

    // Verificar se o ingrediente está na lista de tóxicos
    for (const [toxicName, toxicData] of Object.entries(TOXIC_INGREDIENTS)) {
      if (lowerIngredient.includes(toxicName)) {
        found.push(ingredient);
        alerts.push(
          `⚠️ INGREDIENTE PERIGOSO DETECTADO: "${ingredient}" - ${toxicData.reason}. ` +
          `SUBSTITUIÇÕES SEGURAS: ${toxicData.substitutes.join(', ')}.`
        );
        isToxic = true;
        break;
      }
    }

    if (!isToxic) {
      safeIngredients.push(ingredient);
    }
  });

  return { found, alerts, safeIngredients };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      petName = 'Rex',
      breed = 'Labrador',
      weight = 25,
      age = 5,
      activityLevel = 'moderado',
      allergies = [],
      availableIngredients = [],
      objectives = 'manutenção de peso',
      mealsPerDay = 2,
      budget = 'médio'
    } = body;

    // Detectar ingredientes tóxicos
    const toxicCheck = detectToxicIngredients(availableIngredients);
    
    // Se houver ingredientes tóxicos, adicionar alertas e usar apenas os seguros
    const finalAlerts = [...toxicCheck.alerts];
    const safeIngredientsToUse = toxicCheck.safeIngredients.length > 0 
      ? toxicCheck.safeIngredients 
      : ['frango', 'arroz integral', 'cenoura', 'batata-doce'];

    // Calcular calorias diárias aproximadas
    const dailyCalories = Math.round(weight * 30 + 70);

    // Construir prompt estruturado para OpenAI
    const toxicWarning = toxicCheck.found.length > 0 
      ? `\n\n🚨 ATENÇÃO CRÍTICA: Os seguintes ingredientes são TÓXICOS para cães e NÃO devem ser usados: ${toxicCheck.found.join(', ')}. Use APENAS ingredientes seguros.`
      : '';

    const prompt = `Você é um nutricionista veterinário especializado. Crie uma dieta caseira completa para um cachorro com as seguintes características:

Nome: ${petName}
Raça: ${breed}
Peso: ${weight}kg
Idade: ${age} anos
Nível de atividade: ${activityLevel}
Alergias: ${allergies.length > 0 ? allergies.join(', ') : 'nenhuma'}
Ingredientes SEGUROS disponíveis: ${safeIngredientsToUse.join(', ')}
Objetivo: ${objectives}
Refeições por dia: ${mealsPerDay}
Orçamento: ${budget}
Calorias diárias estimadas: ${dailyCalories} kcal${toxicWarning}

REGRAS OBRIGATÓRIAS:
1. Use APENAS os ingredientes seguros listados acima
2. NÃO use chocolate, uva, passa, cebola, alho, abacate, xilitol, café, chá ou macadâmia
3. Garanta que a receita seja 100% segura para cães

Retorne APENAS um JSON válido (sem markdown, sem \`\`\`json) no seguinte formato:
{
  "metadata": {
    "pet_nome": "${petName}",
    "raca": "${breed}",
    "peso_kg": ${weight},
    "calorias_diarias_kcal": ${dailyCalories}
  },
  "recipe": {
    "title": "Nome da receita",
    "ingredients": [
      { "item": "Frango", "gramas": 200 },
      { "item": "Arroz integral", "gramas": 150 }
    ],
    "instructions": "Passo 1: ...\\nPasso 2: ...",
    "calories": ${dailyCalories},
    "macros": {
      "proteinas": 30,
      "gorduras": 20,
      "carboidratos": 50
    }
  },
  "shopping_list": [
    "Frango - 400g",
    "Arroz integral - 300g"
  ],
  "alerts": []
}`;

    // Chamar OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Você é um nutricionista veterinário especializado em dietas caseiras para cães. NUNCA use ingredientes tóxicos como chocolate, uva, cebola, alho, etc. Sempre retorne respostas em formato JSON válido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content || '';
    
    // Tentar parsear a resposta como JSON
    let dietData;
    try {
      // Remover possíveis marcadores de código markdown
      const cleanedResponse = responseText
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      
      dietData = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Erro ao parsear resposta da OpenAI:', parseError);
      return NextResponse.json(
        { 
          error: 'Erro ao processar resposta da IA',
          rawResponse: responseText
        },
        { status: 500 }
      );
    }

    // Adicionar alertas de ingredientes tóxicos ao resultado
    if (finalAlerts.length > 0) {
      dietData.alerts = [...(dietData.alerts || []), ...finalAlerts];
    }

    // Retornar dados da dieta
    return NextResponse.json({
      success: true,
      data: dietData,
      toxicIngredientsBlocked: toxicCheck.found,
      usage: {
        prompt_tokens: completion.usage?.prompt_tokens,
        completion_tokens: completion.usage?.completion_tokens,
        total_tokens: completion.usage?.total_tokens
      }
    });

  } catch (error: any) {
    console.error('Erro no endpoint generate-diet:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Erro ao gerar dieta',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
