import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AssetEquipment } from '../../types';
import {
  Wrench,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Building2,
  Search,
  Clock,
  ShieldCheck
} from 'lucide-react';

export const AssetsModule: React.FC = () => {
  const { assets, selectedUnitId, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'ativos' | 'manutencao'>('ativos');

  const filteredAssets = assets.filter(
    (a) => selectedUnitId === 'all' || a.unitId === selectedUnitId
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Infraestrutura & Equipamentos de Pista
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Ativos, Calibração & Manutenção Preventiva
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Controle patrimonial de balanças digitais certificadas pelo IPEM/INMETRO, impressoras térmicas e leitores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('ativos')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'ativos' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Inventário de Ativos
            </button>
            <button
              onClick={() => setActiveTab('manutencao')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeTab === 'manutencao' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Manutenções & Calibração
            </button>
          </div>

          <button
            onClick={() => showToast('Novo Ativo', 'Cadastro de equipamento aberto.', 'info')}
            className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>+ Novo Ativo</span>
          </button>
        </div>
      </div>

      {activeTab === 'ativos' ? (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                  <th className="pb-3">Código Patrimonial</th>
                  <th className="pb-3">Equipamento / Descrição</th>
                  <th className="pb-3">Base</th>
                  <th className="pb-3">Responsável</th>
                  <th className="pb-3">Valor Contábil</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3 font-mono font-bold text-amber-400">{asset.assetCode}</td>
                    <td className="py-3 font-semibold text-slate-200">{asset.name}</td>
                    <td className="py-3 font-mono text-slate-400">{asset.unitId}</td>
                    <td className="py-3 text-slate-300">{asset.responsible}</td>
                    <td className="py-3 font-mono text-slate-300">R$ {asset.value.toFixed(2)}</td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                          asset.status === 'Operacional'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => showToast('Ordem de Serviço', `OS aberta para ${asset.name}.`, 'info')}
                        className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                      >
                        Abrir OS
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-100">Cronograma de Manutenção Preventiva & Calibração INMETRO</h3>
          <div className="space-y-3 text-xs">
            {assets.map((asset) => (
              <div key={asset.id} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-200">{asset.name} ({asset.assetCode})</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Unidade: {asset.unitId} · Responsável: {asset.responsible}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-[11px]">Próxima Manutenção / Aferição:</div>
                  <div className="font-mono font-bold text-amber-400">{asset.nextMaintenanceDate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
