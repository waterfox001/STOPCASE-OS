import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Customer } from '../../types';
import {
  Users,
  Search,
  Plus,
  Star,
  Phone,
  Mail,
  Calendar,
  Building2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Filter
} from 'lucide-react';

export const CustomersModule: React.FC = () => {
  const {
    customers,
    setSelectedCustomerId,
    setIsQuickCreateOpen,
    setQuickCreateType,
    showToast
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('todos');

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.document.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);

    const matchesSegment = selectedSegment === 'todos' || c.segment === selectedSegment;

    return matchesSearch && matchesSegment;
  });

  const vipCount = customers.filter((c) => c.segment === 'VIP').length;
  const corporateCount = customers.filter((c) => c.segment === 'Corporativo').length;
  const inactiveCount = customers.filter((c) => c.segment === 'Inativo').length;
  const totalLtv = customers.reduce((acc, c) => acc + c.totalSpent, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Base Central de Relacionamento
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Clientes, Segmentação & Retenção
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Consulte o perfil 360°, histórico de consumo, satisfação (NPS) e indicadores de frequência de viagem.
          </p>
        </div>

        <button
          onClick={() => {
            setQuickCreateType('customer');
            setIsQuickCreateOpen(true);
          }}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>+ Cadastrar Cliente</span>
        </button>
      </div>

      {/* Segment Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">LTV Acumulado da Base</div>
          <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
            R$ {totalLtv.toLocaleString('pt-BR')}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">{customers.length} passageiros cadastrados</div>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Passageiros VIP</div>
          <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">{vipCount}</div>
          <div className="text-[10px] text-slate-500 font-mono">Frequência alta em 2+ bases</div>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Contas Corporativas</div>
          <div className="text-xl font-bold font-mono text-indigo-400 tabular-nums">{corporateCount}</div>
          <div className="text-[10px] text-slate-500 font-mono">Faturamento direto com empresa</div>
        </div>

        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[11px] text-slate-400 font-medium">Clientes Inativos (&gt;90d)</div>
          <div className="text-xl font-bold font-mono text-slate-300 tabular-nums">{inactiveCount}</div>
          <div className="text-[10px] text-amber-400 font-mono">Alvo para campanhas de reativação</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar por nome, CPF/documento, telefone ou e-mail..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 whitespace-nowrap">Segmento:</span>
            <select
              value={selectedSegment}
              onChange={(e) => setSelectedSegment(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="todos">Todos os Segmentos</option>
              <option value="VIP">VIP</option>
              <option value="Corporativo">Corporativo</option>
              <option value="Recorrente">Recorrente</option>
              <option value="Novo">Novo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        {/* Customers DataTable */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                <th className="pb-3">Cliente / Documento</th>
                <th className="pb-3">Contatos</th>
                <th className="pb-3">Cidade / UF</th>
                <th className="pb-3">Segmento</th>
                <th className="pb-3">Reservas</th>
                <th className="pb-3">LTV Gasto</th>
                <th className="pb-3">NPS</th>
                <th className="pb-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3">
                    <div className="font-bold text-slate-200">{cust.name}</div>
                    <div className="font-mono text-[10px] text-slate-400">CPF: {cust.document}</div>
                  </td>
                  <td className="py-3">
                    <div className="text-slate-300">{cust.phone}</div>
                    <div className="text-[11px] text-slate-500">{cust.email}</div>
                  </td>
                  <td className="py-3 text-slate-300 font-mono">
                    {cust.city} / {cust.state}
                  </td>
                  <td className="py-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        cust.segment === 'VIP'
                          ? 'bg-amber-500/20 text-amber-400'
                          : cust.segment === 'Corporativo'
                          ? 'bg-indigo-500/20 text-indigo-400'
                          : cust.segment === 'Recorrente'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {cust.segment}
                    </span>
                  </td>
                  <td className="py-3 font-mono font-semibold text-slate-200">
                    {cust.reservationsCount}
                  </td>
                  <td className="py-3 font-mono font-bold text-emerald-400">
                    R$ {cust.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-3 font-mono">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{cust.npsScore || 10}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => setSelectedCustomerId(cust.id)}
                      className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Visão 360°
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
