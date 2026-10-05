import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IncidentOccurrence } from '../../types';
import {
  AlertOctagon,
  Plus,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Search,
  Building2,
  AlertTriangle
} from 'lucide-react';

export const OccurrencesModule: React.FC = () => {
  const {
    occurrences,
    selectedUnitId,
    addOccurrence,
    resolveOccurrence,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'abertas' | 'todas' | 'indicadores'>('abertas');
  const [selectedOccurrence, setSelectedOccurrence] = useState<IncidentOccurrence | null>(null);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [correctiveActionText, setCorrectiveActionText] = useState('');

  // New Occurrence form modal state
  const [isNewOccurrenceOpen, setIsNewOccurrenceOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<IncidentOccurrence['category']>('Volume / Bagagem');
  const [newPriority, setNewPriority] = useState<IncidentOccurrence['priority']>('Alta');
  const [newUnit, setNewUnit] = useState('CGH');

  const filteredOccurrences = occurrences.filter((o) => {
    const matchesUnit = selectedUnitId === 'all' || o.unitId === selectedUnitId;
    const matchesTab = activeTab === 'todas' || (o.status === 'Aberta' || o.status === 'Em Resolução');
    return matchesUnit && matchesTab;
  });

  const handleCreateOccurrence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addOccurrence({
      unitId: newUnit,
      category: newCategory,
      priority: newPriority,
      reportedBy: 'Operador de Plantão',
      assignedTo: 'Supervisão de Base',
      title: newTitle,
      description: newDesc
    });

    setIsNewOccurrenceOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleConfirmResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOccurrence || !correctiveActionText.trim()) return;

    resolveOccurrence(selectedOccurrence.id, correctiveActionText);
    setIsResolveModalOpen(false);
    setSelectedOccurrence(null);
    setCorrectiveActionText('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">
            Qualidade Operacional & Gestão de Incidentes
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Central de Ocorrências & Auditoria de Não-Conformidades
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Registro de avarias prévias identificadas no check-in, recusas ANAC e divergências de etiquetas.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('abertas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'abertas' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pendentes / Abertas
            </button>
            <button
              onClick={() => setActiveTab('todas')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'todas' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Histórico Completo
            </button>
          </div>

          <button
            onClick={() => setIsNewOccurrenceOpen(true)}
            className="px-3.5 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-rose-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Abrir Ocorrência</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                <th className="pb-3">Protocolo / Data</th>
                <th className="pb-3">Base</th>
                <th className="pb-3">Categoria</th>
                <th className="pb-3">Prioridade</th>
                <th className="pb-3">Descrição do Fato</th>
                <th className="pb-3">Responsável</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOccurrences.map((occ) => (
                <tr key={occ.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3">
                    <div className="font-mono font-bold text-rose-400">{occ.protocol}</div>
                    <div className="text-[10px] font-mono text-slate-500">{occ.date} às {occ.time}</div>
                  </td>
                  <td className="py-3 font-mono text-amber-400 font-bold">{occ.unitId}</td>
                  <td className="py-3 text-slate-300 font-mono text-[11px]">{occ.category}</td>
                  <td className="py-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        occ.priority === 'Crítica'
                          ? 'bg-rose-500/20 text-rose-400'
                          : occ.priority === 'Alta'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}
                    >
                      {occ.priority}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="font-semibold text-slate-200">{occ.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-1">{occ.description}</div>
                  </td>
                  <td className="py-3 text-slate-300">{occ.assignedTo}</td>
                  <td className="py-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        occ.status === 'Resolvida'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}
                    >
                      {occ.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    {occ.status !== 'Resolvida' && (
                      <button
                        onClick={() => {
                          setSelectedOccurrence(occ);
                          setIsResolveModalOpen(true);
                        }}
                        className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-semibold cursor-pointer"
                      >
                        Resolver
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resolution Modal */}
      {isResolveModalOpen && selectedOccurrence && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsResolveModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-slate-100">
              Registrar Solução · {selectedOccurrence.protocol}
            </h3>
            <p className="text-xs text-slate-400">
              {selectedOccurrence.title}
            </p>

            <form onSubmit={handleConfirmResolve} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Ação Corretiva & Preventiva Adotada *
                </label>
                <textarea
                  rows={3}
                  required
                  value={correctiveActionText}
                  onChange={(e) => setCorrectiveActionText(e.target.value)}
                  placeholder="Descreva a providência tomada para mitigar e encerrar a ocorrência..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsResolveModalOpen(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                >
                  Arquivar como Resolvida
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Occurrence Modal */}
      {isNewOccurrenceOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsNewOccurrenceOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-slate-100">Abrir Novo Protocolo de Ocorrência</h3>
            <form onSubmit={handleCreateOccurrence} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Título do Incidente *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Identificação de objeto não permitido / Mala avariada"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Categoria</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                  >
                    <option value="Volume / Bagagem">Volume / Bagagem</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Operação">Operação</option>
                    <option value="Equipamento">Equipamento</option>
                    <option value="Segurança">Segurança (ANAC)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Prioridade</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                    <option value="Crítica">Crítica</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Descrição Circunstanciada *</label>
                <textarea
                  rows={3}
                  required
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Relato detalhado dos fatos observados no balcão..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewOccurrenceOpen(false)}
                  className="px-3 py-1.5 text-slate-400 hover:text-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                >
                  Registrar Protocolo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
