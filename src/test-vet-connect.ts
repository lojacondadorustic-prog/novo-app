// Teste do endpoint de envio para veterinário
// Este arquivo demonstra o funcionamento do Vet Connect

const testVetConnect = async () => {
  const testData = {
    vetEmail: "dr.veterinario@clinicapet.com",
    dietData: {
      metadata: {
        pet_nome: "Rex",
        raca: "Golden Retriever",
        peso_kg: 30,
        calorias_diarias_kcal: 970,
      },
      recipe: {
        title: "Frango com Arroz Integral e Legumes",
        calories: 485,
        macros: {
          proteinas: 35,
          gorduras: 12,
          carboidratos: 45,
        },
        ingredients: [
          { item: "Peito de frango", gramas: 150 },
          { item: "Arroz integral", gramas: 80 },
          { item: "Cenoura", gramas: 50 },
          { item: "Batata doce", gramas: 60 },
        ],
        instructions: "1. Cozinhe o frango sem temperos\n2. Cozinhe o arroz integral\n3. Cozinhe os legumes no vapor\n4. Misture tudo e sirva morno",
      },
      shopping_list: ["Peito de frango", "Arroz integral", "Cenoura", "Batata doce"],
      alerts: ["Consulte sempre seu veterinário antes de mudanças na dieta"],
    },
  };

  try {
    const response = await fetch("/api/send-to-vet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    
    console.log("=== TESTE VET CONNECT ===");
    console.log("Status:", response.status);
    console.log("Resultado:", result);
    console.log("========================");

    return result;
  } catch (error) {
    console.error("Erro no teste:", error);
    return { error: "Falha no teste" };
  }
};

// Executar teste
if (typeof window !== "undefined") {
  console.log("🧪 Iniciando teste do Vet Connect...");
  testVetConnect();
}

export default testVetConnect;
