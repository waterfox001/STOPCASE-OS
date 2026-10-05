import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Reservation } from '../../types';
import {
  CalendarDays,
  Plus,
  Search,
  Filter,
  Luggage,
  Clock,
  Building2,
  CheckCircle2,
  Printer,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const ReservationsModule: React.FC = () => {
  const {
    reservations,
    selectedUnitId,
    setSelectedReservationId,
    setIsQuickCreateOpen,
    setQuickCreateType,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'todas' | 'hoje' | 'proximas' | 'calendario' | 'finalizadas'>('todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('todos');

  const filteredReservations = reservations.filter((r) => {
    const matchesUnit = selectedUnitId === 'all' || r.unitId === selectedUnitId;
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerPhone.includes(searchTerm);

    const matchesCategory = filterCategory === 'todos' || r.category === filterCategory;

    let matchesTab = true;
    const isToday = r.startDate.startsWith('2026-10-05');
    if (activeTab === 'hoje') matchesTab = isToday && r.status === 'active';
    if (activeTab === 'proximas') matchesTab = r.status === 'confirmed';
    if (activeTab === 'finalizadas') matchesTab = r.status === 'completed';

    return matchesUnit && matchesSearch && matchesCategory && matchesTab;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Controle de Reservas & Guarda-Volumes
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Gestão Operacional de Reservas
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Emissão rápida de comprovantes, check-in balcão, acompanhamento de vôos e cancelamentos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Submenu Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('todas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'todas' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setActiveTab('hoje')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'hoje' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Hoje (Ativas)
            </button>
            <button
              onClick={() => setActiveTab('proximas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'proximas' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Próximas
            </button>
            <button
              onClick={() => setActiveTab('finalizadas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'finalizadas' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Finalizadas
            </button>
            <button
              onClick={() => setActiveTab('calendario')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'calendario' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Calendário
            </button>
          </div>

          <button
            onClick={() => {
              setQuickCreateType('reservation');
              setIsQuickCreateOpen(true);
            }}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Nova Reserva (Wizard)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab !== 'calendario' ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-4">
          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por código (SC-XXXXX), nome do passageiro ou telefone..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 whitespace-nowrap">Categoria:</span>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="todos">Todas as Categorias</option>
                <option value="P">Pequeno (P)</option>
                <option value="M">Médio (M)</option>
                <option value="G">Grande (G)</option>
                <option value="ESP">Especial (ESP)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                  <th className="pb-3">Código / Criação</th>
                  <th className="pb-3">Passageiro / Contato</th>
                  <th className="pb-3">Base Aeroporto</th>
                  <th className="pb-3">Volumes / Categoria</th>
                  <th className="pb-3">Período de Permanência</th>
                  <th className="pb-3">Valor Cobrado</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredReservations.map((res) => (
                  <tr key={res.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3">
                      <div className="font-mono font-bold text-amber-400">{res.id}</div>
                      <div className="text-[10px] font-mono text-slate-500">
                        {new Date(res.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="font-bold text-slate-200">{res.customerName}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{res.customerPhone}</div>
                    </td>
                    <td className="py-3">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-bold">
                        {res.unitId}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="font-semibold text-slate-200">
                        {res.quantity} vol. ({res.category})
                      </span>
                    </td>
                    <td className="py-3 text-slate-300 font-mono text-[11px]">
                      <div>Entrada: {res.startDate.replace('T', ' ')}</div>
                      <div className="text-slate-500">Saída: {res.expectedEndDate.replace('T', ' ')}</div>
                    </td>
                    <td className="py-3 font-mono font-bold text-slate-100">
                      R$ {res.finalAmount.toFixed(2)}
                      <div className="text-[10px] text-slate-500 font-normal">{res.paymentMethod}</div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          res.status === 'active'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : res.status === 'confirmed'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {res.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setSelectedReservationId(res.id)}
                        className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CALENDAR VIEW (SIMULADA / VISUAL) */
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Visão Temporal</div>
              <h3 className="text-sm font-bold text-slate-100">Grade Visual de Reservas da Semana</h3>
            </div>
            <div className="text-xs font-mono text-slate-400">Outubro 2026 · Semana 41</div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Seg 05', 'Ter 06', 'Qua 07', 'Qui 08', 'Sex 09', 'Sáb 10', 'Dom 11'].map((day, dIdx) => (
              <div key={day} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 min-h-[220px] text-left">
                <div className={`text-[11px] font-mono font-bold pb-1 border-b border-slate-800/80 ${dIdx === 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                  {day} {dIdx === 0 && '(Hoje)'}
                </div>

                <div className="space-y-1.5">
                  {reservations.slice(dIdx, dIdx + 2).map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setSelectedReservationId(r.id)}
                      className="p-1.5 bg-slate-900 hover:bg-slate-850 rounded border border-slate-800 text-[10px] cursor-pointer transition-colors"
                    >
                      <div className="font-mono font-bold text-amber-400">{r.id}</div>
                      <div className="text-slate-300 truncate">{r.customerName}</div>
                      <div className="text-slate-500 font-mono">{r.quantity} vol. · {r.unitId}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
