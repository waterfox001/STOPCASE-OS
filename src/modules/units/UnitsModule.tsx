import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AirportUnit } from '../../types';
import {
  Building2,
  Trophy,
  TrendingUp,
  MapPin,
  Clock,
  Phone,
  User,
  Luggage,
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Percent
} from 'lucide-react';

export const UnitsModule: React.FC = () => {
  const { units, setSelectedUnitId, showToast } = useApp();

  const [selectedUnitForDetail, setSelectedUnitForDetail] = useState<AirportUnit>(units[0]);

  // Sort units by revenue for Ranking
  const rankedUnits = [...units].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Rede Aeroportuária Nacional
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Unidades, Comparativo de Bases & Ranking
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gestão integrada dos 5 aeroportos concessionados com comparação de capacidade, receita e produtividade.
          </p>
        </div>

        <button
          onClick={() => showToast('Configuração', 'Formulário de cadastro/edição de unidade aeroportuária aberto.', 'info')}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <span>+ Nova Base Aeroporto</span>
        </button>
      </div>

      {/* COMPARATIVO & RANKING TABLE */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Ranking Geral de Faturamento & Eficiência
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Consolidado Outubro 2026</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                <th className="pb-3 text-center w-12">Rank</th>
                <th className="pb-3">Unidade / Aeroporto</th>
                <th className="pb-3">Gerente Responsável</th>
                <th className="pb-3">Faturamento Mensal</th>
                <th className="pb-3">Meta Mensal</th>
                <th className="pb-3">% Atingido</th>
                <th className="pb-3">Ocupação</th>
                <th className="pb-3">Ticket Médio</th>
                <th className="pb-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {rankedUnits.map((u, index) => {
                const pctMeta = Math.round((u.monthlyRevenue / u.monthlyTarget) * 100);
                const pctOcupacao = Math.round((u.capacityOccupied / u.capacityTotal) * 100);

                return (
                  <tr
                    key={u.id}
                    onClick={() => setSelectedUnitForDetail(u)}
                    className="hover:bg-slate-850/60 transition-colors cursor-pointer"
                  >
                    <td className="py-3 text-center">
                      <span
                        className={`font-mono text-xs font-extrabold w-6 h-6 rounded-full inline-flex items-center justify-center ${
                          index === 0
                            ? 'bg-amber-500 text-slate-950'
                            : index === 1
                            ? 'bg-slate-300 text-slate-950'
                            : index === 2
                            ? 'bg-amber-800 text-amber-200'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        #{index + 1}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-slate-100 flex items-center gap-2">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold">
                        {u.airportCode}
                      </span>
                      <span>{u.name}</span>
                    </td>
                    <td className="py-3 text-slate-300">{u.manager}</td>
                    <td className="py-3 font-mono font-bold text-slate-100">
                      R$ {u.monthlyRevenue.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 font-mono text-slate-400">
                      R$ {u.monthlyTarget.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 font-mono">
                      <span
                        className={`font-bold ${
                          pctMeta >= 100 ? 'text-emerald-400' : pctMeta >= 85 ? 'text-blue-400' : 'text-amber-400'
                        }`}
                      >
                        {pctMeta}%
                      </span>
                    </td>
                    <td className="py-3 font-mono">
                      <span className={pctOcupacao >= 85 ? 'text-amber-400 font-bold' : 'text-slate-200'}>
                        {pctOcupacao}% ({u.capacityOccupied}/{u.capacityTotal})
                      </span>
                    </td>
                    <td className="py-3 font-mono text-slate-200">
                      R$ {u.ticketAverage.toFixed(2)}
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUnitId(u.id as any);
                          showToast('Filtro Global Aplicado', `Visão do sistema alterada para a base ${u.shortName}.`, 'info');
                        }}
                        className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                      >
                        Filtrar Painel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DASHBOARD DA UNIDADE SELECIONADA */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Dashboard Detalhado da Base</div>
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="font-mono text-amber-400">{selectedUnitForDetail.airportCode}</span>
              <span>· {selectedUnitForDetail.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">{selectedUnitForDetail.terminal} · {selectedUnitForDetail.address}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 font-bold">
              STATUS: OPERAÇÃO NOMINAL
            </span>
          </div>
        </div>

        {/* Quick Indicators Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Faturamento do Mês</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              R$ {selectedUnitForDetail.monthlyRevenue.toLocaleString('pt-BR')}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              Meta: R$ {selectedUnitForDetail.monthlyTarget.toLocaleString('pt-BR')}
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Capacidade & Vagas</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">
              {selectedUnitForDetail.capacityOccupied} / {selectedUnitForDetail.capacityTotal}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              {selectedUnitForDetail.capacityTotal - selectedUnitForDetail.capacityOccupied} posições livres
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Equipe Alocada</div>
            <div className="text-xl font-bold font-mono text-slate-200 mt-1">
              {selectedUnitForDetail.activeStaffCount} colaboradores
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              Gestor: {selectedUnitForDetail.manager}
            </div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 uppercase font-mono">Horário de Funcionamento</div>
            <div className="text-xs font-bold text-slate-200 mt-1">
              {selectedUnitForDetail.openingHours}
            </div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">
              Contato: {selectedUnitForDetail.phone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
