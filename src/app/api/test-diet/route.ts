import { NextRequest, NextResponse } from 'next/server';

// Endpoint de teste com dados simulados (não usa OpenAI real)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      petName = 'Rex',
      breed = 'Labrador',
      weight = 25,
      age = 5,
    } = body;

    // Calcular calorias diárias aproximadas
    const dailyCalories = Math.round(weight * 30 + 70);

    // Simular resposta da OpenAI (dados fictícios para teste)
    const mockDietData = {
      metadata: {
        pet_nome: petName,
        raca: breed,
        peso_kg: weight,
        calorias_diarias_kcal: dailyCalories
      },
      recipe: {
        title: `Dieta Balanceada para ${petName}`,
        ingredients: [
          { item: "Peito de frango (cozido e desfiado)", gramas: 250 },
          { item: "Arroz integral (cozido)", gramas: 180 },
          { item: "Cenoura (cozida e picada)", gramas: 80 },
          { item: "Batata doce (cozida e amassada)", gramas: 100 },
          { item: "Óleo de coco", gramas: 10 },
          { item: "Suplemento vitamínico canino", gramas: 5 }
        ],
        instructions: `Passo 1: Cozinhe o peito de frango sem temperos e desfie em pedaços pequenos.

Passo 2: Cozinhe o arroz integral em água filtrada até ficar macio.

Passo 3: Cozinhe a cenoura e a batata doce no vapor até ficarem macias. Pique a cenoura e amasse a batata doce.

Passo 4: Em uma tigela grande, misture todos os ingredientes: frango, arroz, cenoura, batata doce e óleo de coco.

Passo 5: Deixe esfriar completamente antes de servir.

Passo 6: Adicione o suplemento vitamínico por cima da refeição.

Passo 7: Divida em 2 porções iguais para servir ao longo do dia.

Dica: Armazene na geladeira por até 3 dias ou congele porções individuais.`,
        calories: dailyCalories,
        macros: {
          proteinas: 35,
          gorduras: 25,
          carboidratos: 40
        }
      },
      shopping_list: [
        "Peito de frango - 500g",
        "Arroz integral - 360g",
        "Cenoura - 160g",
        "Batata doce - 200g",
        "Óleo de coco - 20ml",
        "Suplemento vitamínico canino - 1 unidade"
      ],
      alerts: [
        {
          type: "info",
          message: "Esta dieta foi calculada para um cão de porte médio com atividade moderada. Ajuste as porções conforme necessário."
        },
        {
          type: "warning",
          message: "Sempre consulte um veterinário antes de mudar a dieta do seu pet, especialmente se ele tiver condições de saúde específicas."
        }
      ]
    };

    // Retornar dados simulados
    return NextResponse.json({
      success: true,
      mode: 'TESTE - Dados simulados (não usa OpenAI real)',
      data: mockDietData,
      usage: {
        prompt_tokens: 0,
        completion_tokens: 0,
        total_tokens: 0,
        note: 'Teste com dados fictícios - configure OPENAI_API_KEY para usar IA real'
      }
    });

  } catch (error: any) {
    console.error('Erro no endpoint test-diet:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Erro ao gerar dieta de teste',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
