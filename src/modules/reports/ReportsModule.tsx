import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  Download,
  Printer,
  FileSpreadsheet,
  FileText,
  Filter,
  Calendar,
  Building2,
  TrendingUp,
  PieChart,
  CheckCircle2
} from 'lucide-react';

export const ReportsModule: React.FC = () => {
  const { units, selectedUnitId, showToast } = useApp();

  const [reportType, setReportType] = useState<'executivo' | 'financeiro' | 'operacional' | 'unidades'>('executivo');
  const [selectedFormat, setSelectedFormat] = useState<'csv' | 'pdf'>('pdf');

  const handleExport = () => {
    showToast(
      'Exportação Iniciada',
      `O relatório ${reportType.toUpperCase()} foi gerado e baixado no formato ${selectedFormat.toUpperCase()} com sucesso.`,
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Inteligência de Dados & BI
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Relatórios Corporativos & Business Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Consolidação analítica de receitas, fluxo de passageiros, ocupação média e exportação de dados para auditoria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedFormat('csv');
              handleExport();
            }}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 cursor-pointer flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>Exportar CSV</span>
          </button>
          <button
            onClick={() => {
              setSelectedFormat('pdf');
              handleExport();
            }}
            className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-amber-500/20 cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Relatório PDF</span>
          </button>
        </div>
      </div>

      {/* BI Analytics Visual Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Panel 1: Receita por Base Aeroporto */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100">Faturamento por Aeroporto (Outubro 2026)</h3>
            <span className="text-xs font-mono text-slate-400">Total: R$ 994.950</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {units.map((u) => {
              const pct = Math.round((u.monthlyRevenue / 994950) * 100);
              return (
                <div key={u.id} className="space-y-1">
                  <div className="flex justify-between text-slate-300">
                    <span className="font-sans font-semibold">{u.shortName} ({u.airportCode})</span>
                    <span className="font-bold text-slate-100">R$ {u.monthlyRevenue.toLocaleString('pt-BR')} ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel 2: Distribuição por Categoria de Bagagem */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-100">Distribuição por Categoria de Bagagem</h3>
            <span className="text-xs font-mono text-slate-400">Volumes Totais: 320</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-400 font-bold font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span>Pequeno (P) · Mochilas</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-200">18% (58 un)</div>
              <div className="text-[10px] text-slate-500">Ticket R$ 38,00</div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Médio (M) · Mala de Bordo</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-200">54% (172 un)</div>
              <div className="text-[10px] text-slate-500">Ticket R$ 52,00</div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Grande (G) · Despachada</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-200">22% (70 un)</div>
              <div className="text-[10px] text-slate-500">Ticket R$ 74,00</div>
            </div>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-400 font-bold font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span>Especial (ESP) · Pranchas</span>
              </div>
              <div className="text-lg font-bold font-mono text-slate-200">6% (20 un)</div>
              <div className="text-[10px] text-slate-500">Ticket R$ 98,00</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
