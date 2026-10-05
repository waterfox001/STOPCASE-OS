import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TeamMember, UserProfile } from '../../types';
import {
  UserCheck,
  Calendar,
  Shield,
  Clock,
  Building2,
  CheckCircle2,
  Plus,
  Users,
  Search,
  Lock
} from 'lucide-react';

export const TeamModule: React.FC = () => {
  const { staff, units, selectedUnitId, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'colaboradores' | 'escalas' | 'produtividade' | 'permissoes'>('colaboradores');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStaff = staff.filter((s) => {
    const matchesUnit = selectedUnitId === 'all' || s.unitId === selectedUnitId;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesUnit && matchesSearch;
  });

  const rbacModules = [
    { name: 'Dashboard Executivo', perm: 'dashboard.view' },
    { name: 'Estratégia & OKRs', perm: 'strategy.edit' },
    { name: 'CRM & Pipeline', perm: 'commercial.edit' },
    { name: 'Clientes & 360°', perm: 'customers.edit' },
    { name: 'Reservas & Emissão', perm: 'reservations.create' },
    { name: 'Operação Balcão', perm: 'operation.edit' },
    { name: 'Volumes & Armários', perm: 'volumes.edit' },
    { name: 'Financeiro & DRE', perm: 'finance.edit' },
    { name: 'Auditoria & Logs', perm: 'audit.view' }
  ];

  const rolesList: { role: UserProfile; label: string }[] = [
    { role: 'diretor', label: 'Diretor (Super Admin)' },
    { role: 'gestor', label: 'Gestor Operacional' },
    { role: 'financeiro', label: 'Financeiro' },
    { role: 'comercial', label: 'Comercial' },
    { role: 'operacional', label: 'Operador Pista/Balcão' },
    { role: 'atendimento', label: 'Atendente' },
    { role: 'auditor', label: 'Auditor Compliance' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Recursos Humanos & Governança
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Equipe, Escalas Aeroportuárias & RBAC
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gestão de plantões 24h, produtividade por atendente e matriz rigorosa de permissões de acesso.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Submenu Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl overflow-x-auto">
            <button
              onClick={() => setActiveTab('colaboradores')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'colaboradores' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Colaboradores ({staff.length})
            </button>
            <button
              onClick={() => setActiveTab('escalas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'escalas' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Escalas Semanais
            </button>
            <button
              onClick={() => setActiveTab('produtividade')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'produtividade' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Produtividade
            </button>
            <button
              onClick={() => setActiveTab('permissoes')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === 'permissoes' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Matriz RBAC
            </button>
          </div>

          <button
            onClick={() => showToast('Novo Colaborador', 'Formulário de admissão aberto.', 'info')}
            className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Colaborador</span>
          </button>
        </div>
      </div>

      {/* TAB 1: COLABORADORES */}
      {activeTab === 'colaboradores' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome, cargo ou e-mail corporativo..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <span className="text-xs text-slate-400 font-mono">{filteredStaff.length} pessoas ativas</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                  <th className="pb-3">Colaborador / Cargo</th>
                  <th className="pb-3">Base Alocada</th>
                  <th className="pb-3">Turno Habitual</th>
                  <th className="pb-3">Perfil RBAC</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredStaff.map((person) => (
                  <tr key={person.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3">
                      <div className="font-bold text-slate-200">{person.name}</div>
                      <div className="text-[11px] text-slate-400">{person.role} · {person.email}</div>
                    </td>
                    <td className="py-3">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold">
                        {person.unitId}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-slate-300">{person.shiftHours}</td>
                    <td className="py-3 font-mono text-slate-400 uppercase text-[11px]">
                      {person.profile}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          person.status === 'em_turno'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {person.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => showToast('Perfil', `Ficha funcional de ${person.name} aberta.`, 'info')}
                        className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                      >
                        Ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ESCALAS SEMANAIS */}
      {activeTab === 'escalas' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Planejamento de Pessoal</div>
              <h3 className="text-sm font-bold text-slate-100">Grade de Escalas Semanais por Aeroporto</h3>
            </div>
            <button
              onClick={() => showToast('Escala', 'Escala da próxima semana publicada com sucesso.', 'success')}
              className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
            >
              Publicar Escala
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                  <th className="pb-3">Colaborador</th>
                  <th className="pb-3 text-center">Seg 05</th>
                  <th className="pb-3 text-center">Ter 06</th>
                  <th className="pb-3 text-center">Qua 07</th>
                  <th className="pb-3 text-center">Qui 08</th>
                  <th className="pb-3 text-center">Sex 09</th>
                  <th className="pb-3 text-center">Sáb 10</th>
                  <th className="pb-3 text-center">Dom 11</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono text-xs">
                {staff.slice(0, 6).map((person, idx) => (
                  <tr key={person.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3 font-sans font-semibold text-slate-200">
                      {person.name} ({person.unitId})
                    </td>
                    {['06h-14h', '06h-14h', '06h-14h', '06h-14h', '06h-14h', 'FOLGA', 'FOLGA'].map((shift, sIdx) => {
                      const isFolga = shift === 'FOLGA';
                      return (
                        <td key={sIdx} className="py-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              isFolga ? 'bg-slate-800 text-slate-500' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                            }`}
                          >
                            {shift}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUTIVIDADE */}
      {activeTab === 'produtividade' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100">Indicadores de Produtividade Operacional</h3>
            <span className="text-xs text-slate-400">Tempo Médio Meta: &lt; 90 segundos</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {staff.filter((s) => s.dailyOperationsCount > 0).map((p) => (
              <div key={p.id} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200 text-xs">{p.name}</span>
                  <span className="font-mono text-xs text-amber-400 font-bold">{p.unitId}</span>
                </div>
                <div className="text-[11px] text-slate-400">{p.role}</div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px]">Operações/Dia</span>
                    <div className="font-bold text-emerald-400 text-base">{p.dailyOperationsCount}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Tempo Médio</span>
                    <div className="font-bold text-amber-400 text-base">{p.averageServiceMinutes} min</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: RBAC PERMISSIONS MATRIX */}
      {activeTab === 'permissoes' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Segurança & Controle de Acesso</div>
              <h3 className="text-sm font-bold text-slate-100">Matriz Corporativa de Permissões RBAC</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-400 uppercase">
                  <th className="pb-3 font-sans">Módulo do Sistema</th>
                  {rolesList.map((r) => (
                    <th key={r.role} className="pb-3 text-center">{r.role.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {rbacModules.map((m) => (
                  <tr key={m.perm} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3 font-sans font-semibold text-slate-200">{m.name}</td>
                    {rolesList.map((r) => {
                      const isDiretor = r.role === 'diretor';
                      const isAuditor = r.role === 'auditor' && m.perm.includes('view');
                      const isAllowed = isDiretor || isAuditor || (r.role === 'gestor') || (r.role === 'operacional' && (m.perm.includes('operation') || m.perm.includes('volumes')));

                      return (
                        <td key={r.role} className="py-3 text-center">
                          {isAllowed ? (
                            <span className="text-emerald-400 font-bold inline-block">✓</span>
                          ) : (
                            <span className="text-slate-600 inline-block">-</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
