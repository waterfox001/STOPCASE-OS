import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  SystemMode,
  AirportUnitId,
  DatePeriod,
  AirportUnit,
  LuggageCategory,
  Customer,
  Reservation,
  VolumeItem,
  Objective,
  KeyResult,
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
import {
  INITIAL_UNITS,
  INITIAL_CATEGORIES,
  INITIAL_CUSTOMERS,
  INITIAL_RESERVATIONS,
  INITIAL_VOLUMES,
  INITIAL_OBJECTIVES,
  INITIAL_LEADS,
  INITIAL_FOLLOWUPS,
  INITIAL_PROPOSALS,
  INITIAL_PARTNERS,
  INITIAL_TRANSACTIONS,
  INITIAL_STAFF,
  INITIAL_OCCURRENCES,
  INITIAL_ASSETS,
  INITIAL_SOPS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS
} from '../mock/database';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation & session state
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  selectedUnitId: AirportUnitId;
  setSelectedUnitId: (unitId: AirportUnitId) => void;
  selectedPeriod: DatePeriod;
  setSelectedPeriod: (period: DatePeriod) => void;
  systemMode: SystemMode;
  setSystemMode: (mode: SystemMode) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isQuickCreateOpen: boolean;
  setIsQuickCreateOpen: (open: boolean) => void;
  quickCreateType: 'reservation' | 'customer' | 'lead' | 'occurrence' | 'transaction' | 'realization' | null;
  setQuickCreateType: (type: 'reservation' | 'customer' | 'lead' | 'occurrence' | 'transaction' | 'realization' | null) => void;
  
  // Realization modal specific state
  activeKrForRealization: string | null;
  setActiveKrForRealization: (krId: string | null) => void;

  // Selected item drawers
  selectedReservationId: string | null;
  setSelectedReservationId: (id: string | null) => void;
  selectedCustomerId: string | null;
  setSelectedCustomerId: (id: string | null) => void;
  selectedVolumeId: string | null;
  setSelectedVolumeId: (id: string | null) => void;

  // Toast
  toasts: ToastNotification[];
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;

  // RBAC
  can: (permission: string) => boolean;

  // Data collections
  units: AirportUnit[];
  categories: LuggageCategory[];
  customers: Customer[];
  reservations: Reservation[];
  volumes: VolumeItem[];
  objectives: Objective[];
  leads: Lead[];
  followUps: FollowUpItem[];
  proposals: Proposal[];
  partners: CommercialPartner[];
  transactions: FinancialTransaction[];
  staff: TeamMember[];
  occurrences: IncidentOccurrence[];
  assets: AssetEquipment[];
  sops: SOPDocument[];
  auditLogs: AuditLogItem[];
  notifications: SystemNotification[];

  // Mutators & Business Handlers
  registerRealization: (krId: string, addedValue: number, period: string, notes: string) => void;
  addReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'createdBy'>) => Reservation;
  checkInVolume: (volumeId: string, locationPosition: string, notes?: string) => void;
  checkOutVolume: (volumeId: string) => void;
  updateVolumePosition: (volumeId: string, newPosition: string) => void;
  addCustomer: (customer: Omit<Customer, 'id' | 'firstVisitDate' | 'lastVisitDate' | 'totalSpent' | 'reservationsCount'>) => Customer;
  updateLeadStage: (leadId: string, newStage: Lead['stage']) => void;
  addLead: (lead: Omit<Lead, 'id' | 'daysInStage' | 'lastContact'>) => void;
  completeFollowUp: (followUpId: string, note?: string) => void;
  addOccurrence: (occurrence: Omit<IncidentOccurrence, 'id' | 'protocol' | 'date' | 'time' | 'status'>) => void;
  resolveOccurrence: (occurrenceId: string, correctiveAction: string) => void;
  addTransaction: (transaction: Omit<FinancialTransaction, 'id'>) => void;
  toggleNotificationRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  updateUnitCapacity: (unitId: string, deltaOccupied: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState<UserProfile>('diretor');
  const [selectedUnitId, setSelectedUnitId] = useState<AirportUnitId>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<DatePeriod>('month');
  const [systemMode, setSystemMode] = useState<SystemMode>('standard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState<boolean>(false);
  const [quickCreateType, setQuickCreateType] = useState<'reservation' | 'customer' | 'lead' | 'occurrence' | 'transaction' | 'realization' | null>(null);
  const [activeKrForRealization, setActiveKrForRealization] = useState<string | null>(null);

  // Selected drawers
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [selectedVolumeId, setSelectedVolumeId] = useState<string | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Data states
  const [units, setUnits] = useState<AirportUnit[]>(INITIAL_UNITS);
  const [categories] = useState<LuggageCategory[]>(INITIAL_CATEGORIES);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [volumes, setVolumes] = useState<VolumeItem[]>(INITIAL_VOLUMES);
  const [objectives, setObjectives] = useState<Objective[]>(INITIAL_OBJECTIVES);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [followUps, setFollowUps] = useState<FollowUpItem[]>(INITIAL_FOLLOWUPS);
  const [proposals, setProposals] = useState<Proposal[]>(INITIAL_PROPOSALS);
  const [partners, setPartners] = useState<CommercialPartner[]>(INITIAL_PARTNERS);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(INITIAL_TRANSACTIONS);
  const [staff, setStaff] = useState<TeamMember[]>(INITIAL_STAFF);
  const [occurrences, setOccurrences] = useState<IncidentOccurrence[]>(INITIAL_OCCURRENCES);
  const [assets, setAssets] = useState<AssetEquipment[]>(INITIAL_ASSETS);
  const [sops] = useState<SOPDocument[]>(INITIAL_SOPS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // Hotkey for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // RBAC Permission Engine
  const can = (permission: string): boolean => {
    if (userProfile === 'diretor') return true;

    const permissionsByRole: Record<UserProfile, string[]> = {
      diretor: ['*'],
      gestor: [
        'dashboard.view', 'strategy.view', 'strategy.edit', 'commercial.view',
        'customers.view', 'reservations.view', 'reservations.create', 'reservations.edit',
        'operation.view', 'operation.edit', 'volumes.view', 'volumes.edit',
        'units.view', 'finance.view', 'reports.view', 'team.view', 'team.edit',
        'assets.view', 'assets.edit', 'partners.view', 'knowledge.view',
        'documents.view', 'occurrences.view', 'occurrences.edit', 'audit.view'
      ],
      financeiro: [
        'dashboard.view', 'finance.view', 'finance.edit', 'reports.view',
        'reports.finance', 'customers.view', 'reservations.view', 'partners.view',
        'documents.view', 'audit.view'
      ],
      comercial: [
        'dashboard.view', 'commercial.view', 'commercial.edit', 'customers.view',
        'customers.edit', 'proposals.create', 'proposals.edit', 'partners.view',
        'reservations.view', 'reservations.create', 'reports.view'
      ],
      operacional: [
        'dashboard.view', 'operation.view', 'operation.edit', 'reservations.view',
        'reservations.create', 'volumes.view', 'volumes.edit', 'occurrences.view',
        'occurrences.create', 'knowledge.view', 'mywork.view'
      ],
      atendimento: [
        'dashboard.view', 'operation.view', 'reservations.view', 'reservations.create',
        'volumes.view', 'customers.view', 'customers.create', 'occurrences.create',
        'knowledge.view', 'mywork.view'
      ],
      auditor: [
        'dashboard.view', 'audit.view', 'reports.view', 'finance.view',
        'operation.view', 'occurrences.view', 'documents.view'
      ]
    };

    const allowed = permissionsByRole[userProfile] || [];
    return allowed.includes('*') || allowed.includes(permission);
  };

  // Register Goal/KR Realization (Abatimento)
  const registerRealization = (krId: string, addedValue: number, period: string, notes: string) => {
    setObjectives((prevObjectives) => {
      return prevObjectives.map((obj) => {
        const krIndex = obj.keyResults.findIndex((k) => k.id === krId);
        if (krIndex === -1) return obj;

        const targetKr = obj.keyResults[krIndex];
        const newCurrent = Number((targetKr.currentValue + addedValue).toFixed(2));
        
        let calculatedProgress = 0;
        if (targetKr.targetValue > targetKr.initialValue) {
          calculatedProgress = Math.min(
            100,
            Math.round(((newCurrent - targetKr.initialValue) / (targetKr.targetValue - targetKr.initialValue)) * 100)
          );
        } else {
          // Inverse metric (e.g. reducing seconds)
          calculatedProgress = Math.min(
            100,
            Math.round(((targetKr.initialValue - newCurrent) / (targetKr.initialValue - targetKr.targetValue)) * 100)
          );
        }

        const newStatus: KeyResult['status'] = calculatedProgress >= 100 ? 'achieved' : calculatedProgress >= 70 ? 'on_track' : 'at_risk';

        const newRealization = {
          id: `real-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          addedValue,
          newValue: newCurrent,
          user: userProfile === 'diretor' ? 'Guilherme Toledo (Diretor)' : 'Marcelo Araripe (Gestor)',
          period,
          notes: notes || 'Atualização de progresso registrada via STOPCASE OS'
        };

        const updatedKr = {
          ...targetKr,
          currentValue: newCurrent,
          progress: Math.max(0, calculatedProgress),
          status: newStatus,
          realizations: [newRealization, ...targetKr.realizations]
        };

        const updatedKrs = [...obj.keyResults];
        updatedKrs[krIndex] = updatedKr;

        // Recalculate objective average progress
        const avgProgress = Math.round(
          updatedKrs.reduce((acc, k) => acc + k.progress, 0) / updatedKrs.length
        );

        return {
          ...obj,
          progress: avgProgress,
          status: avgProgress >= 80 ? 'on_track' : avgProgress >= 60 ? 'at_risk' : 'behind',
          keyResults: updatedKrs
        };
      });
    });

    // Log to Audit Trail
    const newLog: AuditLogItem = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: userProfile.toUpperCase(),
      role: userProfile,
      module: 'Estratégia & Metas',
      action: `Registrou Realização no KR ${krId}`,
      resourceId: krId,
      afterState: `+${addedValue} adicionado com sucesso`,
      ipAddress: '187.19.204.12',
      device: 'Console STOPCASE OS',
      status: 'Sucesso'
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    showToast('Meta Atualizada', `Realização de +${addedValue} registrada com sucesso no histórico.`, 'success');
  };

  // Add Reservation and generate luggage items
  const addReservation = (reservationData: Omit<Reservation, 'id' | 'createdAt' | 'createdBy'>): Reservation => {
    const resId = `SC-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();
    
    // Create volume IDs
    const createdVolumeIds: string[] = [];
    const newVolumes: VolumeItem[] = [];

    for (let i = 0; i < reservationData.quantity; i++) {
      const volId = `SC-VOL-00${Math.floor(8300 + Math.random() * 1000)}`;
      createdVolumeIds.push(volId);

      const lockerLetters = ['A', 'B', 'C'];
      const randomLetter = lockerLetters[Math.floor(Math.random() * lockerLetters.length)];
      const randomNum = String(Math.floor(1 + Math.random() * 10)).padStart(2, '0');
      const posCode = `${randomLetter}${randomNum}`;

      newVolumes.push({
        id: volId,
        reservationId: resId,
        customerName: reservationData.customerName,
        unitId: reservationData.unitId,
        category: reservationData.category,
        description: `Bagagem ${i + 1} (${reservationData.category})`,
        color: '#3B82F6',
        tagNumber: `TAG-${reservationData.unitId}-${Math.floor(1000 + Math.random() * 9000)}`,
        locationArea: `Área ${randomLetter}`,
        locationLocker: `Armário 0${Math.floor(1 + Math.random() * 4)}`,
        locationPosition: posCode,
        checkInTime: now,
        expectedCheckOutTime: reservationData.expectedEndDate,
        status: 'stored',
        operatorIn: userProfile === 'diretor' ? 'Guilherme Toledo' : 'Lucas Vianna',
        timeline: [
          {
            id: `evt-${Date.now()}-${i}`,
            timestamp: now,
            action: 'Reserva e Entrada Registradas',
            user: 'Operador de Balcão',
            unit: reservationData.unitId,
            details: `Reserva ${resId} criada. Volume alocado em ${posCode}`,
            type: 'checkin'
          }
        ]
      });
    }

    const newRes: Reservation = {
      ...reservationData,
      id: resId,
      volumes: createdVolumeIds,
      createdAt: now,
      createdBy: userProfile === 'diretor' ? 'Guilherme Toledo' : 'Operador Balcão'
    };

    setReservations((prev) => [newRes, ...prev]);
    setVolumes((prev) => [...newVolumes, ...prev]);

    // Update Unit capacity
    updateUnitCapacity(reservationData.unitId, reservationData.quantity);

    // Update Customer stats if exists
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === reservationData.customerId
          ? {
              ...c,
              totalSpent: c.totalSpent + reservationData.finalAmount,
              reservationsCount: c.reservationsCount + 1,
              lastVisitDate: now.split('T')[0]
            }
          : c
      )
    );

    // Create Financial Transaction
    const newTrx: FinancialTransaction = {
      id: `TRX-${Date.now()}`,
      type: 'receita',
      category: 'Reserva Balcão/Web',
      costCenter: 'Unidades',
      unitId: reservationData.unitId,
      description: `Reserva #${resId} - ${reservationData.customerName}`,
      value: reservationData.finalAmount,
      dueDate: now.split('T')[0],
      paymentDate: reservationData.paymentStatus === 'paid' ? now.split('T')[0] : undefined,
      status: reservationData.paymentStatus === 'paid' ? 'recebido' : 'em_aberto',
      clientOrSupplier: reservationData.customerName,
      paymentMethod: reservationData.paymentMethod
    };
    setTransactions((prev) => [newTrx, ...prev]);

    // Audit log
    setAuditLogs((prev) => [
      {
        id: `AUD-${Date.now()}`,
        timestamp: now,
        user: userProfile.toUpperCase(),
        role: userProfile,
        module: 'Reservas',
        action: `Criou reserva #${resId}`,
        resourceId: resId,
        afterState: `R$ ${reservationData.finalAmount.toFixed(2)} - ${reservationData.quantity} vol.`,
        ipAddress: '177.132.88.90',
        device: 'STOPCASE OS Balcão',
        status: 'Sucesso'
      },
      ...prev
    ]);

    showToast('Reserva Criada!', `Reserva #${resId} confirmada com ${reservationData.quantity} volume(s).`, 'success');
    return newRes;
  };

  // Check In Volume
  const checkInVolume = (volumeId: string, locationPosition: string, notes?: string) => {
    const now = new Date().toISOString();
    setVolumes((prev) =>
      prev.map((v) => {
        if (v.id !== volumeId) return v;
        const newEvt = {
          id: `evt-${Date.now()}`,
          timestamp: now,
          action: 'Entrada Confirmada',
          user: userProfile === 'diretor' ? 'Guilherme Toledo' : 'Operador',
          unit: v.unitId,
          details: `Posição confirmada em ${locationPosition}. ${notes || ''}`,
          type: 'checkin' as const
        };
        return {
          ...v,
          status: 'stored',
          locationPosition,
          checkInTime: now,
          timeline: [...v.timeline, newEvt]
        };
      })
    );
    showToast('Check-in Concluído', `Volume ${volumeId} armazenado com sucesso na posição ${locationPosition}.`, 'success');
  };

  // Check Out Volume
  const checkOutVolume = (volumeId: string) => {
    const now = new Date().toISOString();
    const targetVol = volumes.find((v) => v.id === volumeId);
    if (!targetVol) return;

    setVolumes((prev) =>
      prev.map((v) => {
        if (v.id !== volumeId) return v;
        const newEvt = {
          id: `evt-${Date.now()}`,
          timestamp: now,
          action: 'Retirada e Liberação de Armário',
          user: userProfile === 'diretor' ? 'Guilherme Toledo' : 'Operador Balcão',
          unit: v.unitId,
          details: `Conferência de identidade e entrega final ao cliente. Posição ${v.locationPosition} liberada.`,
          type: 'checkout' as const
        };
        return {
          ...v,
          status: 'retrieved',
          actualCheckOutTime: now,
          timeline: [...v.timeline, newEvt]
        };
      })
    );

    // Free up capacity
    updateUnitCapacity(targetVol.unitId, -1);

    // Check if reservation is completely done
    const relatedReservation = reservations.find((r) => r.id === targetVol.reservationId);
    if (relatedReservation) {
      setReservations((prev) =>
        prev.map((r) => (r.id === relatedReservation.id ? { ...r, status: 'completed', actualEndDate: now } : r))
      );
    }

    showToast('Volume Retirado', `Volume ${volumeId} entregue com sucesso e armário liberado.`, 'success');
  };

  // Update volume storage position
  const updateVolumePosition = (volumeId: string, newPosition: string) => {
    const now = new Date().toISOString();
    setVolumes((prev) =>
      prev.map((v) => {
        if (v.id !== volumeId) return v;
        const oldPos = v.locationPosition;
        return {
          ...v,
          locationPosition: newPosition,
          timeline: [
            ...v.timeline,
            {
              id: `evt-${Date.now()}`,
              timestamp: now,
              action: 'Remanejamento de Armário',
              user: userProfile === 'diretor' ? 'Guilherme Toledo' : 'Supervisor',
              unit: v.unitId,
              details: `Movido da posição ${oldPos} para ${newPosition}`,
              type: 'relocation'
            }
          ]
        };
      })
    );
    showToast('Posição Atualizada', `Volume ${volumeId} remanejado para ${newPosition}.`, 'info');
  };

  const updateUnitCapacity = (unitId: string, deltaOccupied: number) => {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== unitId) return u;
        const newOccupied = Math.max(0, Math.min(u.capacityTotal, u.capacityOccupied + deltaOccupied));
        const occupancyRate = (newOccupied / u.capacityTotal) * 100;
        return {
          ...u,
          capacityOccupied: newOccupied,
          status: occupancyRate >= 90 ? 'busy' : 'operational'
        };
      })
    );
  };

  const addCustomer = (customerData: Omit<Customer, 'id' | 'firstVisitDate' | 'lastVisitDate' | 'totalSpent' | 'reservationsCount'>): Customer => {
    const newCust: Customer = {
      ...customerData,
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      firstVisitDate: new Date().toISOString().split('T')[0],
      lastVisitDate: new Date().toISOString().split('T')[0],
      totalSpent: 0,
      reservationsCount: 0
    };
    setCustomers((prev) => [newCust, ...prev]);
    showToast('Cliente Cadastrado', `${newCust.name} adicionado com sucesso à base.`, 'success');
    return newCust;
  };

  const updateLeadStage = (leadId: string, newStage: Lead['stage']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, stage: newStage, lastContact: new Date().toISOString().split('T')[0] } : l))
    );
    showToast('Estágio Atualizado', `Oportunidade avançada para o estágio: ${newStage.toUpperCase()}.`, 'info');
  };

  const addLead = (leadData: Omit<Lead, 'id' | 'daysInStage' | 'lastContact'>) => {
    const newLead: Lead = {
      ...leadData,
      id: `LEAD-${Math.floor(200 + Math.random() * 800)}`,
      daysInStage: 0,
      lastContact: new Date().toISOString().split('T')[0]
    };
    setLeads((prev) => [newLead, ...prev]);
    showToast('Novo Lead Comercial', `Empresa ${newLead.companyName} registrada no pipeline.`, 'success');
  };

  const completeFollowUp = (followUpId: string, note?: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === followUpId ? { ...f, status: 'completed', notes: note ? `${f.notes} [Concluído: ${note}]` : f.notes } : f))
    );
    showToast('Follow-up Concluído', 'Ação registrada na central de relacionamento.', 'success');
  };

  const addOccurrence = (occurrenceData: Omit<IncidentOccurrence, 'id' | 'protocol' | 'date' | 'time' | 'status'>) => {
    const now = new Date();
    const newOcc: IncidentOccurrence = {
      ...occurrenceData,
      id: `OC-${Date.now()}`,
      protocol: `OC-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Aberta'
    };
    setOccurrences((prev) => [newOcc, ...prev]);
    showToast('Ocorrência Registrada', `Protocolo ${newOcc.protocol} gerado para a unidade ${newOcc.unitId}.`, 'warning');
  };

  const resolveOccurrence = (occurrenceId: string, correctiveAction: string) => {
    setOccurrences((prev) =>
      prev.map((o) => (o.id === occurrenceId ? { ...o, status: 'Resolvida', correctiveAction, resolutionDays: 1 } : o))
    );
    showToast('Ocorrência Resolvida', 'Ação corretiva arquivada no protocolo.', 'success');
  };

  const addTransaction = (transactionData: Omit<FinancialTransaction, 'id'>) => {
    const newTrx: FinancialTransaction = {
      ...transactionData,
      id: `TRX-${Date.now()}`
    };
    setTransactions((prev) => [newTrx, ...prev]);
    showToast('Lançamento Registrado', `${newTrx.type.toUpperCase()}: R$ ${newTrx.value.toFixed(2)} - ${newTrx.description}`, 'success');
  };

  const toggleNotificationRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: !n.read } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notificações', 'Todas as notificações foram marcadas como lidas.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        setUserProfile,
        selectedUnitId,
        setSelectedUnitId,
        selectedPeriod,
        setSelectedPeriod,
        systemMode,
        setSystemMode,
        sidebarCollapsed,
        setSidebarCollapsed,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isQuickCreateOpen,
        setIsQuickCreateOpen,
        quickCreateType,
        setQuickCreateType,
        activeKrForRealization,
        setActiveKrForRealization,
        selectedReservationId,
        setSelectedReservationId,
        selectedCustomerId,
        setSelectedCustomerId,
        selectedVolumeId,
        setSelectedVolumeId,
        toasts,
        showToast,
        removeToast,
        can,
        units,
        categories,
        customers,
        reservations,
        volumes,
        objectives,
        leads,
        followUps,
        proposals,
        partners,
        transactions,
        staff,
        occurrences,
        assets,
        sops,
        auditLogs,
        notifications,
        registerRealization,
        addReservation,
        checkInVolume,
        checkOutVolume,
        updateVolumePosition,
        addCustomer,
        updateLeadStage,
        addLead,
        completeFollowUp,
        addOccurrence,
        resolveOccurrence,
        addTransaction,
        toggleNotificationRead,
        markAllNotificationsAsRead,
        updateUnitCapacity
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
