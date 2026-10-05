import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Lead } from '../../types';
import {
  Briefcase,
  Plus,
  Users,
  Clock,
  Phone,
  Calendar,
  FileText,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

export const CommercialModule: React.FC = () => {
  const {
    leads,
    followUps,
    proposals,
    partners,
    updateLeadStage,
    addLead,
    completeFollowUp,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pipeline' | 'leads' | 'followups' | 'propostas' | 'parceiros'>('pipeline');
  const [selectedLeadForDetail, setSelectedLeadForDetail] = useState<Lead | null>(null);

  // Quick New Lead Form Modal State
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newVal, setNewVal] = useState(50000);
  const [newUnit, setNewUnit] = useState('CGH');
  const [newSegment, setNewSegment] = useState<Lead['segment']>('Hotel de Trânsito');

  const pipelineStages: { stage: Lead['stage']; label: string; color: string }[] = [
    { stage: 'lead', label: 'Lead Inbound', color: 'border-slate-700' },
    { stage: 'contacted', label: 'Contato Feito', color: 'border-blue-600/60' },
    { stage: 'qualified', label: 'Qualificado', color: 'border-indigo-600/60' },
    { stage: 'meeting', label: 'Reunião Agendada', color: 'border-purple-600/60' },
    { stage: 'proposal', label: 'Proposta Enviada', color: 'border-amber-600/60' },
    { stage: 'negotiation', label: 'Em Negociação', color: 'border-orange-600/60' },
    { stage: 'won', label: 'Ganho / Fechado', color: 'border-emerald-600/60' },
    { stage: 'lost', label: 'Perdido', color: 'border-rose-900/60' }
  ];

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim()) return;
    addLead({
      companyName: newCompany,
      contactName: newContact,
      email: newEmail,
      phone: newPhone,
      stage: 'lead',
      potentialValue: newVal,
      airportUnit: newUnit,
      segment: newSegment,
      owner: 'Renata Figueiredo',
      nextFollowUp: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      notes: 'Cadastrado via CRM Balcão/Web'
    });
    setIsNewLeadModalOpen(false);
    setNewCompany('');
    setNewContact('');
    setNewPhone('');
    setNewEmail('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            CRM Corporativo & Parcerias
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Pipeline Comercial, Convênios & Follow-ups
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gestão de acordos corporativos com companhias aéreas, hotéis de trânsito e agências de turismo.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Submenu Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'pipeline' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pipeline Kanban
            </button>
            <button
              onClick={() => setActiveTab('followups')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'followups' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Central de Follow-up
            </button>
            <button
              onClick={() => setActiveTab('propostas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'propostas' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Propostas
            </button>
            <button
              onClick={() => setActiveTab('parceiros')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'parceiros' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Parceiros Ativos
            </button>
          </div>

          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Novo Lead</span>
          </button>
        </div>
      </div>

      {/* TAB 1: PIPELINE KANBAN */}
      {activeTab === 'pipeline' && (
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1250px]">
            {pipelineStages.map((col) => {
              const stageLeads = leads.filter((l) => l.stage === col.stage);
              const stageVal = stageLeads.reduce((acc, l) => acc + l.potentialValue, 0);

              return (
                <div
                  key={col.stage}
                  className="flex-1 min-w-[240px] bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col max-h-[75vh]"
                >
                  {/* Column Header */}
                  <div className={`p-3 border-b-2 ${col.color} bg-slate-950/70 rounded-t-xl flex items-center justify-between`}>
                    <div>
                      <div className="text-xs font-bold text-slate-200">{col.label}</div>
                      <div className="text-[10px] font-mono text-slate-400">
                        {stageLeads.length} itens · R$ {(stageVal / 1000).toFixed(0)}k
                      </div>
                    </div>
                  </div>

                  {/* Cards List */}
                  <div className="flex-1 p-2 space-y-2.5 overflow-y-auto">
                    {stageLeads.length === 0 ? (
                      <div className="text-[11px] text-slate-600 text-center py-6 italic">
                        Sem oportunidades
                      </div>
                    ) : (
                      stageLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3 bg-slate-950/90 hover:bg-slate-850 rounded-xl border border-slate-800/80 hover:border-amber-500/50 transition-all text-xs space-y-2 shadow-sm"
                        >
                          <div className="flex items-start justify-between">
                            <span className="font-bold text-slate-100 line-clamp-1">{lead.companyName}</span>
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400">
                              {lead.airportUnit}
                            </span>
                          </div>

                          <div className="text-[11px] text-slate-400">{lead.contactName}</div>

                          <div className="flex items-center justify-between pt-1 border-t border-slate-800/60">
                            <span className="font-mono font-bold text-emerald-400">
                              R$ {lead.potentialValue.toLocaleString('pt-BR')}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500">
                              {lead.daysInStage}d no estágio
                            </span>
                          </div>

                          {/* Stage Transition Control */}
                          <div className="pt-2 flex items-center justify-between gap-1">
                            <select
                              value={lead.stage}
                              onChange={(e) => updateLeadStage(lead.id, e.target.value as Lead['stage'])}
                              className="text-[10px] bg-slate-900 border border-slate-700 text-slate-300 rounded px-1.5 py-1 w-full"
                            >
                              {pipelineStages.map((s) => (
                                <option key={s.stage} value={s.stage}>
                                  Mover para: {s.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CENTRAL DE FOLLOW-UP */}
      {activeTab === 'followups' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Central de Relacionamento</div>
              <h3 className="text-sm font-bold text-slate-100">Fila de Follow-ups e Próximos Passos</h3>
            </div>
            <span className="text-xs text-slate-400">{followUps.length} ações mapeadas</span>
          </div>

          <div className="space-y-3">
            {followUps.map((flw) => (
              <div
                key={flw.id}
                className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors ${
                  flw.status === 'overdue'
                    ? 'bg-rose-950/20 border-rose-800/40'
                    : flw.status === 'completed'
                    ? 'bg-slate-950/40 border-slate-800 opacity-60'
                    : 'bg-slate-950/70 border-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-100">{flw.companyName}</span>
                    <span className="text-slate-500">· {flw.contactName}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Canal: {flw.channel}
                    </span>
                    {flw.status === 'overdue' && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold">
                        ATRASADO
                      </span>
                    )}
                  </div>
                  <div className="text-slate-300">
                    <strong className="text-amber-400">Próxima ação: </strong>
                    <span>{flw.nextAction}</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    Prazo: {flw.dueDate} · Responsável: {flw.responsible} · Notas: {flw.notes}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {flw.status !== 'completed' && (
                    <button
                      onClick={() => completeFollowUp(flw.id)}
                      className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Concluir</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PROPOSTAS */}
      {activeTab === 'propostas' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Propostas Comerciais</div>
              <h3 className="text-sm font-bold text-slate-100">Gerenciador de Propostas e Contratos</h3>
            </div>
            <button
              onClick={() => showToast('Proposta', 'Emissor de proposta comercial aberto.', 'info')}
              className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
            >
              + Nova Proposta
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                  <th className="pb-3">Número / Cliente</th>
                  <th className="pb-3">Valor Estimado</th>
                  <th className="pb-3">Emissão</th>
                  <th className="pb-3">Validade</th>
                  <th className="pb-3">Responsável</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {proposals.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3">
                      <div className="font-mono font-bold text-amber-400">{prop.proposalNumber}</div>
                      <div className="font-semibold text-slate-200">{prop.companyName}</div>
                      <div className="text-[11px] text-slate-400">{prop.clientName}</div>
                    </td>
                    <td className="py-3 font-mono font-bold text-slate-100">
                      R$ {prop.value.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 font-mono text-slate-400">{prop.createdAt}</td>
                    <td className="py-3 font-mono text-slate-400">{prop.expiresAt}</td>
                    <td className="py-3 text-slate-300">{prop.responsible}</td>
                    <td className="py-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold">
                        {prop.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => showToast('Visualizar Proposta', `PDF da proposta ${prop.proposalNumber} gerado para envio.`, 'info')}
                        className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: PARCEIROS ATIVOS */}
      {activeTab === 'parceiros' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Rede de Parceiros</div>
              <h3 className="text-sm font-bold text-slate-100">Concessionárias & Convênios Comerciais</h3>
            </div>
            <span className="text-xs text-slate-400">{partners.length} parceiros credenciados</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {partners.map((p) => (
              <div key={p.id} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {p.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 mt-1">{p.partnerName}</h4>
                    <div className="text-xs text-slate-400 mt-0.5">Contato: {p.contactPerson} · {p.phone}</div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                    {p.commissionPercentage}% Comissão
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/60 font-mono">
                  <div>
                    <span className="text-slate-500">Receita Gerada: </span>
                    <span className="font-bold text-emerald-400">R$ {p.revenueGeneratedTotal.toLocaleString('pt-BR')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Passageiros: </span>
                    <span className="text-slate-200">{p.clientsReferredTotal.toLocaleString('pt-BR')}</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 flex justify-between">
                  <span>Vigência do contrato: {p.contractEnd}</span>
                  <span className="text-emerald-400 font-bold uppercase">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Lead Modal */}
      {isNewLeadModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsNewLeadModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-slate-100">Cadastrar Nova Oportunidade / Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome da Empresa / Companhia *</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Ex: Hotel Grand Hyatt / CVC São Paulo"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Contato Responsável</label>
                  <input
                    type="text"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    placeholder="Nome do gestor"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Segmento</label>
                  <select
                    value={newSegment}
                    onChange={(e) => setNewSegment(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                  >
                    <option value="Hotel de Trânsito">Hotel de Trânsito</option>
                    <option value="Companhia Aérea">Companhia Aérea</option>
                    <option value="Agência de Turismo">Agência de Turismo</option>
                    <option value="Corporativo">Corporativo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="(11) 98888-0000"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Receita Potencial Estimada (R$)</label>
                  <input
                    type="number"
                    value={newVal}
                    onChange={(e) => setNewVal(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewLeadModalOpen(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                >
                  Salvar Oportunidade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
