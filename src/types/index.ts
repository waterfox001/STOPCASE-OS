export type UserProfile = 'diretor' | 'gestor' | 'financeiro' | 'comercial' | 'operacional' | 'atendimento' | 'auditor';

export type SystemMode = 'standard' | 'executive' | 'operational' | 'presentation';

export type AirportUnitId = 'all' | 'FOR' | 'CGH' | 'POA' | 'REC' | 'SSA';

export type DatePeriod = 'today' | 'yesterday' | '7d' | 'month' | 'prev_month' | 'quarter' | 'year';

export interface AirportUnit {
  id: string; // e.g. 'FOR'
  name: string; // 'Fortaleza - Pinto Martins'
  shortName: string; // 'Fortaleza'
  airportCode: string; // 'FOR'
  terminal: string; // 'Terminal 1 - Piso Térreo'
  address: string;
  openingHours: string;
  manager: string;
  phone: string;
  capacityTotal: number;
  capacityOccupied: number;
  capacityReserved: number;
  capacityMaintenance: number;
  activeStaffCount: number;
  monthlyRevenue: number;
  monthlyTarget: number;
  ticketAverage: number;
  status: 'operational' | 'busy' | 'alert' | 'closed';
  openTimeToday?: string;
  cashBalance: number;
}

export interface LuggageCategory {
  id: string;
  name: string; // 'Pequeno / Mochila', 'Médio / Mala Bordo', 'Grande / Mala Despachada', 'Especial / Prancha'
  code: 'P' | 'M' | 'G' | 'ESP';
  dimensions: string;
  maxWeightKg: number;
  hourlyRate: number;
  dailyRate: number;
  weeklyRate: number;
  description: string;
  color: string;
}

export interface Customer {
  id: string;
  name: string;
  document: string; // CPF or Passport
  email: string;
  phone: string;
  city: string;
  state: string;
  segment: 'Novo' | 'Recorrente' | 'VIP' | 'Corporativo' | 'Inativo';
  totalSpent: number;
  reservationsCount: number;
  firstVisitDate: string;
  lastVisitDate: string;
  npsScore?: number;
  notes?: string;
  avatarUrl?: string;
}

export interface VolumeItem {
  id: string; // 'SC-VOL-008291'
  reservationId: string;
  customerName: string;
  unitId: string;
  category: 'P' | 'M' | 'G' | 'ESP';
  description: string;
  color: string;
  tagNumber: string;
  locationArea: string; // 'Área A'
  locationLocker: string; // 'Armário 03'
  locationPosition: string; // 'A04'
  checkInTime: string;
  expectedCheckOutTime: string;
  actualCheckOutTime?: string;
  status: 'stored' | 'retrieved' | 'awaiting_arrival' | 'in_transit' | 'damaged';
  operatorIn: string;
  operatorOut?: string;
  specialCare?: string;
  timeline: VolumeTimelineEvent[];
}

export interface VolumeTimelineEvent {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  unit: string;
  details: string;
  type: 'creation' | 'payment' | 'checkin' | 'relocation' | 'inspection' | 'checkout';
}

export interface Reservation {
  id: string; // 'SC-28419'
  customerId: string;
  customerName: string;
  customerPhone: string;
  unitId: string;
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string;
  category: 'P' | 'M' | 'G' | 'ESP';
  quantity: number;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: 'PIX' | 'Cartão Crédito' | 'Cartão Débito' | 'Faturado / Empresa' | 'Dinheiro';
  paymentStatus: 'paid' | 'pending' | 'partially_paid' | 'cancelled';
  status: 'confirmed' | 'active' | 'completed' | 'cancelled' | 'no_show';
  volumes: string[]; // volume IDs
  flightNumber?: string;
  airline?: string;
  notes?: string;
  createdAt: string;
  createdBy: string;
}

export interface Objective {
  id: string;
  title: string;
  description: string;
  area: 'Estratégico' | 'Financeiro' | 'Operacional' | 'Comercial' | 'Qualidade';
  owner: string;
  cycle: string; // 'Q4 2026'
  progress: number; // 0 - 100
  status: 'on_track' | 'at_risk' | 'behind' | 'achieved';
  keyResults: KeyResult[];
}

export interface KeyResult {
  id: string;
  objectiveId: string;
  title: string;
  metricType: 'currency' | 'number' | 'percentage';
  initialValue: number;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  owner: string;
  unitId?: string; // specific airport or 'all'
  progress: number;
  status: 'on_track' | 'at_risk' | 'behind' | 'achieved';
  realizations: RealizationRecord[];
  checkIns: OKRCheckIn[];
}

export interface RealizationRecord {
  id: string;
  date: string;
  addedValue: number;
  newValue: number;
  user: string;
  period: string;
  notes: string;
}

export interface OKRCheckIn {
  id: string;
  date: string;
  user: string;
  progressComment: string;
  blockers: string;
  nextSteps: string;
  confidence: 'Muito alta' | 'Alta' | 'Média' | 'Baixa' | 'Crítica';
}

export interface Lead {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  stage: 'lead' | 'contacted' | 'qualified' | 'meeting' | 'proposal' | 'negotiation' | 'won' | 'lost';
  potentialValue: number;
  airportUnit: string;
  segment: 'Companhia Aérea' | 'Agência de Turismo' | 'Hotel de Trânsito' | 'Evento / Transfer' | 'Corporativo';
  owner: string;
  daysInStage: number;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
}

export interface FollowUpItem {
  id: string;
  leadId: string;
  companyName: string;
  contactName: string;
  responsible: string;
  dueDate: string;
  channel: 'WhatsApp' | 'Telefone' | 'E-mail' | 'Reunião Presencial';
  lastTouch: string;
  nextAction: string;
  status: 'pending' | 'overdue' | 'completed';
  notes: string;
}

export interface Proposal {
  id: string;
  proposalNumber: string;
  clientName: string;
  companyName: string;
  value: number;
  createdAt: string;
  expiresAt: string;
  responsible: string;
  servicesDescription: string;
  status: 'draft' | 'sent' | 'viewed' | 'negotiation' | 'accepted' | 'rejected' | 'expired';
}

export interface CommercialPartner {
  id: string;
  partnerName: string;
  type: 'Hotel' | 'Agência' | 'Cia Aérea' | 'Operador Aeroportuário' | 'Transfer';
  contactPerson: string;
  phone: string;
  unitId: string;
  commissionPercentage: number;
  revenueGeneratedTotal: number;
  clientsReferredTotal: number;
  status: 'active' | 'in_negotiation' | 'paused';
  contractEnd: string;
}

export interface FinancialTransaction {
  id: string;
  type: 'receita' | 'despesa';
  category: string;
  costCenter: 'Operação' | 'Unidades' | 'Administrativo' | 'Comercial' | 'Marketing' | 'Tecnologia' | 'Manutenção' | 'Concessão Aeroporto';
  unitId: string;
  description: string;
  value: number;
  dueDate: string;
  paymentDate?: string;
  status: 'recebido' | 'pago' | 'em_aberto' | 'vencido';
  clientOrSupplier: string;
  paymentMethod: string;
  isRecurrent?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  unitId: string;
  profile: UserProfile;
  status: 'ativo' | 'em_turno' | 'folga' | 'ferias' | 'afastado';
  joinDate: string;
  manager: string;
  shiftHours: string;
  dailyOperationsCount: number;
  averageServiceMinutes: number;
  completedTasksCount: number;
  avatarUrl?: string;
}

export interface IncidentOccurrence {
  id: string;
  protocol: string; // 'OC-2026-0891'
  date: string;
  time: string;
  unitId: string;
  category: 'Cliente' | 'Volume / Bagagem' | 'Pagamento' | 'Operação' | 'Equipamento' | 'Segurança' | 'Concessão';
  priority: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  customerName?: string;
  volumeId?: string;
  reportedBy: string;
  assignedTo: string;
  title: string;
  description: string;
  correctiveAction?: string;
  status: 'Aberta' | 'Em Análise' | 'Em Resolução' | 'Resolvida' | 'Encerrada';
  resolutionDays?: number;
}

export interface AssetEquipment {
  id: string;
  assetCode: string;
  name: string;
  category: 'Leitor Barcode' | 'Impressora Térmica' | 'Balança Digital' | 'Armário Eletrônico' | 'Tablet Balcão' | 'Câmera CFTV';
  unitId: string;
  responsible: string;
  purchaseDate: string;
  warrantyEnd: string;
  value: number;
  status: 'Operacional' | 'Em Manutenção' | 'Necessita Calibração' | 'Inativo';
  nextMaintenanceDate: string;
}

export interface SOPDocument {
  id: string;
  code: string; // 'SOP-OPS-001'
  title: string;
  area: 'Operação' | 'Atendimento' | 'Segurança' | 'Financeiro' | 'TI & Sistemas';
  version: string;
  author: string;
  updatedAt: string;
  stepsCount: number;
  tags: string[];
  summary: string;
  steps: { stepNumber: number; title: string; instruction: string }[];
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  module: string;
  action: string;
  resourceId: string;
  beforeState?: string;
  afterState?: string;
  ipAddress: string;
  device: string;
  status: 'Sucesso' | 'Alerta' | 'Bloqueado';
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'Operação' | 'Financeiro' | 'Comercial' | 'Metas' | 'Segurança' | 'Documentos';
  severity: 'info' | 'success' | 'warning' | 'critical';
  read: boolean;
  link?: string;
}
