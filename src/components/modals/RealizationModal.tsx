import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Target, X, Plus, History, CheckCircle2, TrendingUp, Calendar, User, FileText } from 'lucide-react';

export const RealizationModal: React.FC = () => {
  const {
    activeKrForRealization,
    setActiveKrForRealization,
    objectives,
    registerRealization,
    userProfile
  } = useApp();

  const [addedValue, setAddedValue] = useState<number>(0);
  const [period, setPeriod] = useState<string>('Outubro 2026');
  const [notes, setNotes] = useState<string>('');
  const [responsible, setResponsible] = useState<string>('');

  // Find targeted KR
  let targetKr = null;
  let targetObj = null;

  for (const obj of objectives) {
    const kr = obj.keyResults.find((k) => k.id === activeKrForRealization);
    if (kr) {
      targetKr = kr;
      targetObj = obj;
      break;
    }
  }

  useEffect(() => {
    if (targetKr) {
      setAddedValue(0);
      setNotes('');
      setResponsible(userProfile === 'diretor' ? 'Guilherme Toledo (Diretor)' : 'Marcelo Araripe (Gestor)');
    }
  }, [activeKrForRealization]);

  if (!activeKrForRealization || !targetKr) return null;

  const current = targetKr.currentValue;
  const target = targetKr.targetValue;
  const projectedNewCurrent = Number((current + addedValue).toFixed(2));
  
  let projectedProgress = 0;
  let remaining = 0;

  if (targetKr.targetValue > targetKr.initialValue) {
    projectedProgress = Math.min(
      100,
      Math.round(((projectedNewCurrent - targetKr.initialValue) / (targetKr.targetValue - targetKr.initialValue)) * 100)
    );
    remaining = Math.max(0, target - projectedNewCurrent);
  } else {
    // Inverse metric (e.g. time reduction)
    projectedProgress = Math.min(
      100,
      Math.round(((targetKr.initialValue - projectedNewCurrent) / (targetKr.initialValue - targetKr.targetValue)) * 100)
    );
    remaining = Math.max(0, projectedNewCurrent - target);
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (addedValue === 0) return;
    registerRealization(targetKr.id, addedValue, period, notes);
    setActiveKrForRealization(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={() => setActiveKrForRealization(null)}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Sistema de Abatimento & Atualização de Resultados
              </div>
              <h2 className="text-base font-bold text-slate-100">{targetKr.title}</h2>
            </div>
          </div>
          <button
            onClick={() => setActiveKrForRealization(null)}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Status Comparison Box */}
        <div className="p-5 bg-slate-950/40 border-b border-slate-800">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Meta / Alvo</div>
              <div className="text-base font-bold font-mono text-slate-200 tabular-nums mt-1">
                {targetKr.metricType === 'currency' ? `R$ ${target.toLocaleString('pt-BR')}` : `${target} ${targetKr.unit}`}
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Realizado Atual</div>
              <div className="text-base font-bold font-mono text-amber-400 tabular-nums mt-1">
                {targetKr.metricType === 'currency' ? `R$ ${current.toLocaleString('pt-BR')}` : `${current} ${targetKr.unit}`}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">{targetKr.progress}% atingido</div>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/30">
              <div className="text-[11px] text-amber-300 font-medium">Nova Projeção</div>
              <div className="text-base font-extrabold font-mono text-amber-400 tabular-nums mt-1">
                {targetKr.metricType === 'currency' ? `R$ ${projectedNewCurrent.toLocaleString('pt-BR')}` : `${projectedNewCurrent} ${targetKr.unit}`}
              </div>
              <div className="text-[10px] font-bold text-emerald-400 font-mono mt-0.5">
                {projectedProgress}% (+{Math.max(0, projectedProgress - targetKr.progress)}%)
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
              <div className="text-[11px] text-slate-400 font-medium">Restante para Meta</div>
              <div className="text-base font-bold font-mono text-slate-300 tabular-nums mt-1">
                {targetKr.metricType === 'currency' ? `R$ ${remaining.toLocaleString('pt-BR')}` : `${remaining} ${targetKr.unit}`}
              </div>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
              <span>Progresso Realizado: {targetKr.progress}%</span>
              <span>Projeção com acréscimo: {projectedProgress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden flex">
              <div
                className="bg-amber-500 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, targetKr.progress)}%` }}
              />
              {projectedProgress > targetKr.progress && (
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min(100 - targetKr.progress, projectedProgress - targetKr.progress)}%` }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSave} className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Quantidade / Valor a Adicionar ({targetKr.unit}) *
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  required
                  value={addedValue || ''}
                  onChange={(e) => setAddedValue(parseFloat(e.target.value) || 0)}
                  placeholder={`Ex: ${targetKr.metricType === 'currency' ? '5000' : '9'}`}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 font-mono font-bold focus:outline-none focus:border-amber-500"
                />
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Valor positivo incrementa o realizado e abate da meta restante.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Período de Referência *
              </label>
              <input
                type="text"
                required
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                placeholder="Ex: Semana 1 Outubro / Dia 05/10"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Responsável pelo Lançamento *
              </label>
              <input
                type="text"
                required
                value={responsible}
                onChange={(e) => setResponsible(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Data do Registro
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Observação / Justificativa da Realização
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Lançamento de faturamento consolidado de balcão do final de semana ou novo convênio fechado."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setActiveKrForRealization(null)}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={addedValue === 0}
              className="px-5 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-md shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirmar & Abater Meta</span>
            </button>
          </div>
        </form>

        {/* Audit History of Additions (Histórico Inalterável) */}
        <div className="p-5 bg-slate-950/80 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
            <History className="w-4 h-4 text-amber-400" />
            <span>Histórico de Realizações Registradas ({targetKr.realizations.length})</span>
          </div>

          {targetKr.realizations.length === 0 ? (
            <div className="text-xs text-slate-500 italic py-2">
              Nenhuma realização anterior registrada para este KR.
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {targetKr.realizations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-200 flex items-center gap-2">
                      <span className="font-mono text-emerald-400 font-bold">
                        +{targetKr.metricType === 'currency' ? `R$ ${rec.addedValue.toLocaleString('pt-BR')}` : rec.addedValue}
                      </span>
                      <span className="text-slate-400 font-normal">→ Total: {targetKr.metricType === 'currency' ? `R$ ${rec.newValue.toLocaleString('pt-BR')}` : rec.newValue}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {rec.notes}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-[10px] font-mono text-slate-400">{rec.date} · {rec.period}</div>
                    <div className="text-[10px] text-slate-500">{rec.user}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
