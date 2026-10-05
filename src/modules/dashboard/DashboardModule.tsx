import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Luggage,
  Users,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building2,
  ArrowRight,
  ShieldAlert,
  Clock,
  Briefcase,
  Target,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface DashboardProps {
  onNavigate: (path: string) => void;
}

export const DashboardModule: React.FC<DashboardProps> = ({ onNavigate }) => {
  const {
    units,
    selectedUnitId,
    selectedPeriod,
    systemMode,
    reservations,
    volumes,
    customers,
    occurrences,
    followUps,
    objectives,
    staff,
    transactions,
    setSelectedReservationId,
    setSelectedVolumeId,
    setActiveKrForRealization,
    setIsQuickCreateOpen,
    setQuickCreateType
  } = useApp();

  // Filter calculations based on unit
  const filteredUnits = selectedUnitId === 'all' ? units : units.filter((u) => u.id === selectedUnitId);

  const totalMonthlyRevenue = filteredUnits.reduce((acc, u) => acc + u.monthlyRevenue, 0);
  const totalCapacity = filteredUnits.reduce((acc, u) => acc + u.capacityTotal, 0);
  const totalOccupied = filteredUnits.reduce((acc, u) => acc + u.capacityOccupied, 0);
  const occupancyRate = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;
  const avgTicket = filteredUnits.length > 0
    ? filteredUnits.reduce((acc, u) => acc + u.ticketAverage, 0) / filteredUnits.length
    : 84.50;

  const activeReservationsCount = reservations.filter((r) => selectedUnitId === 'all' || r.unitId === selectedUnitId).length;
  const storedVolumesCount = volumes.filter((v) => (selectedUnitId === 'all' || v.unitId === selectedUnitId) && v.status === 'stored').length;
  const openOccurrencesCount = occurrences.filter((o) => (selectedUnitId === 'all' || o.unitId === selectedUnitId) && (o.status === 'Aberta' || o.status === 'Em Resolução')).length;
  const overdueFollowUpsCount = followUps.filter((f) => f.status === 'overdue').length;

  // Health of the company items
  const healthItems = [
    {
      area: 'FINANCEIRO',
      status: 'Saudável',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      reason: 'Receita consolidada +12,8% vs. mês anterior. Margem EBITDA de 38,4%.'
    },
    {
      area: 'OPERAÇÃO',
      status: occupancyRate >= 85 ? 'Atenção' : 'Saudável',
      statusColor: occupancyRate >= 85 ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      reason: occupancyRate >= 85 ? 'Congonhas operando com 91,5% de ocupação. Pulmão ativado.' : 'Tempo médio de entrada abaixo de 95s em todas as bases.'
    },
    {
      area: 'COMERCIAL',
      status: 'Em Crescimento',
      statusColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      reason: 'Conversão de leads em propostas +7,3%. Parceria Ibis em fase de assinatura.'
    },
    {
      area: 'CLIENTES',
      status: 'Excelente',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      reason: 'NPS médio de 9,6/10 com 0 extravios reportados nos últimos 90 dias.'
    },
    {
      area: 'EQUIPE',
      status: 'Saudável',
      statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      reason: 'Escalas 100% preenchidas sem faltas nas 5 bases neste turno.'
    },
    {
      area: 'METAS & OKRS',
      status: 'Atenção',
      statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      reason: 'KR-005 (Parcerias Cias Aéreas) requer agilidade no jurídico corporativo.'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Presentation Mode Banner */}
      {systemMode === 'presentation' && (
        <div className="p-3 bg-amber-500/15 border border-amber-500/40 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <strong className="text-amber-400">MODO APRESENTAÇÃO EXECUTIVA ATIVADO:</strong>
            <span className="text-slate-200">Painel otimizado para demonstração ao conselho de administração e parceiros aeroportuários.</span>
          </div>
          <button
            onClick={() => onNavigate('/reports')}
            className="px-2.5 py-1 bg-amber-500 text-slate-950 font-bold rounded text-[11px] cursor-pointer"
          >
            Abrir BI & Simulador
          </button>
        </div>
      )}

      {/* Hero Welcome & Filter Scope Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
            Centro de Comando Integrado · STOPCASE OS
          </div>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            {selectedUnitId === 'all' ? 'Visão Consolidada de Todas as Bases' : `Operação Aeroporto ${filteredUnits[0]?.name}`}
          </h2>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>Período: <strong className="text-slate-200 font-mono">Outubro 2026</strong></span>
            <span>·</span>
            <span>Unidades ativas: <strong className="text-emerald-400 font-mono">{filteredUnits.length} aeroportos</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('/operation')}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Operação Hoje</span>
          </button>
          <button
            onClick={() => {
              setQuickCreateType('reservation');
              setIsQuickCreateOpen(true);
            }}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>+ Nova Reserva</span>
          </button>
        </div>
      </div>

      {/* EXECUTIVE KPIS GRID (Clean Tabular Numbers, Zero Pill Discipline) */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-3">
        {/* KPI 1: Faturamento Mensal */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Faturamento Estimado</div>
          <div className="text-xl font-bold font-mono text-slate-100 tabular-nums">
            R$ {totalMonthlyRevenue.toLocaleString('pt-BR')}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+12,8% vs. mês anterior</span>
          </div>
        </div>

        {/* KPI 2: Receita Recebida */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Receita Recebida</div>
          <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
            R$ {(totalMonthlyRevenue * 0.92).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            92% liquidado à vista
          </div>
        </div>

        {/* KPI 3: Despesas Concessão & Ops */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Despesas & Concessões</div>
          <div className="text-xl font-bold font-mono text-slate-200 tabular-nums">
            R$ {(totalMonthlyRevenue * 0.44).toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            Margem Líq: 38,4%
          </div>
        </div>

        {/* KPI 4: Taxa de Ocupação */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Taxa de Ocupação Média</div>
          <div className={`text-xl font-bold font-mono tabular-nums ${occupancyRate >= 85 ? 'text-amber-400' : 'text-slate-100'}`}>
            {occupancyRate}%
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {totalOccupied} de {totalCapacity} armários
          </div>
        </div>

        {/* KPI 5: Ticket Médio */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Ticket Médio / Reserva</div>
          <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
            R$ {avgTicket.toFixed(2)}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <TrendingUp className="w-3 h-3" />
            <span>+6,4% vs. target</span>
          </div>
        </div>

        {/* KPI 6: Ocorrências Abertas */}
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Ocorrências Abertas</div>
          <div className={`text-xl font-bold font-mono tabular-nums ${openOccurrencesCount > 0 ? 'text-rose-400' : 'text-slate-100'}`}>
            {openOccurrencesCount}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">
            0 críticas não tratadas
          </div>
        </div>
      </div>

      {/* ACTIONABLE ALERTS: "Exige sua Atenção" */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Exige sua Atenção Imediata
            </span>
          </div>
          <span className="text-xs text-slate-400">4 itens prioritários hoje</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Alert 1 */}
          <div
            onClick={() => onNavigate('/operation')}
            className="p-3 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/30 rounded-xl cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-400">
              <span>Ocupação Crítica</span>
              <span className="font-mono">CGH (91,5%)</span>
            </div>
            <p className="text-xs text-slate-300">
              Congonhas com apenas 22 posições livres no piso térreo. Pulmão ativado.
            </p>
          </div>

          {/* Alert 2 */}
          <div
            onClick={() => onNavigate('/finance')}
            className="p-3 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/30 rounded-xl cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-rose-400">
              <span>Fatura Vencida</span>
              <span className="font-mono">R$ 42.000</span>
            </div>
            <p className="text-xs text-slate-300">
              Operadora Global Trânsito com vencimento em 04/10 pendente de conciliação.
            </p>
          </div>

          {/* Alert 3 */}
          <div
            onClick={() => onNavigate('/commercial')}
            className="p-3 bg-slate-950/70 hover:bg-slate-850 border border-slate-800 rounded-xl cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-200">
              <span>Follow-up Atrasado</span>
              <span className="font-mono text-amber-400">REC</span>
            </div>
            <p className="text-xs text-slate-300">
              CVC Turismo aguardando proposta formal de receptivo desde 29/09.
            </p>
          </div>

          {/* Alert 4 */}
          <div
            onClick={() => onNavigate('/strategy')}
            className="p-3 bg-slate-950/70 hover:bg-slate-850 border border-slate-800 rounded-xl cursor-pointer transition-all space-y-1"
          >
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-200">
              <span>Meta em Risco</span>
              <span className="font-mono text-amber-400">KR-005</span>
            </div>
            <p className="text-xs text-slate-300">
              Expansão de parcerias com cias aéreas atingiu 45% do alvo trimestral.
            </p>
          </div>
        </div>
      </div>

      {/* HEALTH OF THE COMPANY: "Saúde da Empresa" */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Diagnóstico Corporativo</div>
            <h3 className="text-sm font-bold text-slate-100">Saúde Integrada da Stopcase</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Atualizado há 15 min</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {healthItems.map((h) => (
            <div key={h.area} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400">
                  {h.area}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${h.statusColor}`}>
                  {h.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{h.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TWO COLUMNS: OPERAÇÃO DE HOJE + METAS STRATÉGICAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Operação de Hoje (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Balcão & Vagas</div>
              <h3 className="text-sm font-bold text-slate-100">Visão Operacional do Dia (05/10)</h3>
            </div>
            <button
              onClick={() => onNavigate('/operation')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Central Completa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Operational Metrics Bar */}
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Entradas Hoje</div>
              <div className="text-lg font-bold font-mono text-emerald-400 tabular-nums mt-0.5">24</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Retiradas Hoje</div>
              <div className="text-lg font-bold font-mono text-blue-400 tabular-nums mt-0.5">18</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Armazenados Agora</div>
              <div className="text-lg font-bold font-mono text-amber-400 tabular-nums mt-0.5">{storedVolumesCount}</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Equipe em Turno</div>
              <div className="text-lg font-bold font-mono text-slate-200 tabular-nums mt-0.5">14 pessoas</div>
            </div>
          </div>

          {/* Recent Operations Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Últimas Movimentações no Sistema
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                    <th className="pb-2">Reserva / Volume</th>
                    <th className="pb-2">Cliente</th>
                    <th className="pb-2">Unidade</th>
                    <th className="pb-2">Posição</th>
                    <th className="pb-2">Horário</th>
                    <th className="pb-2 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {volumes.slice(0, 5).map((vol) => (
                    <tr key={vol.id} className="hover:bg-slate-850/60 transition-colors">
                      <td className="py-2.5 font-mono font-bold text-amber-400">
                        {vol.id}
                      </td>
                      <td className="py-2.5 text-slate-200 font-medium">
                        {vol.customerName}
                      </td>
                      <td className="py-2.5 font-mono text-slate-400">
                        {vol.unitId}
                      </td>
                      <td className="py-2.5">
                        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-bold">
                          {vol.locationPosition}
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-slate-400 text-[11px]">
                        {vol.checkInTime.split('T')[1]?.slice(0, 5)}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => setSelectedVolumeId(vol.id)}
                          className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                        >
                          Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Estratégia & KRs em Destaque (1 col) */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">OKRs Q4 2026</div>
              <h3 className="text-sm font-bold text-slate-100">Metas em Acompanhamento</h3>
            </div>
            <button
              onClick={() => onNavigate('/strategy')}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Todos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {objectives[0]?.keyResults.map((kr) => (
              <div key={kr.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-semibold text-slate-200">{kr.title}</div>
                  <span className="text-[10px] font-mono font-bold text-amber-400 shrink-0">
                    {kr.progress}%
                  </span>
                </div>

                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all"
                    style={{ width: `${kr.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-slate-400">
                    {kr.metricType === 'currency' ? `R$ ${kr.currentValue.toLocaleString('pt-BR')}` : kr.currentValue} / {kr.metricType === 'currency' ? `R$ ${kr.targetValue.toLocaleString('pt-BR')}` : kr.targetValue}
                  </span>
                  <button
                    onClick={() => setActiveKrForRealization(kr.id)}
                    className="text-[10px] text-amber-400 hover:text-amber-300 font-bold cursor-pointer"
                  >
                    + Registrar Realização
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Problem Detector Box */}
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Insights & Detector de Gargalos</span>
            </div>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li>A base de Fortaleza teve crescimento de <strong>14%</strong> no período com a chegada de turistas internacionais.</li>
              <li>A taxa de conversão do balcão de Congonhas superou a média nacional em <strong>4,2 p.p.</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
