import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SOPDocument } from '../../types';
import { BookOpen, Copy, CheckCircle2, Search, FileText, ChevronRight, Layers } from 'lucide-react';

export const KnowledgeModule: React.FC = () => {
  const { sops, showToast } = useApp();

  const [selectedSop, setSelectedSop] = useState<SOPDocument>(sops[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSops = sops.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyScript = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('Script Copiado', 'Conteúdo copiado para a área de transferência com sucesso.', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Intranet & Base Operacional
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Central de Conhecimento, SOPs & Scripts de Atendimento
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manuais de procedimento operacional padrão (SOP), diretrizes ANAC e roteiros humanizados de balcão.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Document List */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar manual ou SOP..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="space-y-2">
            {filteredSops.map((sop) => {
              const isSelected = selectedSop.id === sop.id;
              return (
                <div
                  key={sop.id}
                  onClick={() => setSelectedSop(sop)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-amber-300'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className="font-bold text-amber-400">{sop.code}</span>
                    <span className="text-slate-500">{sop.version}</span>
                  </div>
                  <div className="font-bold text-slate-100 line-clamp-2">{sop.title}</div>
                  <div className="text-[10px] text-slate-500 mt-1">Área: {sop.area} · {sop.stepsCount} etapas</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed SOP View (2 cols) */}
        <div className="lg:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-5">
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono mb-1">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold">{selectedSop.code}</span>
                <span className="text-slate-500">Versão: {selectedSop.version}</span>
                <span className="text-slate-500">· Resp: {selectedSop.author}</span>
              </div>
              <h3 className="text-base font-bold text-slate-100">{selectedSop.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedSop.summary}</p>
            </div>

            <button
              onClick={() => handleCopyScript(selectedSop.steps.map((s) => `${s.stepNumber}. ${s.title}: ${s.instruction}`).join('\n\n'))}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copiar Conteúdo</span>
            </button>
          </div>

          {/* SOP Steps */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Passos Obrigatórios do Procedimento:
            </div>

            <div className="space-y-3">
              {selectedSop.steps.map((step) => (
                <div key={step.stepNumber} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-mono flex items-center justify-center text-[10px]">
                      {step.stepNumber}
                    </span>
                    <span>{step.title}</span>
                  </div>
                  <p className="text-slate-400 pl-7 leading-relaxed">{step.instruction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
