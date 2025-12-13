// Constants for NutriDog Pro

export const TOXIC_FOODS = [
  {
    name: 'chocolate',
    reason: 'Contém teobromina, tóxica para cães',
    alternative: 'Alfarroba',
  },
  {
    name: 'cebola',
    reason: 'Causa anemia hemolítica em cães',
    alternative: 'Cenoura ralada',
  },
  {
    name: 'alho',
    reason: 'Contém compostos que danificam células vermelhas',
    alternative: 'Salsinha',
  },
  {
    name: 'uva',
    reason: 'Pode causar insuficiência renal aguda',
    alternative: 'Maçã sem sementes',
  },
  {
    name: 'passa',
    reason: 'Pode causar insuficiência renal aguda',
    alternative: 'Banana',
  },
  {
    name: 'abacate',
    reason: 'Contém persina, tóxica para cães',
    alternative: 'Abóbora',
  },
  {
    name: 'café',
    reason: 'Cafeína é tóxica para cães',
    alternative: 'Água fresca',
  },
  {
    name: 'macadâmia',
    reason: 'Causa fraqueza e paralisia temporária',
    alternative: 'Amendoim sem sal',
  },
  {
    name: 'xilitol',
    reason: 'Causa hipoglicemia e falência hepática',
    alternative: 'Mel (pequenas quantidades)',
  },
];

export const BRAND_COLORS = {
  primary: '#0F5A8A',
  gold: '#D9A441',
  offWhite: '#FBFBFB',
  green: '#4DAF7C',
  grayLight: '#F1F5F9',
};

export const SUBSCRIPTION_PLANS = [
  {
    id: 'essencial',
    name: 'Essencial',
    price: 19.9,
    features: [
      'Geração ilimitada de dietas',
      'Pantry inteligente',
      'Detecção de alimentos tóxicos',
      'Suporte por email',
    ],
  },
  {
    id: 'plus',
    name: 'Plus',
    price: 39.9,
    recommended: true,
    features: [
      'Tudo do Essencial',
      'Plano semanal automático',
      'Modo cozinha com timers',
      'Histórico e evolução',
      'Vet Connect',
      'Suporte prioritário',
    ],
  },
  {
    id: 'pro-master',
    name: 'Pro Master',
    price: 79.9,
    features: [
      'Tudo do Plus',
      'Análise nutricional avançada',
      'Consultas com nutricionista veterinário',
      'Marketplace com descontos',
      'API para integração',
      'Suporte 24/7',
    ],
  },
];

export const ACTIVITY_LEVELS = [
  { value: 'low', label: 'Baixa (sedentário)' },
  { value: 'moderate', label: 'Moderada (passeios regulares)' },
  { value: 'high', label: 'Alta (muito ativo)' },
];

export const MEAL_OBJECTIVES = [
  'Perda de peso',
  'Ganho de massa muscular',
  'Manutenção',
  'Saúde digestiva',
  'Pelagem saudável',
  'Energia e vitalidade',
];
