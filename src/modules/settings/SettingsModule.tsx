import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  Building2,
  DollarSign,
  Cpu,
  Share2,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';

export const SettingsModule: React.FC = () => {
  const { categories, units, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'empresa' | 'precos' | 'automacoes' | 'integracoes'>('precos');

  // Company Profile State
  const [razaoSocial, setRazaoSocial] = useState('STOPCASE SERVIÇOS AEROPORTUÁRIOS LTDA');
  const [nomeFantasia, setNomeFantasia] = useState('STOPCASE · Guarda-Volumes');
  const [cnpj, setCnpj] = useState('34.891.402/0001-88');

  // Automation triggers mock list
  const automationsList = [
    {
      id: 'AUTO-01',
      trigger: 'Quando uma reserva for criada no balcão ou web',
      action: 'Enviar confirmação com voucher QR Code por WhatsApp e e-mail',
      status: 'Ativo (Simulado)',
      badgeColor: 'bg-emerald-500/20 text-emerald-400'
    },
    {
      id: 'AUTO-02',
      trigger: 'Quando a ocupação da base atingir 90%',
      action: 'Disparar alerta executivo para o gestor e sugerir área pulmão',
      status: 'Ativo (Simulado)',
      badgeColor: 'bg-emerald-500/20 text-emerald-400'
    },
    {
      id: 'AUTO-03',
      trigger: 'Quando um follow-up comercial vencer sem resposta em 48h',
      action: 'Criar tarefa urgente de recontato na fila do responsável',
      status: 'Ativo (Simulado)',
      badgeColor: 'bg-emerald-500/20 text-emerald-400'
    },
    {
      id: 'AUTO-04',
      trigger: 'Quando o check-in de volume for concluído',
      action: 'Imprimir automaticamente 2 etiquetas térmicas na Zebra',
      status: 'Ativo (Simulado)',
      badgeColor: 'bg-emerald-500/20 text-emerald-400'
    }
  ];

  // Integrations list (Preparado para integração)
  const integrationsList = [
    {
      name: 'WhatsApp Business API',
      category: 'Mensageria & Notificações',
      desc: 'Envio automático de comprovantes, avisos de retirada e alertas ao passageiro.',
      status: 'Preparado para Integração'
    },
    {
      name: 'Gateway de Pagamento (Stone / Cielo / Pagar.me)',
      category: 'Finanças & Conciliação',
      desc: 'Processamento de transações de cartão e PIX com split automático de comissões.',
      status: 'Preparado para Integração'
    },
    {
      name: 'AODB Aeroportuário (Sistemas de Voos)',
      category: 'Conexão Aérea',
      desc: 'Sincronização em tempo real de horários e atrasos de voos de passageiros.',
      status: 'Preparado para Integração'
    },
    {
      name: 'Emissor Fiscal NFS-e / Danfe',
      category: 'Compliance Fiscal',
      desc: 'Transmissão automática de notas fiscais de serviço para prefeituras municipais.',
      status: 'Preparado para Integração'
    },
    {
      name: 'Totvs ERP / Protheus',
      category: 'Controladoria Corporativa',
      desc: 'Integração contábil e conciliação bancária centralizada.',
      status: 'Preparado para Integração'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Administração da Plataforma
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Configurações Globais do STOPCASE OS
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tabelas de tarifas por tamanho e permanência, dados cadastrais, regras de automação e integrações.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('precos')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'precos' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tabela de Preços
          </button>
          <button
            onClick={() => setActiveTab('empresa')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'empresa' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Dados da Empresa
          </button>
          <button
            onClick={() => setActiveTab('automacoes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'automacoes' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Automações
          </button>
          <button
            onClick={() => setActiveTab('integracoes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'integracoes' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Central de Integrações
          </button>
        </div>
      </div>

      {/* TAB 1: TABELA DE PREÇOS */}
      {activeTab === 'precos' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Precificação Dinâmica</div>
              <h3 className="text-sm font-bold text-slate-100">Tarifas Oficiais por Categoria & Período</h3>
            </div>
            <button
              onClick={() => showToast('Configurações Salvas', 'Novos valores tarifários gravados para todas as bases.', 'success')}
              className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                  <th className="pb-3">Código</th>
                  <th className="pb-3">Categoria</th>
                  <th className="pb-3">Dimensões ANAC</th>
                  <th className="pb-3">Peso Máximo</th>
                  <th className="pb-3">Tarifa / Hora</th>
                  <th className="pb-3">Diária Completa</th>
                  <th className="pb-3">Semanal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3 font-bold text-amber-400">{cat.code}</td>
                    <td className="py-3 font-sans font-semibold text-slate-200">{cat.name}</td>
                    <td className="py-3 text-slate-400">{cat.dimensions}</td>
                    <td className="py-3 text-slate-300">{cat.maxWeightKg} kg</td>
                    <td className="py-3 text-slate-200">R$ {cat.hourlyRate.toFixed(2)}</td>
                    <td className="py-3 font-bold text-emerald-400">R$ {cat.dailyRate.toFixed(2)}</td>
                    <td className="py-3 text-slate-300">R$ {cat.weeklyRate.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DADOS DA EMPRESA */}
      {activeTab === 'empresa' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 max-w-2xl mx-auto space-y-4 text-xs">
          <h3 className="text-sm font-bold text-slate-100 border-b border-slate-800 pb-2">
            Dados Cadastrais da Empresa Stopcase
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Razão Social</label>
              <input
                type="text"
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">Nome Fantasia</label>
              <input
                type="text"
                value={nomeFantasia}
                onChange={(e) => setNomeFantasia(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
              />
            </div>
            <div>
              <label className="block text-slate-400 font-semibold mb-1">CNPJ</label>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 font-mono"
              />
            </div>
          </div>
          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => showToast('Salvo', 'Dados cadastrais da Stopcase atualizados.', 'success')}
              className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg cursor-pointer"
            >
              Salvar Dados
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: AUTOMAÇÕES */}
      {activeTab === 'automacoes' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">Motor de Regras</div>
              <h3 className="text-sm font-bold text-slate-100">Automações de Eventos do Sistema</h3>
            </div>
            <span className="text-xs text-slate-400">4 rotinas ativas</span>
          </div>

          <div className="space-y-3">
            {automationsList.map((auto) => (
              <div
                key={auto.id}
                className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="font-semibold text-slate-200 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>{auto.trigger}</span>
                  </div>
                  <div className="text-slate-400 pl-6">
                    → Ação automática: <strong className="text-slate-300">{auto.action}</strong>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${auto.badgeColor} shrink-0`}>
                  {auto.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CENTRAL DE INTEGRAÇÕES */}
      {activeTab === 'integracoes' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Ecossistema Conectado</div>
              <h3 className="text-sm font-bold text-slate-100">Central de Integrações e APIs Externas</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrationsList.map((integ) => (
              <div key={integ.name} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {integ.category}
                  </span>
                  <h4 className="text-sm font-bold text-slate-100 mt-1">{integ.name}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{integ.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-amber-400 font-mono font-semibold">{integ.status}</span>
                  <button
                    onClick={() => showToast('Integração', `Parâmetros de webhook e credenciais para ${integ.name} abertos.`, 'info')}
                    className="text-xs text-slate-300 hover:text-slate-100 font-medium cursor-pointer"
                  >
                    Configurar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
