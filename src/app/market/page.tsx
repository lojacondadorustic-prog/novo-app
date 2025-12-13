"use client";

import { ShoppingBag, Star, Package, Heart, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

type Category = "Todos" | "Suplementos" | "Vitaminas" | "Snacks Naturais" | "Acessórios" | "Utensílios de Cozinha";

interface Product {
  id: number;
  name: string;
  description: string;
  benefit: string;
  price: number;
  category: Category;
  image: string;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Ômega 3 Premium",
    description: "Suplemento de óleo de peixe purificado para cães",
    benefit: "Melhora a saúde da pele e pelagem, fortalece o sistema imunológico",
    price: 89.90,
    category: "Suplementos",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
    rating: 4.8
  },
  {
    id: 2,
    name: "Complexo Vitamínico Canino",
    description: "Multivitamínico completo com 12 vitaminas essenciais",
    benefit: "Fortalece ossos, dentes e sistema imunológico do seu pet",
    price: 65.00,
    category: "Vitaminas",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
    rating: 4.9
  },
  {
    id: 3,
    name: "Snack Natural de Batata Doce",
    description: "Chips desidratados 100% naturais sem conservantes",
    benefit: "Rico em fibras, auxilia na digestão e controle de peso",
    price: 32.50,
    category: "Snacks Naturais",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop",
    rating: 4.7
  },
  {
    id: 4,
    name: "Comedouro Elevado Inox",
    description: "Comedouro duplo em aço inoxidável com suporte ajustável",
    benefit: "Melhora a postura durante alimentação, reduz problemas digestivos",
    price: 145.00,
    category: "Acessórios",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop",
    rating: 4.6
  },
  {
    id: 5,
    name: "Kit Preparo de Refeições",
    description: "Conjunto com balança digital, potes e colheres medidoras",
    benefit: "Facilita o preparo de dietas caseiras balanceadas",
    price: 78.90,
    category: "Utensílios de Cozinha",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=400&fit=crop",
    rating: 4.5
  },
  {
    id: 6,
    name: "Probiótico Natural",
    description: "Suplemento probiótico com 5 bilhões de UFC",
    benefit: "Melhora a flora intestinal e fortalece a imunidade",
    price: 95.00,
    category: "Suplementos",
    image: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=400&fit=crop",
    rating: 4.9
  },
  {
    id: 7,
    name: "Biscoitos Naturais de Frango",
    description: "Snacks crocantes feitos com frango orgânico",
    benefit: "Alto teor proteico, ideal para treinos e recompensas",
    price: 28.90,
    category: "Snacks Naturais",
    image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=400&h=400&fit=crop",
    rating: 4.8
  },
  {
    id: 8,
    name: "Vitamina D3 + Cálcio",
    description: "Suplemento para saúde óssea e dental",
    benefit: "Previne problemas ósseos e fortalece a estrutura dental",
    price: 72.00,
    category: "Vitaminas",
    image: "https://images.unsplash.com/photo-1550572017-4a6e8e8c6e6f?w=400&h=400&fit=crop",
    rating: 4.7
  }
];

const categories: Category[] = [
  "Todos",
  "Suplementos",
  "Vitaminas",
  "Snacks Naturais",
  "Acessórios",
  "Utensílios de Cozinha"
];

const categoryIcons: Record<Category, any> = {
  "Todos": ShoppingBag,
  "Suplementos": Package,
  "Vitaminas": Heart,
  "Snacks Naturais": Star,
  "Acessórios": ShoppingBag,
  "Utensílios de Cozinha": Utensils
};

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Todos");

  const filteredProducts = selectedCategory === "Todos" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0F5A8A] to-[#D9A441] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <ShoppingBag className="w-5 h-5" />
              <span className="text-sm font-medium">Produtos Selecionados</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Marketplace NutriDog Pro
            </h1>
            <p className="text-lg sm:text-xl text-white/90">
              Produtos selecionados para complementar o bem-estar e a alimentação do seu cão.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8 border-b bg-white sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#0F5A8A] text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {selectedCategory === "Todos" ? "Todos os Produtos" : selectedCategory}
            </h2>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-gray-900 backdrop-blur-sm">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                    {product.rating}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-xs font-medium text-green-800 flex items-start gap-2">
                      <Heart className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{product.benefit}</span>
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#0F5A8A]">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button 
                    className="w-full bg-[#0F5A8A] hover:bg-[#0F5A8A]/90 text-white"
                    onClick={() => alert(`Detalhes do produto: ${product.name}\n\nEm breve você poderá visualizar mais informações e adicionar ao carrinho!`)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum produto encontrado
              </h3>
              <p className="text-gray-600">
                Tente selecionar outra categoria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="bg-gradient-to-r from-[#D9A441] to-[#0F5A8A] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Produtos Aprovados por Veterinários
            </h2>
            <p className="text-lg text-white/90 mb-6">
              Todos os produtos do nosso marketplace são cuidadosamente selecionados e aprovados por profissionais veterinários especializados em nutrição canina.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✓ Qualidade Garantida</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✓ Entrega Rápida</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="font-semibold">✓ Suporte Especializado</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
