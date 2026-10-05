import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Target,
  Plus,
  TrendingUp,
  History,
  CheckCircle2,
  Calendar,
  AlertTriangle,
  Building2,
  Sliders,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const StrategyModule: React.FC = () => {
  const {
    objectives,
    units,
    setActiveKrForRealization,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'okrs' | 'unidades' | 'simulador' | 'checkins'>('okrs');

  // Scenario Simulator interactive sliders
  const [simReservasDelta, setSimReservasDelta] = useState<number>(10); // +10%
  const [simTicketDelta, setSimTicketDelta] = useState<number>(5); // +5%
  const [simOcupacaoDelta, setSimOcupacaoDelta] = useState<number>(4); // +4%
  const [simDespesasDelta, setSimDespesasDelta] = useState<number>(-5); // -5%

  const baseMonthlyRevenue = 994950;
  const baseMonthlyExpenses = 437000;
  const baseResult = baseMonthlyRevenue - baseMonthlyExpenses;

  // Real-time projected math
  const projectedRevenue = Number((baseMonthlyRevenue * (1 + (simReservasDelta + simTicketDelta + simOcupacaoDelta * 0.5) / 100)).toFixed(2));
  const projectedExpenses = Number((baseMonthlyExpenses * (1 + simDespesasDelta / 100)).toFixed(2));
  const projectedResult = Number((projectedRevenue - projectedExpenses).toFixed(2));
  const projectedMargin = Math.round((projectedResult / projectedRevenue) * 100);

  // Targets by unit
  const unitTargets = [
    { code: 'CGH', name: 'Congonhas', target: 330000, current: 342100, status: 'achieved' },
    { code: 'FOR', name: 'Fortaleza', target: 210000, current: 194850, status: 'on_track' },
    { code: 'REC', name: 'Recife', target: 180000, current: 172900, status: 'on_track' },
    { code: 'SSA', name: 'Salvador', target: 160000, current: 146700, status: 'on_track' },
    { code: 'POA', name: 'Porto Alegre', target: 155000, current: 138400, status: 'at_risk' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Gestão Estratégica & Desdobramento
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Estratégia Corporativa, OKRs & Metas
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Acompanhe o cumprimento dos Key Results e utilize o sistema de abatimento de realizações.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('okrs')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'okrs' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Objetivos & KRs
          </button>
          <button
            onClick={() => setActiveTab('unidades')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'unidades' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Metas por Unidade
          </button>
          <button
            onClick={() => setActiveTab('simulador')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'simulador' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Simulador de Cenários
          </button>
          <button
            onClick={() => setActiveTab('checkins')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'checkins' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Check-ins Periódicos
          </button>
        </div>
      </div>

      {/* TAB 1: OKRS & KEY RESULTS COM SISTEMA DE ABATIMENTO */}
      {activeTab === 'okrs' && (
        <div className="space-y-6">
          {objectives.map((obj) => (
            <div key={obj.id} className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
              {/* Objective Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                        {obj.area}
                      </span>
                      <span className="text-xs text-slate-500">Ciclo {obj.cycle}</span>
                      <span className="text-xs text-slate-500">· Resp: {obj.owner}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-100 mt-1">{obj.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{obj.description}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono text-slate-400">Progresso Geral</div>
                  <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
                    {obj.progress}%
                  </div>
                </div>
              </div>

              {/* Key Results Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {obj.keyResults.map((kr) => {
                  const target = kr.targetValue;
                  const current = kr.currentValue;
                  const remaining = Math.max(0, target - current);

                  return (
                    <div
                      key={kr.id}
                      className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">
                            {kr.id} · Prazo: {new Date(kr.deadline).toLocaleDateString('pt-BR')}
                          </span>
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                              kr.status === 'achieved'
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : kr.status === 'on_track'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-amber-500/20 text-amber-400'
                            }`}
                          >
                            {kr.status === 'achieved' ? 'ATINGIDO' : kr.status === 'on_track' ? 'NO RITMO' : 'EM RISCO'}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-100">{kr.title}</h4>
                        <div className="text-[11px] text-slate-400">Responsável: {kr.owner}</div>
                      </div>

                      {/* Progress Bar & Realized vs Target numbers */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/60">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-slate-400">
                            Realizado: <strong className="text-amber-400">{kr.metricType === 'currency' ? `R$ ${current.toLocaleString('pt-BR')}` : `${current} ${kr.unit}`}</strong>
                          </span>
                          <span className="text-slate-400">
                            Alvo: <strong>{kr.metricType === 'currency' ? `R$ ${target.toLocaleString('pt-BR')}` : `${target} ${kr.unit}`}</strong>
                          </span>
                        </div>

                        <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-500 h-full rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(100, kr.progress)}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-mono text-slate-500">
                            Faltam: {kr.metricType === 'currency' ? `R$ ${remaining.toLocaleString('pt-BR')}` : `${remaining} ${kr.unit}`} ({kr.progress}%)
                          </span>
                          <span className="text-slate-500">
                            {kr.realizations.length} lançamentos
                          </span>
                        </div>
                      </div>

                      {/* Realization Button (Sistema de Abatimento) */}
                      <div className="pt-2 flex items-center justify-between">
                        <button
                          onClick={() => setActiveKrForRealization(kr.id)}
                          className="w-full py-2 bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Registrar Realização / Abater Meta</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: METAS POR UNIDADE AEROPORTO */}
      {activeTab === 'unidades' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Desdobramento por Base</div>
              <h3 className="text-sm font-bold text-slate-100">Performance das 5 Unidades vs. Meta Mensal</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Consolidado Outubro 2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                  <th className="pb-3">Unidade / Aeroporto</th>
                  <th className="pb-3">Meta Mensal</th>
                  <th className="pb-3">Realizado Atual</th>
                  <th className="pb-3">% Atingido</th>
                  <th className="pb-3">Diferença</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {unitTargets.map((u) => {
                  const pct = Math.round((u.current / u.target) * 100);
                  const diff = u.current - u.target;

                  return (
                    <tr key={u.code} className="hover:bg-slate-850/60 transition-colors">
                      <td className="py-3 font-semibold text-slate-200 flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold">
                          {u.code}
                        </span>
                        <span>{u.name}</span>
                      </td>
                      <td className="py-3 font-mono text-slate-300">
                        R$ {u.target.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 font-mono font-bold text-slate-100">
                        R$ {u.current.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 font-mono">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${pct >= 100 ? 'bg-emerald-400' : 'bg-amber-400'}`}
                              style={{ width: `${Math.min(100, pct)}%` }}
                            />
                          </div>
                          <span className="font-bold text-slate-200">{pct}%</span>
                        </div>
                      </td>
                      <td className="py-3 font-mono">
                        <span className={diff >= 0 ? 'text-emerald-400' : 'text-slate-400'}>
                          {diff >= 0 ? '+' : ''}R$ {diff.toLocaleString('pt-BR')}
                        </span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            pct >= 100
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : pct >= 85
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {pct >= 100 ? 'SUPERADA' : pct >= 85 ? 'EM LINHA' : 'ATENÇÃO'}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => showToast('Desdobramento', `Metas detalhadas da base ${u.code} abertas.`, 'info')}
                          className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                        >
                          Ajustar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SIMULADOR DE CENÁRIOS */}
      {activeTab === 'simulador' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">
                Ferramenta Preditiva de Gestão
              </div>
              <h3 className="text-base font-bold text-slate-100">
                Simulador de Cenários & Sensibilidade Financeira
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Altere as variáveis operacionais para simular em tempo real o impacto na receita, custos e margem líquida.
              </p>
            </div>
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
              <Sliders className="w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Interactive Variable Sliders */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1.5">
                  <span>Volume de Reservas (%):</span>
                  <span className="font-mono text-amber-400">{simReservasDelta > 0 ? `+${simReservasDelta}%` : `${simReservasDelta}%`}</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="50"
                  value={simReservasDelta}
                  onChange={(e) => setSimReservasDelta(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>-30%</span>
                  <span>0%</span>
                  <span>+50%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1.5">
                  <span>Ticket Médio por Bagagem (%):</span>
                  <span className="font-mono text-amber-400">{simTicketDelta > 0 ? `+${simTicketDelta}%` : `${simTicketDelta}%`}</span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="40"
                  value={simTicketDelta}
                  onChange={(e) => setSimTicketDelta(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>-20%</span>
                  <span>0%</span>
                  <span>+40%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1.5">
                  <span>Taxa de Ocupação Média (%):</span>
                  <span className="font-mono text-amber-400">{simOcupacaoDelta > 0 ? `+${simOcupacaoDelta}%` : `${simOcupacaoDelta}%`}</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="20"
                  value={simOcupacaoDelta}
                  onChange={(e) => setSimOcupacaoDelta(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>-15%</span>
                  <span>0%</span>
                  <span>+20%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1.5">
                  <span>Otimização de Custos & Despesas (%):</span>
                  <span className="font-mono text-emerald-400">{simDespesasDelta > 0 ? `+${simDespesasDelta}%` : `${simDespesasDelta}%`}</span>
                </div>
                <input
                  type="range"
                  min="-25"
                  max="25"
                  value={simDespesasDelta}
                  onChange={(e) => setSimDespesasDelta(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>-25% (Economia)</span>
                  <span>0%</span>
                  <span>+25%</span>
                </div>
              </div>
            </div>

            {/* Right: Real-time Projected Outputs */}
            <div className="p-5 bg-slate-950/70 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Resultado Projetado da Simulação
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">Receita Atual vs. Simulada</div>
                      <div className="text-base font-bold font-mono text-amber-400">
                        R$ {projectedRevenue.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        +{Number((projectedRevenue - baseMonthlyRevenue).toFixed(2)).toLocaleString('pt-BR')}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">Despesas Operacionais Projetadas</div>
                      <div className="text-base font-bold font-mono text-slate-300">
                        R$ {projectedExpenses.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-slate-400">
                        {simDespesasDelta <= 0 ? 'Economia projetada' : 'Aumento de custos'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-emerald-400 uppercase font-mono font-bold">
                        Resultado Líquido Estimado
                      </div>
                      <div className="text-xl font-extrabold font-mono text-emerald-400">
                        R$ {projectedResult.toLocaleString('pt-BR')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-emerald-300">
                        {projectedMargin}% Margem
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                Esta simulação é reativa e baseada em taxas de conversão históricas das 5 bases operacionais da Stopcase.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CHECK-INS DE OKR */}
      {activeTab === 'checkins' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Cadência de Gestão</div>
              <h3 className="text-sm font-bold text-slate-100">Check-ins Periódicos de Liderança</h3>
            </div>
            <button
              onClick={() => showToast('Check-in', 'Novo formulário de check-in aberto para preenchimento.', 'info')}
              className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
            >
              + Novo Check-in
            </button>
          </div>

          <div className="space-y-3">
            {objectives.flatMap((o) => o.keyResults.flatMap((k) => k.checkIns)).map((chk) => (
              <div key={chk.id} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">{chk.user}</span>
                    <span className="text-slate-500">· {chk.date}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    Confiança: {chk.confidence}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1 text-slate-300">
                  <div>
                    <strong className="text-slate-200">Andamento: </strong>
                    <span>{chk.progressComment}</span>
                  </div>
                  <div>
                    <strong className="text-amber-400">Travas / Gargalos: </strong>
                    <span>{chk.blockers}</span>
                  </div>
                  <div>
                    <strong className="text-blue-400">Próximos Passos: </strong>
                    <span>{chk.nextSteps}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
