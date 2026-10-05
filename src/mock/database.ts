import {
  AirportUnit,
  LuggageCategory,
  Customer,
  Reservation,
  VolumeItem,
  Objective,
  Lead,
  FollowUpItem,
  Proposal,
  CommercialPartner,
  FinancialTransaction,
  TeamMember,
  IncidentOccurrence,
  AssetEquipment,
  SOPDocument,
  AuditLogItem,
  SystemNotification
} from '../types';

export const INITIAL_UNITS: AirportUnit[] = [
  {
    id: 'FOR',
    name: 'Fortaleza · Aeroporto Pinto Martins',
    shortName: 'Fortaleza',
    airportCode: 'FOR',
    terminal: 'Piso 1 - Desembarque Próx. Portão 2',
    address: 'Av. Senador Carlos Jereissati, 3000 - Serrinha, Fortaleza - CE',
    openingHours: '24 horas / 7 dias por semana',
    manager: 'Marcelo Araripe',
    phone: '(85) 3392-8810',
    capacityTotal: 180,
    capacityOccupied: 142,
    capacityReserved: 18,
    capacityMaintenance: 4,
    activeStaffCount: 8,
    monthlyRevenue: 194850,
    monthlyTarget: 210000,
    ticketAverage: 82.50,
    status: 'operational',
    cashBalance: 4820.00
  },
  {
    id: 'CGH',
    name: 'São Paulo · Aeroporto de Congonhas',
    shortName: 'Congonhas',
    airportCode: 'CGH',
    terminal: 'Subsolo Central - Em frente ao Check-in Sul',
    address: 'Av. Washington Luís, s/nº - Vila Congonhas, São Paulo - SP',
    openingHours: '05:00 às 23:30 (todos os dias)',
    manager: 'Renata Figueiredo',
    phone: '(11) 5090-9112',
    capacityTotal: 260,
    capacityOccupied: 238,
    capacityReserved: 14,
    capacityMaintenance: 2,
    activeStaffCount: 12,
    monthlyRevenue: 342100,
    monthlyTarget: 330000,
    ticketAverage: 98.40,
    status: 'busy',
    cashBalance: 8940.50
  },
  {
    id: 'POA',
    name: 'Porto Alegre · Salgado Filho',
    shortName: 'Porto Alegre',
    airportCode: 'POA',
    terminal: 'Terminal 1 - Piso 2 Mezanino',
    address: 'Av. Severo Dullius, 90010 - São João, Porto Alegre - RS',
    openingHours: '05:30 às 23:00 (todos os dias)',
    manager: 'Eduardo Silveira',
    phone: '(51) 3358-2044',
    capacityTotal: 140,
    capacityOccupied: 86,
    capacityReserved: 12,
    capacityMaintenance: 2,
    activeStaffCount: 6,
    monthlyRevenue: 138400,
    monthlyTarget: 155000,
    ticketAverage: 74.20,
    status: 'operational',
    cashBalance: 3120.00
  },
  {
    id: 'REC',
    name: 'Recife · Aeroporto Internacional Guararapes',
    shortName: 'Recife',
    airportCode: 'REC',
    terminal: 'Piso Térreo - Desembarque Sul',
    address: 'Praça Ministro Salgado Filho, s/n - Imbiribeira, Recife - PE',
    openingHours: '24 horas / 7 dias por semana',
    manager: 'Camila Vasconcelos',
    phone: '(81) 3322-4418',
    capacityTotal: 170,
    capacityOccupied: 149,
    capacityReserved: 11,
    capacityMaintenance: 3,
    activeStaffCount: 7,
    monthlyRevenue: 172900,
    monthlyTarget: 180000,
    ticketAverage: 86.10,
    status: 'busy',
    cashBalance: 4250.00
  },
  {
    id: 'SSA',
    name: 'Salvador · Salvador Bahia Airport',
    shortName: 'Salvador',
    airportCode: 'SSA',
    terminal: 'Piso 1 - Embarque / Praça de Serviços',
    address: 'Praça Gago Coutinho, s/n - São Cristóvão, Salvador - BA',
    openingHours: '05:00 às 00:00 (todos os dias)',
    manager: 'Antônio Prado',
    phone: '(71) 3204-1890',
    capacityTotal: 150,
    capacityOccupied: 98,
    capacityReserved: 15,
    capacityMaintenance: 1,
    activeStaffCount: 6,
    monthlyRevenue: 146700,
    monthlyTarget: 160000,
    ticketAverage: 79.80,
    status: 'operational',
    cashBalance: 3670.00
  }
];

export const INITIAL_CATEGORIES: LuggageCategory[] = [
  {
    id: 'cat-p',
    code: 'P',
    name: 'Pequeno · Mochila & Sacola',
    dimensions: '25 × 35 × 45 cm',
    maxWeightKg: 10,
    hourlyRate: 14.0,
    dailyRate: 38.0,
    weeklyRate: 190.0,
    description: 'Bolsas, mochilas de notebook, sacolas de compras ou capas.',
    color: '#3B82F6'
  },
  {
    id: 'cat-m',
    code: 'M',
    name: 'Médio · Mala de Bordo',
    dimensions: '25 × 40 × 55 cm',
    maxWeightKg: 18,
    hourlyRate: 18.0,
    dailyRate: 52.0,
    weeklyRate: 260.0,
    description: 'Mala de mão padrão ANAC/IATA e caixas médias.',
    color: '#10B981'
  },
  {
    id: 'cat-g',
    code: 'G',
    name: 'Grande · Mala Despachada',
    dimensions: '35 × 52 × 82 cm',
    maxWeightKg: 32,
    hourlyRate: 24.0,
    dailyRate: 74.0,
    weeklyRate: 370.0,
    description: 'Malas grandes até 32kg, carrinhos de bebê e caixas térmicas.',
    color: '#F59E0B'
  },
  {
    id: 'cat-esp',
    code: 'ESP',
    name: 'Especial · Pranchas & Instrumentos',
    dimensions: 'Até 220 × 60 × 40 cm',
    maxWeightKg: 45,
    hourlyRate: 32.0,
    dailyRate: 98.0,
    weeklyRate: 490.0,
    description: 'Sacos de golfe, pranchas de surf, instrumentos musicais e bikes.',
    color: '#8B5CF6'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Carlos Henrique Albuquerque',
    document: '284.912.448-12',
    email: 'carlos.albuquerque@novafrotas.com.br',
    phone: '(11) 98144-2201',
    city: 'São Paulo',
    state: 'SP',
    segment: 'VIP',
    totalSpent: 3840.0,
    reservationsCount: 14,
    firstVisitDate: '2025-04-12',
    lastVisitDate: '2026-10-04',
    npsScore: 10,
    notes: 'Executivo com trânsito frequente CGH / REC. Prefere locker superior.'
  },
  {
    id: 'CUST-002',
    name: 'Mariana Duarte Prado',
    document: '142.883.901-55',
    email: 'mariana.prado@arquiteturadp.com',
    phone: '(85) 99420-1188',
    city: 'Fortaleza',
    state: 'CE',
    segment: 'Recorrente',
    totalSpent: 1680.0,
    reservationsCount: 8,
    firstVisitDate: '2025-08-20',
    lastVisitDate: '2026-10-03',
    npsScore: 9,
    notes: 'Geralmente guarda 2 malas médias enquanto visita clientes em Fortaleza.'
  },
  {
    id: 'CUST-003',
    name: 'Roberto Valente Siqueira',
    document: '098.314.772-04',
    email: 'roberto.siqueira@agrovale.agr.br',
    phone: '(51) 99182-3341',
    city: 'Porto Alegre',
    state: 'RS',
    segment: 'Corporativo',
    totalSpent: 4290.0,
    reservationsCount: 16,
    firstVisitDate: '2025-02-10',
    lastVisitDate: '2026-10-05',
    npsScore: 10,
    notes: 'Conta faturada pela Agrovale Participações.'
  },
  {
    id: 'CUST-004',
    name: 'Patrícia Mendes Fontoura',
    document: '331.049.218-87',
    email: 'patricia.fontoura@gmail.com',
    phone: '(71) 98841-9032',
    city: 'Salvador',
    state: 'BA',
    segment: 'Recorrente',
    totalSpent: 890.0,
    reservationsCount: 4,
    firstVisitDate: '2026-03-14',
    lastVisitDate: '2026-10-02',
    npsScore: 9
  },
  {
    id: 'CUST-005',
    name: 'Juliana Beatriz Cavalcanti',
    document: '702.551.984-20',
    email: 'juliana.cavalcanti@nordestetour.com.br',
    phone: '(81) 99740-5512',
    city: 'Recife',
    state: 'PE',
    segment: 'VIP',
    totalSpent: 5120.0,
    reservationsCount: 22,
    firstVisitDate: '2025-01-18',
    lastVisitDate: '2026-10-05',
    npsScore: 10,
    notes: 'Guia e operadora de turismo VIP em Porto de Galinhas e Fernando de Noronha.'
  },
  {
    id: 'CUST-006',
    name: 'Fernando Augusto Becker',
    document: '029.418.550-93',
    email: 'fernando.becker@beckerconsulting.de',
    phone: '(11) 97201-9988',
    city: 'São Paulo',
    state: 'SP',
    segment: 'Corporativo',
    totalSpent: 2150.0,
    reservationsCount: 9,
    firstVisitDate: '2025-11-05',
    lastVisitDate: '2026-09-28',
    npsScore: 8
  },
  {
    id: 'CUST-007',
    name: 'Aline de Oliveira Ramos',
    document: '849.201.763-19',
    email: 'aline.ramos@advogadosas.com.br',
    phone: '(85) 98877-3321',
    city: 'Fortaleza',
    state: 'CE',
    segment: 'Novo',
    totalSpent: 104.0,
    reservationsCount: 1,
    firstVisitDate: '2026-10-05',
    lastVisitDate: '2026-10-05',
    npsScore: 9
  },
  {
    id: 'CUST-008',
    name: 'Guilherme Toledo Matarazzo',
    document: '115.892.408-01',
    email: 'gtmatarazzo@investcapital.com',
    phone: '(11) 99312-8800',
    city: 'São Paulo',
    state: 'SP',
    segment: 'VIP',
    totalSpent: 6400.0,
    reservationsCount: 28,
    firstVisitDate: '2024-09-10',
    lastVisitDate: '2026-10-05',
    npsScore: 10,
    notes: 'Cliente prioritário diretoria Stopcase.'
  },
  {
    id: 'CUST-009',
    name: 'Danielle Vasconcelos Rios',
    document: '940.112.504-62',
    email: 'danielle.rios@recifetech.io',
    phone: '(81) 99120-7744',
    city: 'Recife',
    state: 'PE',
    segment: 'Recorrente',
    totalSpent: 1240.0,
    reservationsCount: 6,
    firstVisitDate: '2026-02-14',
    lastVisitDate: '2026-10-01',
    npsScore: 9
  },
  {
    id: 'CUST-010',
    name: 'Lucas Pinho de Andrade',
    document: '519.803.115-40',
    email: 'lucas.pinho@surftripbrazil.com',
    phone: '(71) 99650-1288',
    city: 'Salvador',
    state: 'BA',
    segment: 'Recorrente',
    totalSpent: 1980.0,
    reservationsCount: 7,
    firstVisitDate: '2025-06-22',
    lastVisitDate: '2026-10-04',
    npsScore: 10,
    notes: 'Guarda capas triplas de pranchas de surf no Aeroporto de Salvador.'
  },
  {
    id: 'CUST-011',
    name: 'Beatriz Fagundes Schmidt',
    document: '612.904.380-71',
    email: 'beatriz.schmidt@sulvinos.com.br',
    phone: '(51) 98411-6620',
    city: 'Porto Alegre',
    state: 'RS',
    segment: 'Inativo',
    totalSpent: 520.0,
    reservationsCount: 3,
    firstVisitDate: '2025-03-10',
    lastVisitDate: '2026-05-18',
    npsScore: 8,
    notes: 'Sem reservas há mais de 130 dias. Contato recomendado.'
  },
  {
    id: 'CUST-012',
    name: 'Thiago Barreto Nogueira',
    document: '381.904.112-90',
    email: 'thiago.nogueira@cearalog.com.br',
    phone: '(85) 99180-4499',
    city: 'Fortaleza',
    state: 'CE',
    segment: 'Corporativo',
    totalSpent: 3100.0,
    reservationsCount: 11,
    firstVisitDate: '2025-07-04',
    lastVisitDate: '2026-10-05',
    npsScore: 9
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'SC-28419',
    customerId: 'CUST-001',
    customerName: 'Carlos Henrique Albuquerque',
    customerPhone: '(11) 98144-2201',
    unitId: 'CGH',
    startDate: '2026-10-05T07:15:00',
    expectedEndDate: '2026-10-05T19:30:00',
    category: 'M',
    quantity: 1,
    totalAmount: 52.00,
    discountAmount: 0.00,
    finalAmount: 52.00,
    paymentMethod: 'PIX',
    paymentStatus: 'paid',
    status: 'active',
    volumes: ['SC-VOL-008291'],
    flightNumber: 'G3 1408',
    airline: 'Gol',
    notes: 'Retirada no final da tarde antes do voo de retorno.',
    createdAt: '2026-10-05T07:10:00',
    createdBy: 'Lucas Vianna'
  },
  {
    id: 'SC-28420',
    customerId: 'CUST-002',
    customerName: 'Mariana Duarte Prado',
    customerPhone: '(85) 99420-1188',
    unitId: 'FOR',
    startDate: '2026-10-05T08:00:00',
    expectedEndDate: '2026-10-06T14:00:00',
    category: 'G',
    quantity: 2,
    totalAmount: 222.00,
    discountAmount: 22.00,
    finalAmount: 200.00,
    paymentMethod: 'Cartão Crédito',
    paymentStatus: 'paid',
    status: 'active',
    volumes: ['SC-VOL-008292', 'SC-VOL-008293'],
    flightNumber: 'LA 3390',
    airline: 'LATAM',
    notes: 'Duas malas grandes de tecido azul marinho.',
    createdAt: '2026-10-05T07:45:00',
    createdBy: 'Thais Nogueira'
  },
  {
    id: 'SC-28421',
    customerId: 'CUST-005',
    customerName: 'Juliana Beatriz Cavalcanti',
    customerPhone: '(81) 99740-5512',
    unitId: 'REC',
    startDate: '2026-10-05T09:30:00',
    expectedEndDate: '2026-10-07T18:00:00',
    category: 'G',
    quantity: 3,
    totalAmount: 444.00,
    discountAmount: 44.00,
    finalAmount: 400.00,
    paymentMethod: 'Faturado / Empresa',
    paymentStatus: 'paid',
    status: 'active',
    volumes: ['SC-VOL-008294', 'SC-VOL-008295', 'SC-VOL-008296'],
    flightNumber: 'AD 4099',
    airline: 'Azul',
    notes: 'Bagagens grupo VIP Noronha.',
    createdAt: '2026-10-05T09:15:00',
    createdBy: 'Rodrigo Maia'
  },
  {
    id: 'SC-28422',
    customerId: 'CUST-010',
    customerName: 'Lucas Pinho de Andrade',
    customerPhone: '(71) 99650-1288',
    unitId: 'SSA',
    startDate: '2026-10-05T10:00:00',
    expectedEndDate: '2026-10-08T12:00:00',
    category: 'ESP',
    quantity: 1,
    totalAmount: 294.00,
    discountAmount: 0.00,
    finalAmount: 294.00,
    paymentMethod: 'Cartão Crédito',
    paymentStatus: 'paid',
    status: 'active',
    volumes: ['SC-VOL-008297'],
    notes: 'Sarcófago de 3 pranchas (210cm). Localização Área Especial.',
    createdAt: '2026-10-05T09:50:00',
    createdBy: 'Vinicius Costa'
  },
  {
    id: 'SC-28423',
    customerId: 'CUST-003',
    customerName: 'Roberto Valente Siqueira',
    customerPhone: '(51) 99182-3341',
    unitId: 'POA',
    startDate: '2026-10-05T11:20:00',
    expectedEndDate: '2026-10-05T21:00:00',
    category: 'M',
    quantity: 1,
    totalAmount: 52.00,
    discountAmount: 0.00,
    finalAmount: 52.00,
    paymentMethod: 'Faturado / Empresa',
    paymentStatus: 'paid',
    status: 'active',
    volumes: ['SC-VOL-008298'],
    flightNumber: 'LA 3210',
    airline: 'LATAM',
    createdAt: '2026-10-05T11:15:00',
    createdBy: 'Carla Zanin'
  },
  {
    id: 'SC-28424',
    customerId: 'CUST-007',
    customerName: 'Aline de Oliveira Ramos',
    customerPhone: '(85) 98877-3321',
    unitId: 'FOR',
    startDate: '2026-10-05T12:00:00',
    expectedEndDate: '2026-10-05T20:00:00',
    category: 'P',
    quantity: 1,
    totalAmount: 38.00,
    discountAmount: 0.00,
    finalAmount: 38.00,
    paymentMethod: 'PIX',
    paymentStatus: 'paid',
    status: 'active',
    volumes: ['SC-VOL-008299'],
    createdAt: '2026-10-05T11:55:00',
    createdBy: 'Thais Nogueira'
  },
  {
    id: 'SC-28425',
    customerId: 'CUST-008',
    customerName: 'Guilherme Toledo Matarazzo',
    customerPhone: '(11) 99312-8800',
    unitId: 'CGH',
    startDate: '2026-10-05T14:30:00',
    expectedEndDate: '2026-10-06T18:00:00',
    category: 'G',
    quantity: 2,
    totalAmount: 222.00,
    discountAmount: 0.00,
    finalAmount: 222.00,
    paymentMethod: 'Cartão Crédito',
    paymentStatus: 'paid',
    status: 'confirmed',
    volumes: ['SC-VOL-008300', 'SC-VOL-008301'],
    notes: 'Reserva antecipada via web app. Chegada voo Curitiba.',
    createdAt: '2026-10-05T10:10:00',
    createdBy: 'Sistema Web'
  },
  {
    id: 'SC-28415',
    customerId: 'CUST-006',
    customerName: 'Fernando Augusto Becker',
    customerPhone: '(11) 97201-9988',
    unitId: 'CGH',
    startDate: '2026-10-04T08:00:00',
    expectedEndDate: '2026-10-04T22:00:00',
    actualEndDate: '2026-10-04T21:40:00',
    category: 'M',
    quantity: 1,
    totalAmount: 52.00,
    discountAmount: 0.00,
    finalAmount: 52.00,
    paymentMethod: 'Cartão Crédito',
    paymentStatus: 'paid',
    status: 'completed',
    volumes: ['SC-VOL-008280'],
    createdAt: '2026-10-04T07:50:00',
    createdBy: 'Lucas Vianna'
  }
];

export const INITIAL_VOLUMES: VolumeItem[] = [
  {
    id: 'SC-VOL-008291',
    reservationId: 'SC-28419',
    customerName: 'Carlos Henrique Albuquerque',
    unitId: 'CGH',
    category: 'M',
    description: 'Mala Samsonite grafite com rodinhas 360',
    color: '#4B5563',
    tagNumber: 'TAG-CGH-4491',
    locationArea: 'Área A',
    locationLocker: 'Armário 03',
    locationPosition: 'A03',
    checkInTime: '2026-10-05T07:18:22',
    expectedCheckOutTime: '2026-10-05T19:30:00',
    status: 'stored',
    operatorIn: 'Lucas Vianna',
    specialCare: 'Contém notebook e amostras comerciais',
    timeline: [
      {
        id: 'evt-1',
        timestamp: '2026-10-05T07:10:00',
        action: 'Reserva Confirmada',
        user: 'Lucas Vianna',
        unit: 'CGH',
        details: 'Reserva #SC-28419 registrada no sistema',
        type: 'creation'
      },
      {
        id: 'evt-2',
        timestamp: '2026-10-05T07:12:15',
        action: 'Pagamento Aprovado',
        user: 'Gateway PIX',
        unit: 'CGH',
        details: 'PIX R$ 52,00 confirmado com sucesso',
        type: 'payment'
      },
      {
        id: 'evt-3',
        timestamp: '2026-10-05T07:18:22',
        action: 'Entrada e Conferência',
        user: 'Lucas Vianna',
        unit: 'CGH',
        details: 'Etiqueta TAG-CGH-4491 impressa e conferida. Alocado no Armário 03 - Posição A03',
        type: 'checkin'
      }
    ]
  },
  {
    id: 'SC-VOL-008292',
    reservationId: 'SC-28420',
    customerName: 'Mariana Duarte Prado',
    unitId: 'FOR',
    category: 'G',
    description: 'Mala Delsey azul marinho rígida',
    color: '#1E3A8A',
    tagNumber: 'TAG-FOR-2101',
    locationArea: 'Área B',
    locationLocker: 'Armário 01',
    locationPosition: 'B01',
    checkInTime: '2026-10-05T08:05:10',
    expectedCheckOutTime: '2026-10-06T14:00:00',
    status: 'stored',
    operatorIn: 'Thais Nogueira',
    timeline: [
      {
        id: 'evt-4',
        timestamp: '2026-10-05T07:45:00',
        action: 'Reserva Registrada',
        user: 'Thais Nogueira',
        unit: 'FOR',
        details: 'Reserva #SC-28420 criada no balcão',
        type: 'creation'
      },
      {
        id: 'evt-5',
        timestamp: '2026-10-05T08:05:10',
        action: 'Entrada e Conferência',
        user: 'Thais Nogueira',
        unit: 'FOR',
        details: 'Volume registrado e alocado em B01',
        type: 'checkin'
      }
    ]
  },
  {
    id: 'SC-VOL-008293',
    reservationId: 'SC-28420',
    customerName: 'Mariana Duarte Prado',
    unitId: 'FOR',
    category: 'G',
    description: 'Mala Rimowa prata com fitas amarelas de identificação',
    color: '#9CA3AF',
    tagNumber: 'TAG-FOR-2102',
    locationArea: 'Área B',
    locationLocker: 'Armário 01',
    locationPosition: 'B02',
    checkInTime: '2026-10-05T08:06:40',
    expectedCheckOutTime: '2026-10-06T14:00:00',
    status: 'stored',
    operatorIn: 'Thais Nogueira',
    timeline: [
      {
        id: 'evt-6',
        timestamp: '2026-10-05T08:06:40',
        action: 'Entrada e Conferência',
        user: 'Thais Nogueira',
        unit: 'FOR',
        details: 'Volume alocado em B02',
        type: 'checkin'
      }
    ]
  },
  {
    id: 'SC-VOL-008294',
    reservationId: 'SC-28421',
    customerName: 'Juliana Beatriz Cavalcanti',
    unitId: 'REC',
    category: 'G',
    description: 'Mala Travelpro preta grande',
    color: '#111827',
    tagNumber: 'TAG-REC-3310',
    locationArea: 'Área A',
    locationLocker: 'Armário 05',
    locationPosition: 'A08',
    checkInTime: '2026-10-05T09:35:12',
    expectedCheckOutTime: '2026-10-07T18:00:00',
    status: 'stored',
    operatorIn: 'Rodrigo Maia',
    timeline: [
      {
        id: 'evt-7',
        timestamp: '2026-10-05T09:35:12',
        action: 'Entrada e Armazenamento',
        user: 'Rodrigo Maia',
        unit: 'REC',
        details: 'Entrada conferida no Piso Térreo Desembarque',
        type: 'checkin'
      }
    ]
  },
  {
    id: 'SC-VOL-008297',
    reservationId: 'SC-28422',
    customerName: 'Lucas Pinho de Andrade',
    unitId: 'SSA',
    category: 'ESP',
    description: 'Sarcófago Rip Curl triplo para pranchas',
    color: '#047857',
    tagNumber: 'TAG-SSA-1049',
    locationArea: 'Área Especial',
    locationLocker: 'Racks Pranchas 01',
    locationPosition: 'ESP-01',
    checkInTime: '2026-10-05T10:08:44',
    expectedCheckOutTime: '2026-10-08T12:00:00',
    status: 'stored',
    operatorIn: 'Vinicius Costa',
    specialCare: 'Item volumoso frágil. Manter na vertical no rack especial.',
    timeline: [
      {
        id: 'evt-8',
        timestamp: '2026-10-05T10:08:44',
        action: 'Entrada Especial Registrada',
        user: 'Vinicius Costa',
        unit: 'SSA',
        details: 'Alocado no rack vertical de pranchas',
        type: 'checkin'
      }
    ]
  },
  {
    id: 'SC-VOL-008280',
    reservationId: 'SC-28415',
    customerName: 'Fernando Augusto Becker',
    unitId: 'CGH',
    category: 'M',
    description: 'Mala executiva Victorinox preta',
    color: '#000000',
    tagNumber: 'TAG-CGH-4399',
    locationArea: 'Área A',
    locationLocker: 'Armário 02',
    locationPosition: 'A02',
    checkInTime: '2026-10-04T08:04:00',
    expectedCheckOutTime: '2026-10-04T22:00:00',
    actualCheckOutTime: '2026-10-04T21:40:15',
    status: 'retrieved',
    operatorIn: 'Lucas Vianna',
    operatorOut: 'Julio Cesar',
    timeline: [
      {
        id: 'evt-9',
        timestamp: '2026-10-04T08:04:00',
        action: 'Entrada Realizada',
        user: 'Lucas Vianna',
        unit: 'CGH',
        details: 'Entrada e lacre conferidos',
        type: 'checkin'
      },
      {
        id: 'evt-10',
        timestamp: '2026-10-04T21:40:15',
        action: 'Retirada Concluída',
        user: 'Julio Cesar',
        unit: 'CGH',
        details: 'Conferência de documento CPF e comprovante digital. Locker A02 liberado.',
        type: 'checkout'
      }
    ]
  }
];

export const INITIAL_OBJECTIVES: Objective[] = [
  {
    id: 'OBJ-001',
    title: 'Acelerar Faturamento e Expansão da Receita de Balcão e Web',
    description: 'Consolidar crescimento de receita em todas as 5 bases aeroportuárias através de reservas digitais antecipadas e parcerias.',
    area: 'Financeiro',
    owner: 'Guilherme Toledo (Diretor Executivo)',
    cycle: 'Q4 2026',
    progress: 74,
    status: 'on_track',
    keyResults: [
      {
        id: 'KR-001',
        objectiveId: 'OBJ-001',
        title: 'Atingir faturamento consolidado mensal de R$ 1.050.000',
        metricType: 'currency',
        initialValue: 840000,
        targetValue: 1050000,
        currentValue: 994950,
        unit: 'R$',
        deadline: '2026-12-31',
        owner: 'Juliana Costa (CFO)',
        progress: 74,
        status: 'on_track',
        realizations: [
          {
            id: 'real-1',
            date: '2026-10-01',
            addedValue: 245000,
            newValue: 245000,
            user: 'Juliana Costa',
            period: 'Semana 1 Outubro',
            notes: 'Fechamento parcial primeira semana com forte movimento feriado.'
          },
          {
            id: 'real-2',
            date: '2026-10-03',
            addedValue: 180000,
            newValue: 425000,
            user: 'Juliana Costa',
            period: 'Semana 1 Outubro',
            notes: 'Receitas corporativas faturadas Congonhas e Fortaleza.'
          },
          {
            id: 'real-3',
            date: '2026-10-05',
            addedValue: 569950,
            newValue: 994950,
            user: 'Juliana Costa',
            period: 'Mês Atual',
            notes: 'Consolidação de receitas de balcão e online de todas as bases.'
          }
        ],
        checkIns: [
          {
            id: 'chk-1',
            date: '2026-10-04',
            user: 'Juliana Costa',
            progressComment: 'Estamos a R$ 55.050 da meta mensal, faltando mais de 25 dias para fechar o mês.',
            blockers: 'Pequena lentidão na compensação de contratos corporativos no Sul.',
            nextSteps: 'Ativar campanhas de incentivo em Congonhas e Salvador.',
            confidence: 'Muito alta'
          }
        ]
      },
      {
        id: 'KR-002',
        objectiveId: 'OBJ-001',
        title: 'Elevar Ticket Médio consolidado para R$ 88,00',
        metricType: 'currency',
        initialValue: 76.50,
        targetValue: 88.00,
        currentValue: 84.20,
        unit: 'R$',
        deadline: '2026-11-30',
        owner: 'Thiago Nogueira (Gerente Comercial)',
        progress: 67,
        status: 'on_track',
        realizations: [
          {
            id: 'real-4',
            date: '2026-10-02',
            addedValue: 4.50,
            newValue: 81.00,
            user: 'Thiago Nogueira',
            period: 'Outubro',
            notes: 'Aumento na venda de upgrades para diária completa e seguro bagagem.'
          },
          {
            id: 'real-5',
            date: '2026-10-05',
            addedValue: 3.20,
            newValue: 84.20,
            user: 'Thiago Nogueira',
            period: 'Outubro',
            notes: 'Crescimento de volumes de categoria Grande em Recife e Congonhas.'
          }
        ],
        checkIns: [
          {
            id: 'chk-2',
            date: '2026-10-05',
            user: 'Thiago Nogueira',
            progressComment: 'Treinamento das equipes de balcão para oferta de período estendido gerou resultado imediato.',
            blockers: 'Nenhum impeditivo.',
            nextSteps: 'Padronizar script de vendas de acessórios de viagem no balcão.',
            confidence: 'Alta'
          }
        ]
      }
    ]
  },
  {
    id: 'OBJ-002',
    title: 'Excelência Operacional e Redução de Ocorrências',
    description: 'Garantir agilidade máxima no check-in/checkout e manter o índice de avarias ou extravios em zero.',
    area: 'Operacional',
    owner: 'Marcelo Araripe (Head de Operações)',
    cycle: 'Q4 2026',
    progress: 88,
    status: 'on_track',
    keyResults: [
      {
        id: 'KR-003',
        objectiveId: 'OBJ-002',
        title: 'Reduzir tempo médio de atendimento de entrada para menos de 90 segundos',
        metricType: 'number',
        initialValue: 145,
        targetValue: 90,
        currentValue: 98,
        unit: 'segundos',
        deadline: '2026-12-15',
        owner: 'Lucas Vianna (Coordenador Operação)',
        progress: 85,
        status: 'on_track',
        realizations: [
          {
            id: 'real-6',
            date: '2026-10-04',
            addedValue: 47,
            newValue: 98,
            user: 'Lucas Vianna',
            period: 'Semana 1 Outubro',
            notes: 'Novo leitor de código de barras 2D e pré-cadastro no totem reduziram tempo drasticamente.'
          }
        ],
        checkIns: [
          {
            id: 'chk-3',
            date: '2026-10-05',
            user: 'Lucas Vianna',
            progressComment: 'Operação fluindo com média abaixo de 100 segundos em Congonhas.',
            blockers: 'Necessário calibrar leitor da base de Salvador.',
            nextSteps: 'Treinamento com equipe de turno noturno.',
            confidence: 'Muito alta'
          }
        ]
      },
      {
        id: 'KR-004',
        objectiveId: 'OBJ-002',
        title: 'Manter taxa de ocupação média entre 78% e 85% sem gargalos',
        metricType: 'percentage',
        initialValue: 68,
        targetValue: 82,
        currentValue: 79.5,
        unit: '%',
        deadline: '2026-12-31',
        owner: 'Marcelo Araripe',
        progress: 82,
        status: 'on_track',
        realizations: [
          {
            id: 'real-7',
            date: '2026-10-05',
            addedValue: 11.5,
            newValue: 79.5,
            user: 'Marcelo Araripe',
            period: 'Outubro',
            notes: 'Ocupação média consolidada das 5 unidades no início de outubro.'
          }
        ],
        checkIns: [
          {
            id: 'chk-4',
            date: '2026-10-05',
            user: 'Marcelo Araripe',
            progressComment: 'Congonhas atingiu pico de 91% na sexta-feira. Ativamos remanejamento para área de pulmão.',
            blockers: 'Espaço físico em CGH opera no limite nos horários de pico (17h-20h).',
            nextSteps: 'Negociação com Aena/CCR para expansão de 20 armários em Congonhas.',
            confidence: 'Alta'
          }
        ]
      }
    ]
  },
  {
    id: 'OBJ-003',
    title: 'Expansão de Parcerias com Cias Aéreas e Hotéis',
    description: 'Firmar acordos de indicação com companhias aéreas para passageiros em conexões longas.',
    area: 'Comercial',
    owner: 'Renata Figueiredo (Diretora Comercial)',
    cycle: 'Q4 2026',
    progress: 60,
    status: 'at_risk',
    keyResults: [
      {
        id: 'KR-005',
        objectiveId: 'OBJ-003',
        title: 'Fechar 15 novos contratos com hotéis de aeroporto e operadoras',
        metricType: 'number',
        initialValue: 4,
        targetValue: 15,
        currentValue: 9,
        unit: 'contratos',
        deadline: '2026-11-30',
        owner: 'Renata Figueiredo',
        progress: 45,
        status: 'at_risk',
        realizations: [
          {
            id: 'real-8',
            date: '2026-10-02',
            addedValue: 2,
            newValue: 9,
            user: 'Renata Figueiredo',
            period: 'Outubro',
            notes: 'Parceria assinada com Ibis Congonhas e Rede Bristol Recife.'
          }
        ],
        checkIns: [
          {
            id: 'chk-5',
            date: '2026-10-04',
            user: 'Renata Figueiredo',
            progressComment: 'Temos 4 propostas em estágio de assinatura com rede Atlantica e CVC.',
            blockers: 'Demora na aprovação jurídica das comissões corporativas.',
            nextSteps: 'Agilizar minuta padrão de parceria comercial.',
            confidence: 'Média'
          }
        ]
      }
    ]
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'LEAD-101',
    companyName: 'LATAM Airlines Brasil',
    contactName: 'Fernanda Peixoto (Gerente de Atendimento ao Passageiro)',
    email: 'fernanda.peixoto@latam.com',
    phone: '(11) 98711-4090',
    stage: 'negotiation',
    potentialValue: 185000,
    airportUnit: 'CGH',
    segment: 'Companhia Aérea',
    owner: 'Renata Figueiredo',
    daysInStage: 4,
    lastContact: '2026-10-03',
    nextFollowUp: '2026-10-06',
    notes: 'Contrato corporativo para vouchers de passageiros com conexões acima de 6 horas.'
  },
  {
    id: 'LEAD-102',
    companyName: 'Hotel Ibis São Paulo Congonhas',
    contactName: 'Marcio Fontes (Diretor Geral)',
    email: 'mfontes@accor.com.br',
    phone: '(11) 99120-4411',
    stage: 'proposal',
    potentialValue: 42000,
    airportUnit: 'CGH',
    segment: 'Hotel de Trânsito',
    owner: 'Renata Figueiredo',
    daysInStage: 2,
    lastContact: '2026-10-04',
    nextFollowUp: '2026-10-07',
    notes: 'Integração de balcão compartilhado e cupom 15% para hóspedes early check-in.'
  },
  {
    id: 'LEAD-103',
    companyName: 'CVC Viagens & Turismo Nordeste',
    contactName: 'Andréa Vasconcelos',
    email: 'andrea.vasconcelos@cvc.com.br',
    phone: '(81) 98833-2100',
    stage: 'meeting',
    potentialValue: 68000,
    airportUnit: 'REC',
    segment: 'Agência de Turismo',
    owner: 'Camila Vasconcelos',
    daysInStage: 6,
    lastContact: '2026-09-29',
    nextFollowUp: '2026-10-06',
    notes: 'Reunião de alinhamento com receptivos de Porto de Galinhas e Maragogi.'
  },
  {
    id: 'LEAD-104',
    companyName: 'Azul Linhas Aéreas · Conexões Recife',
    contactName: 'Rodrigo Sampaio',
    email: 'rodrigo.sampaio@voeazul.com.br',
    phone: '(81) 99710-8800',
    stage: 'qualified',
    potentialValue: 95000,
    airportUnit: 'REC',
    segment: 'Companhia Aérea',
    owner: 'Camila Vasconcelos',
    daysInStage: 3,
    lastContact: '2026-10-02',
    nextFollowUp: '2026-10-08',
    notes: 'Hub Recife da Azul tem mais de 2.000 passageiros de conexão/dia.'
  },
  {
    id: 'LEAD-105',
    companyName: 'Decolar.com · Parcerias Aeroportuárias',
    contactName: 'Bruno Alencar',
    email: 'balencar@despegar.com',
    phone: '(11) 97720-3300',
    stage: 'lead',
    potentialValue: 120000,
    airportUnit: 'FOR',
    segment: 'Agência de Turismo',
    owner: 'Marcelo Araripe',
    daysInStage: 1,
    lastContact: '2026-10-05',
    nextFollowUp: '2026-10-09',
    notes: 'Inbound lead interessado em cross-selling de bagagem no checkout do app.'
  }
];

export const INITIAL_FOLLOWUPS: FollowUpItem[] = [
  {
    id: 'FLW-01',
    leadId: 'LEAD-101',
    companyName: 'LATAM Airlines Brasil',
    contactName: 'Fernanda Peixoto',
    responsible: 'Renata Figueiredo',
    dueDate: '2026-10-06',
    channel: 'Reunião Presencial',
    lastTouch: '2026-10-03',
    nextAction: 'Apresentar minuta do convênio corporativo no escritório CGH',
    status: 'pending',
    notes: 'Enviar resumo prévio por WhatsApp antes da reunião.'
  },
  {
    id: 'FLW-02',
    leadId: 'LEAD-103',
    companyName: 'CVC Viagens & Turismo Nordeste',
    contactName: 'Andréa Vasconcelos',
    responsible: 'Camila Vasconcelos',
    dueDate: '2026-10-05',
    channel: 'WhatsApp',
    lastTouch: '2026-09-29',
    nextAction: 'Cobrar retorno sobre comissão de 12% nas reservas receptivo',
    status: 'overdue',
    notes: 'Aguardando validação da gerência regional CVC.'
  },
  {
    id: 'FLW-03',
    leadId: 'LEAD-102',
    companyName: 'Hotel Ibis Congonhas',
    contactName: 'Marcio Fontes',
    responsible: 'Renata Figueiredo',
    dueDate: '2026-10-07',
    channel: 'Telefone',
    lastTouch: '2026-10-04',
    nextAction: 'Confirmar agendamento de teste de cartazes com QR Code no lobby',
    status: 'pending',
    notes: 'Aprovação de design com branding Stopcase + Ibis.'
  }
];

export const INITIAL_PROPOSALS: Proposal[] = [
  {
    id: 'PROP-2026-041',
    proposalNumber: 'PROP-041/26',
    clientName: 'Fernanda Peixoto',
    companyName: 'LATAM Airlines Brasil',
    value: 185000.00,
    createdAt: '2026-09-25',
    expiresAt: '2026-10-25',
    responsible: 'Renata Figueiredo',
    servicesDescription: 'Pacote corporativo com franquia de 1.800 diárias/mês em Congonhas e Fortaleza com faturamento quinzenal.',
    status: 'negotiation'
  },
  {
    id: 'PROP-2026-042',
    proposalNumber: 'PROP-042/26',
    clientName: 'Marcio Fontes',
    companyName: 'Hotel Ibis São Paulo Congonhas',
    value: 42000.00,
    createdAt: '2026-10-02',
    expiresAt: '2026-11-02',
    responsible: 'Renata Figueiredo',
    servicesDescription: 'Parceria de guarda de bagagens para hóspedes pré-checkin e pós-checkout com comissão de 10%.',
    status: 'sent'
  },
  {
    id: 'PROP-2026-040',
    proposalNumber: 'PROP-040/26',
    clientName: 'Carlos Mendonça',
    companyName: 'VoePass Linhas Aéreas',
    value: 28000.00,
    createdAt: '2026-09-10',
    expiresAt: '2026-10-10',
    responsible: 'Renata Figueiredo',
    servicesDescription: 'Armazenamento de bagagens extraviadas e pendências de conexões regionais.',
    status: 'accepted'
  }
];

export const INITIAL_PARTNERS: CommercialPartner[] = [
  {
    id: 'PART-01',
    partnerName: 'Aena Brasil (Aeroporto de Congonhas e Recife)',
    type: 'Operador Aeroportuário',
    contactPerson: 'Rodrigo Medeiros',
    phone: '(11) 5090-9000',
    unitId: 'CGH',
    commissionPercentage: 14.5,
    revenueGeneratedTotal: 1840000.00,
    clientsReferredTotal: 22400,
    status: 'active',
    contractEnd: '2029-12-31'
  },
  {
    id: 'PART-02',
    partnerName: 'Fraport Brasil (Fortaleza e Porto Alegre)',
    type: 'Operador Aeroportuário',
    contactPerson: 'Helena Werneck',
    phone: '(85) 3392-1000',
    unitId: 'FOR',
    commissionPercentage: 15.0,
    revenueGeneratedTotal: 1420000.00,
    clientsReferredTotal: 17800,
    status: 'active',
    contractEnd: '2028-06-30'
  },
  {
    id: 'PART-03',
    partnerName: 'VINCI Airports (Salvador Bahia)',
    type: 'Operador Aeroportuário',
    contactPerson: 'Gustavo Paiva',
    phone: '(71) 3204-1000',
    unitId: 'SSA',
    commissionPercentage: 14.0,
    revenueGeneratedTotal: 790000.00,
    clientsReferredTotal: 9600,
    status: 'active',
    contractEnd: '2027-11-30'
  },
  {
    id: 'PART-04',
    partnerName: 'Hotel Gran Marquise Fortaleza',
    type: 'Hotel',
    contactPerson: 'Clara Meirelles',
    phone: '(85) 4006-5000',
    unitId: 'FOR',
    commissionPercentage: 10.0,
    revenueGeneratedTotal: 68400.00,
    clientsReferredTotal: 940,
    status: 'active',
    contractEnd: '2027-03-31'
  }
];

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: 'TRX-1001',
    type: 'receita',
    category: 'Balcão e Web',
    costCenter: 'Unidades',
    unitId: 'CGH',
    description: 'Receita diária de balcão e totens Congonhas',
    value: 14280.00,
    dueDate: '2026-10-05',
    paymentDate: '2026-10-05',
    status: 'recebido',
    clientOrSupplier: 'Diversos Clientes',
    paymentMethod: 'Cartão Crédito / PIX'
  },
  {
    id: 'TRX-1002',
    type: 'receita',
    category: 'Balcão e Web',
    costCenter: 'Unidades',
    unitId: 'FOR',
    description: 'Receita diária de balcão Pinto Martins Fortaleza',
    value: 8490.00,
    dueDate: '2026-10-05',
    paymentDate: '2026-10-05',
    status: 'recebido',
    clientOrSupplier: 'Diversos Clientes',
    paymentMethod: 'Cartão / PIX'
  },
  {
    id: 'TRX-1003',
    type: 'despesa',
    category: 'Concessão Aeroportuária',
    costCenter: 'Concessão Aeroporto',
    unitId: 'CGH',
    description: 'Aluguel do espaço comercial e taxa de condomínio Aena CGH',
    value: 48500.00,
    dueDate: '2026-10-10',
    status: 'em_aberto',
    clientOrSupplier: 'Aena Brasil S.A.',
    paymentMethod: 'Boleto Bancário',
    isRecurrent: true
  },
  {
    id: 'TRX-1004',
    type: 'despesa',
    category: 'Concessão Aeroportuária',
    costCenter: 'Concessão Aeroporto',
    unitId: 'FOR',
    description: 'Aluguel do espaço comercial Fraport Brasil Fortaleza',
    value: 32000.00,
    dueDate: '2026-10-10',
    status: 'em_aberto',
    clientOrSupplier: 'Fraport Brasil S.A.',
    paymentMethod: 'Boleto Bancário',
    isRecurrent: true
  },
  {
    id: 'TRX-1005',
    type: 'despesa',
    category: 'Tecnologia & Link',
    costCenter: 'Tecnologia',
    unitId: 'CGH',
    description: 'Link dedicado redundante fibra óptica aeroporto',
    value: 2890.00,
    dueDate: '2026-10-08',
    status: 'em_aberto',
    clientOrSupplier: 'Embratel / Claro S.A.',
    paymentMethod: 'Débito Automático',
    isRecurrent: true
  },
  {
    id: 'TRX-1006',
    type: 'receita',
    category: 'Contratos Corporativos',
    costCenter: 'Comercial',
    unitId: 'CGH',
    description: 'Fatura quinzenal passageiros em trânsito',
    value: 42000.00,
    dueDate: '2026-10-04',
    status: 'vencido',
    clientOrSupplier: 'Operadora Global Trânsito S.A.',
    paymentMethod: 'Faturamento 15DD'
  },
  {
    id: 'TRX-1007',
    type: 'despesa',
    category: 'Suprimentos & Etiquetas',
    costCenter: 'Operação',
    unitId: 'FOR',
    description: 'Bobinas térmicas adesivas e lacres de segurança invioláveis (20.000 un)',
    value: 4620.00,
    dueDate: '2026-10-02',
    paymentDate: '2026-10-02',
    status: 'pago',
    clientOrSupplier: 'PrintLabel Soluções Térmicas Ltda',
    paymentMethod: 'PIX'
  }
];

export const INITIAL_STAFF: TeamMember[] = [
  {
    id: 'STAFF-01',
    name: 'Guilherme Toledo',
    role: 'Diretor Executivo / CEO',
    email: 'guilherme.toledo@stopcase.com.br',
    phone: '(11) 99111-0001',
    unitId: 'CGH',
    profile: 'diretor',
    status: 'ativo',
    joinDate: '2022-01-10',
    manager: 'Conselho de Administração',
    shiftHours: '08:00 às 18:00',
    dailyOperationsCount: 0,
    averageServiceMinutes: 0,
    completedTasksCount: 42
  },
  {
    id: 'STAFF-02',
    name: 'Marcelo Araripe',
    role: 'Gerente Geral de Operações',
    email: 'marcelo.araripe@stopcase.com.br',
    phone: '(85) 99222-0002',
    unitId: 'FOR',
    profile: 'gestor',
    status: 'em_turno',
    joinDate: '2022-06-15',
    manager: 'Guilherme Toledo',
    shiftHours: '07:00 às 16:00',
    dailyOperationsCount: 18,
    averageServiceMinutes: 1.8,
    completedTasksCount: 35
  },
  {
    id: 'STAFF-03',
    name: 'Lucas Vianna',
    role: 'Supervisor de Operações Congonhas',
    email: 'lucas.vianna@stopcase.com.br',
    phone: '(11) 98333-0003',
    unitId: 'CGH',
    profile: 'operacional',
    status: 'em_turno',
    joinDate: '2023-03-01',
    manager: 'Marcelo Araripe',
    shiftHours: '06:00 às 14:30',
    dailyOperationsCount: 44,
    averageServiceMinutes: 1.4,
    completedTasksCount: 29
  },
  {
    id: 'STAFF-04',
    name: 'Thais Nogueira',
    role: 'Atendente Líder Fortaleza',
    email: 'thais.nogueira@stopcase.com.br',
    phone: '(85) 99444-0004',
    unitId: 'FOR',
    profile: 'atendimento',
    status: 'em_turno',
    joinDate: '2023-08-10',
    manager: 'Marcelo Araripe',
    shiftHours: '07:00 às 15:30',
    dailyOperationsCount: 32,
    averageServiceMinutes: 1.6,
    completedTasksCount: 22
  },
  {
    id: 'STAFF-05',
    name: 'Juliana Costa',
    role: 'Gerente Financeira / Controller',
    email: 'juliana.costa@stopcase.com.br',
    phone: '(11) 98555-0005',
    unitId: 'CGH',
    profile: 'financeiro',
    status: 'ativo',
    joinDate: '2022-04-18',
    manager: 'Guilherme Toledo',
    shiftHours: '09:00 às 18:30',
    dailyOperationsCount: 0,
    averageServiceMinutes: 0,
    completedTasksCount: 38
  },
  {
    id: 'STAFF-06',
    name: 'Renata Figueiredo',
    role: 'Diretora Comercial & Parcerias',
    email: 'renata.figueiredo@stopcase.com.br',
    phone: '(11) 98666-0006',
    unitId: 'CGH',
    profile: 'comercial',
    status: 'ativo',
    joinDate: '2022-09-01',
    manager: 'Guilherme Toledo',
    shiftHours: '08:30 às 18:00',
    dailyOperationsCount: 0,
    averageServiceMinutes: 0,
    completedTasksCount: 31
  },
  {
    id: 'STAFF-07',
    name: 'Rodrigo Maia',
    role: 'Operador de Balcão Recife',
    email: 'rodrigo.maia@stopcase.com.br',
    phone: '(81) 99777-0007',
    unitId: 'REC',
    profile: 'operacional',
    status: 'em_turno',
    joinDate: '2024-01-15',
    manager: 'Camila Vasconcelos',
    shiftHours: '08:00 às 16:30',
    dailyOperationsCount: 28,
    averageServiceMinutes: 1.5,
    completedTasksCount: 19
  },
  {
    id: 'STAFF-08',
    name: 'Vinicius Costa',
    role: 'Operador de Balcão Salvador',
    email: 'vinicius.costa@stopcase.com.br',
    phone: '(71) 99888-0008',
    unitId: 'SSA',
    profile: 'operacional',
    status: 'em_turno',
    joinDate: '2024-02-20',
    manager: 'Antônio Prado',
    shiftHours: '07:30 às 16:00',
    dailyOperationsCount: 22,
    averageServiceMinutes: 1.7,
    completedTasksCount: 16
  }
];

export const INITIAL_OCCURRENCES: IncidentOccurrence[] = [
  {
    id: 'OC-001',
    protocol: 'OC-2026-0891',
    date: '2026-10-05',
    time: '08:24',
    unitId: 'CGH',
    category: 'Volume / Bagagem',
    priority: 'Alta',
    customerName: 'Carlos Henrique Albuquerque',
    volumeId: 'SC-VOL-008291',
    reportedBy: 'Lucas Vianna',
    assignedTo: 'Marcelo Araripe',
    title: 'Avaria prévia registrada no ato do check-in (Zíper lateral rompido)',
    description: 'Cliente informou que o zíper lateral da mala já se encontrava rompido antes do desembarque do voo Gol. Foi fotografado no balcão e assinado termo de ressalva.',
    correctiveAction: 'Lacre de segurança inviolável aplicado sobre o compartimento aberto. Cliente ciente.',
    status: 'Resolvida',
    resolutionDays: 0
  },
  {
    id: 'OC-002',
    protocol: 'OC-2026-0892',
    date: '2026-10-04',
    time: '18:50',
    unitId: 'FOR',
    category: 'Operação',
    priority: 'Média',
    customerName: 'Juliana Castro Lima',
    reportedBy: 'Thais Nogueira',
    assignedTo: 'Thais Nogueira',
    title: 'Bagagem com permanência superior a 48 horas além da previsão inicial',
    description: 'Cliente teve voo cancelado por motivo meteorológico e estendeu permanência da bagagem. Pagamento da diferença feito via link PIX.',
    correctiveAction: 'Reserva atualizada com diárias adicionais e recalculada.',
    status: 'Resolvida',
    resolutionDays: 1
  },
  {
    id: 'OC-003',
    protocol: 'OC-2026-0893',
    date: '2026-10-05',
    time: '11:10',
    unitId: 'REC',
    category: 'Equipamento',
    priority: 'Alta',
    reportedBy: 'Rodrigo Maia',
    assignedTo: 'TI & Manutenção',
    title: 'Impressora térmica de etiquetas do guichê 2 com travamento de rolo',
    description: 'A impressora Zebra ZD220 apresentou erro intermitente de tração de papel térmico. Guichê 1 operando normalmente.',
    correctiveAction: 'Chamado técnico aberto com fornecedor PrintLabel. Previsão de substituição hoje até 17h.',
    status: 'Em Resolução'
  },
  {
    id: 'OC-004',
    protocol: 'OC-2026-0894',
    date: '2026-10-05',
    time: '12:00',
    unitId: 'CGH',
    category: 'Segurança',
    priority: 'Crítica',
    customerName: 'Passageiro Não Identificado',
    reportedBy: 'Lucas Vianna',
    assignedTo: 'Marcelo Araripe',
    title: 'Tentativa de depósito de recipiente contendo líquido inflamável',
    description: 'Durante inspeção visual no balcão, foi detectado galão de fluido para isqueiro. Conforme regulamento da ANAC e normas do aeroporto, o item foi recusado.',
    correctiveAction: 'Passageiro orientado a descartar em ponto de coleta aeroportuário. Item não aceito.',
    status: 'Resolvida',
    resolutionDays: 0
  }
];

export const INITIAL_ASSETS: AssetEquipment[] = [
  {
    id: 'AST-001',
    assetCode: 'EQ-CGH-01',
    name: 'Leitor Barcode & QR Code 2D Honeywell Voyager',
    category: 'Leitor Barcode',
    unitId: 'CGH',
    responsible: 'Lucas Vianna',
    purchaseDate: '2024-03-10',
    warrantyEnd: '2027-03-10',
    value: 1250.00,
    status: 'Operacional',
    nextMaintenanceDate: '2026-12-15'
  },
  {
    id: 'AST-002',
    assetCode: 'EQ-CGH-02',
    name: 'Impressora Térmica Zebra ZD220 (Guichê 1)',
    category: 'Impressora Térmica',
    unitId: 'CGH',
    responsible: 'Lucas Vianna',
    purchaseDate: '2023-11-20',
    warrantyEnd: '2026-11-20',
    value: 2100.00,
    status: 'Operacional',
    nextMaintenanceDate: '2026-11-10'
  },
  {
    id: 'AST-003',
    assetCode: 'EQ-FOR-01',
    name: 'Balança Digital de Chão Toledo 150kg com Rampa',
    category: 'Balança Digital',
    unitId: 'FOR',
    responsible: 'Thais Nogueira',
    purchaseDate: '2023-05-14',
    warrantyEnd: '2028-05-14',
    value: 4800.00,
    status: 'Operacional',
    nextMaintenanceDate: '2026-10-20'
  },
  {
    id: 'AST-004',
    assetCode: 'EQ-REC-02',
    name: 'Impressora Térmica Zebra ZD220 (Guichê 2)',
    category: 'Impressora Térmica',
    unitId: 'REC',
    responsible: 'Rodrigo Maia',
    purchaseDate: '2024-01-18',
    warrantyEnd: '2027-01-18',
    value: 2100.00,
    status: 'Em Manutenção',
    nextMaintenanceDate: '2026-10-05'
  }
];

export const INITIAL_SOPS: SOPDocument[] = [
  {
    id: 'SOP-001',
    code: 'SOP-OPS-001',
    title: 'Procedimento Operacional Padrão: Entrada e Conferência de Volume',
    area: 'Operação',
    version: 'v3.2',
    author: 'Marcelo Araripe',
    updatedAt: '2026-09-15',
    stepsCount: 6,
    tags: ['Check-in', 'Segurança', 'Etiqueta', 'ANAC'],
    summary: 'Roteiro obrigatório para recepção, conferência visual de avarias, etiquetagem e alocação de volumes no balcão.',
    steps: [
      {
        stepNumber: 1,
        title: 'Verificação da Reserva ou Criação Balcão',
        instruction: 'Solicitar documento com foto ou QR Code da reserva digital. Confirmar dados cadastrais.'
      },
      {
        stepNumber: 2,
        title: 'Inspeção Visual e Classificação',
        instruction: 'Verificar dimensões e pesar se necessário. Identificar avarias prévias (zíper, tecido rasgado, rodinhas). Fotografar em caso de avaria.'
      },
      {
        stepNumber: 3,
        title: 'Pesquisa de Itens Proibidos (ANAC)',
        instruction: 'Perguntar ao cliente se há baterias soltas de lítio, gases, explosivos ou produtos perigosos.'
      },
      {
        stepNumber: 4,
        title: 'Etiquetagem Dupla com Lacre',
        instruction: 'Imprimir duas etiquetas térmicas. Fixar a etiqueta principal na alça do volume e entregar o canhoto/cartão digital ao passageiro.'
      },
      {
        stepNumber: 5,
        title: 'Alocação no Sistema e Posicionamento Físico',
        instruction: 'Inserir no STOPCASE OS o número do Armário e Posição (ex: A03). Transportar para a vaga correspondente.'
      },
      {
        stepNumber: 6,
        title: 'Confirmação e Pagamento',
        instruction: 'Emitir comprovante fiscal ou registrar pagamento no sistema.'
      }
    ]
  },
  {
    id: 'SOP-002',
    code: 'SOP-OPS-002',
    title: 'Procedimento Padrão: Retirada de Volume e Liberação de Armário',
    area: 'Operação',
    version: 'v2.4',
    author: 'Marcelo Araripe',
    updatedAt: '2026-08-20',
    stepsCount: 5,
    tags: ['Check-out', 'Conferência', 'Caixa'],
    summary: 'Protocolo de segurança para validação do passageiro, conferência de lacre e baixa no inventário.',
    steps: [
      {
        stepNumber: 1,
        title: 'Identificação e Canhoto',
        instruction: 'Exigir apresentação do comprovante impresso ou QR Code do app + documento de identificação oficial.'
      },
      {
        stepNumber: 2,
        title: 'Localização do Volume no Sistema',
        instruction: 'Digitar o código da reserva ou escanear comprovante para identificar armário e posição exata.'
      },
      {
        stepNumber: 3,
        title: 'Verificação de Diárias Excedentes',
        instruction: 'Caso a retirada ultrapasse o período contratado, o sistema calculará a diferença automaticamente para cobrança antes da entrega.'
      },
      {
        stepNumber: 4,
        title: 'Conferência Física do Lacre na Frente do Cliente',
        instruction: 'Mostrar ao cliente que o lacre numerado se encontra intacto. Cortar o lacre apenas após confirmação do passageiro.'
      },
      {
        stepNumber: 5,
        title: 'Baixa no STOPCASE OS',
        instruction: 'Registrar a retirada no sistema. A posição do armário voltará imediatamente ao status Disponível.'
      }
    ]
  },
  {
    id: 'SOP-003',
    code: 'SOP-CS-001',
    title: 'Script de Atendimento: Cliente com Conexão Longa e Dúvidas de Guarda',
    area: 'Atendimento',
    version: 'v1.8',
    author: 'Renata Figueiredo',
    updatedAt: '2026-09-01',
    stepsCount: 4,
    tags: ['Script', 'Vendas', 'Balcão'],
    summary: 'Script humanizado e ágil para converter passageiros indecisos que estão aguardando conexões longas no aeroporto.',
    steps: [
      {
        stepNumber: 1,
        title: 'Abordagem Amigável',
        instruction: '"Olá! Bom dia/boa tarde! Vai aproveitar a cidade durante a sua conexão? Podemos guardar sua bagagem com total segurança para você circular livremente."'
      },
      {
        stepNumber: 2,
        title: 'Apresentação de Valores Claros',
        instruction: '"Temos tarifas por período ou diária completa. Para a sua mala média, a diária completa é apenas R$ 52, com armário lacrado, monitoramento 24h e seguro incluso."'
      },
      {
        stepNumber: 3,
        title: 'Agilidade no Processo',
        instruction: '"O processo leva menos de 1 minuto. Basta seu documento e o pagamento pode ser feito via PIX ou cartão."'
      },
      {
        stepNumber: 4,
        title: 'Encerramento Convidativo',
        instruction: '"Desejamos um excelente passeio! Estaremos aqui até o momento do seu embarque."'
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-10-05T12:02:18',
    user: 'Marcelo Araripe',
    role: 'Gestor Geral',
    module: 'Metas & OKR',
    action: 'Registrar Realização KR-004',
    resourceId: 'KR-004',
    beforeState: 'Ocupação 78.0%',
    afterState: 'Ocupação 79.5%',
    ipAddress: '187.19.204.12',
    device: 'Chrome / MacOS (Fortaleza)',
    status: 'Sucesso'
  },
  {
    id: 'AUD-902',
    timestamp: '2026-10-05T11:55:04',
    user: 'Thais Nogueira',
    role: 'Atendente Líder',
    module: 'Reservas',
    action: 'Criação de Reserva #SC-28424',
    resourceId: 'SC-28424',
    afterState: 'Status: Ativa, Valor: R$ 38,00',
    ipAddress: '177.132.88.90',
    device: 'Tablet Balcão Guichê 1 (FOR)',
    status: 'Sucesso'
  },
  {
    id: 'AUD-903',
    timestamp: '2026-10-05T11:15:30',
    user: 'Juliana Costa',
    role: 'Gerente Financeira',
    module: 'Financeiro',
    action: 'Baixa de Faturamento Corporativo #TRX-1002',
    resourceId: 'TRX-1002',
    beforeState: 'Status: Em Aberto',
    afterState: 'Status: Recebido (R$ 8.490,00)',
    ipAddress: '201.86.110.45',
    device: 'Chrome / Windows (Sede SP)',
    status: 'Sucesso'
  },
  {
    id: 'AUD-904',
    timestamp: '2026-10-05T10:08:44',
    user: 'Vinicius Costa',
    role: 'Operador de Balcão',
    module: 'Volumes',
    action: 'Check-in Volume SC-VOL-008297',
    resourceId: 'SC-VOL-008297',
    afterState: 'Status: Armazenado em ESP-01',
    ipAddress: '189.102.40.71',
    device: 'Totem Balcão (SSA)',
    status: 'Sucesso'
  },
  {
    id: 'AUD-905',
    timestamp: '2026-10-05T09:40:12',
    user: 'Lucas Vianna',
    role: 'Operador de Balcão',
    module: 'Operação',
    action: 'Abertura de Ocorrência OC-2026-0894',
    resourceId: 'OC-2026-0894',
    afterState: 'Status: Resolvida (Item proibido recusado)',
    ipAddress: '177.200.12.98',
    device: 'Guichê Central (CGH)',
    status: 'Sucesso'
  }
];

export const INITIAL_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'Ocupação Crítica em Congonhas',
    message: 'A unidade de Congonhas (CGH) atingiu 91,5% de ocupação (238 de 260 posições ocupadas). Remanejamento para área pulmão recomendado.',
    timestamp: 'Há 12 minutos',
    category: 'Operação',
    severity: 'warning',
    read: false,
    link: '/operation'
  },
  {
    id: 'NOTIF-02',
    title: 'Meta Mensal de Faturamento atingiu 94,7%',
    message: 'O faturamento consolidado de Outubro atingiu R$ 994.950, restando R$ 55.050 para o cumprimento antecipado do KR-001.',
    timestamp: 'Há 45 minutos',
    category: 'Metas',
    severity: 'success',
    read: false,
    link: '/strategy'
  },
  {
    id: 'NOTIF-03',
    title: 'Fatura Corporativa Vencida',
    message: 'A fatura TRX-1006 no valor de R$ 42.000,00 da Operadora Global Trânsito venceu ontem (04/10).',
    timestamp: 'Há 2 horas',
    category: 'Financeiro',
    severity: 'critical',
    read: false,
    link: '/finance'
  },
  {
    id: 'NOTIF-04',
    title: 'Follow-up Comercial Atrasado',
    message: 'O follow-up com Andréa Vasconcelos (CVC Viagens) na base de Recife está pendente desde 29/09.',
    timestamp: 'Há 3 horas',
    category: 'Comercial',
    severity: 'warning',
    read: true,
    link: '/commercial'
  }
];
