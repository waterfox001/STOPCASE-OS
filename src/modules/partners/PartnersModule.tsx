import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileSpreadsheet, Building2, Plus, Calendar, AlertTriangle, ShieldCheck } from 'lucide-react';

export const PartnersModule: React.FC = () => {
  const { partners, showToast } = useApp();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Relações Institucionais & Aeroportos
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Parceiros, Concessões & Contratos
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Gestão de outorgas comerciais de aeroportos (Aena, Fraport, VINCI, CCR) e acordos de canal hoteleiro.
          </p>
        </div>

        <button
          onClick={() => showToast('Novo Contrato', 'Formulário de credenciamento aberto.', 'info')}
          className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>+ Novo Contrato / Parceiro</span>
        </button>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                <th className="pb-3">Entidade / Concessionária</th>
                <th className="pb-3">Tipo de Parceria</th>
                <th className="pb-3">Contato Operacional</th>
                <th className="pb-3">Base</th>
                <th className="pb-3">Comissão / Remuneração</th>
                <th className="pb-3">Receita Acumulada</th>
                <th className="pb-3">Término de Vigência</th>
                <th className="pb-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3 font-semibold text-slate-100">{p.partnerName}</td>
                  <td className="py-3 text-slate-300">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {p.type}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400">{p.contactPerson} · {p.phone}</td>
                  <td className="py-3 font-mono text-amber-400 font-bold">{p.unitId}</td>
                  <td className="py-3 font-mono text-slate-200">{p.commissionPercentage}%</td>
                  <td className="py-3 font-mono font-bold text-emerald-400">
                    R$ {p.revenueGeneratedTotal.toLocaleString('pt-BR')}
                  </td>
                  <td className="py-3 font-mono text-slate-400">{p.contractEnd}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => showToast('Contrato', `Minuta do contrato ${p.id} visualizada.`, 'info')}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                    >
                      Detalhes
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
