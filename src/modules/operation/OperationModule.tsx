import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VolumeItem } from '../../types';
import {
  Luggage,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  Scan,
  AlertTriangle,
  FileCheck,
  DollarSign,
  Plus,
  Search,
  Lock,
  Unlock
} from 'lucide-react';

export const OperationModule: React.FC = () => {
  const {
    units,
    selectedUnitId,
    volumes,
    reservations,
    checkInVolume,
    checkOutVolume,
    setSelectedVolumeId,
    setSelectedReservationId,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'central' | 'entrada' | 'retirada' | 'abertura_fechamento' | 'caixa'>('central');

  // Fast Check-in form state
  const [targetReservationCode, setTargetReservationCode] = useState('SC-28425');
  const [assignedLockerPosition, setAssignedLockerPosition] = useState('A05');
  const [entryNotes, setEntryNotes] = useState('');

  // Fast Checkout scan state
  const [checkoutCode, setCheckoutCode] = useState('');

  // Unit opening/closing checklist state
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, title: 'Conferência física dos armários e lacres invioláveis', done: true },
    { id: 2, title: 'Ligação e teste dos leitores de código de barras 2D', done: true },
    { id: 3, title: 'Abastecimento de bobinas térmicas na impressora Zebra', done: true },
    { id: 4, title: 'Contagem e conferência do fundo de troco do caixa operacional', done: true },
    { id: 5, title: 'Verificação do sinal de link Wi-Fi/Rede redundante do aeroporto', done: false }
  ]);

  const toggleChecklist = (id: number) => {
    setChecklistItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const currentUnit = units.find((u) => u.id === selectedUnitId) || units[0];

  const unitVolumes = volumes.filter((v) => selectedUnitId === 'all' || v.unitId === selectedUnitId);
  const storedVolumes = unitVolumes.filter((v) => v.status === 'stored');
  const retrievedToday = unitVolumes.filter((v) => v.status === 'retrieved');

  const handleSimulateCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    const relatedRes = reservations.find((r) => r.id.toLowerCase() === targetReservationCode.toLowerCase().trim());
    if (!relatedRes) {
      showToast('Reserva Não Encontrada', 'Verifique o código digitado.', 'warning');
      return;
    }

    const unassignedVol = volumes.find((v) => v.reservationId === relatedRes.id && v.status === 'awaiting_arrival');
    const targetVolId = unassignedVol ? unassignedVol.id : `SC-VOL-00${Math.floor(8400 + Math.random() * 500)}`;

    checkInVolume(targetVolId, assignedLockerPosition, entryNotes);
    setTargetReservationCode('');
    setEntryNotes('');
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutCode.trim()) return;

    const matchedVol = volumes.find(
      (v) =>
        (v.id.toLowerCase() === checkoutCode.toLowerCase().trim() ||
          v.tagNumber.toLowerCase() === checkoutCode.toLowerCase().trim() ||
          v.reservationId.toLowerCase() === checkoutCode.toLowerCase().trim()) &&
        v.status === 'stored'
    );

    if (!matchedVol) {
      showToast('Volume Não Localizado', 'Nenhum volume armazenado ativo encontrado com esta chave.', 'warning');
      return;
    }

    checkOutVolume(matchedVol.id);
    setCheckoutCode('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Gestão Operacional de Balcão & Pistas
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Central Operacional: {selectedUnitId === 'all' ? 'Todas as Bases' : currentUnit.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Recepção, etiquetagem térmica, conferência de lacres ANAC, checkout e caixa operacional.
          </p>
        </div>

        {/* Submenu Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('central')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'central' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Central de Hoje
          </button>
          <button
            onClick={() => setActiveTab('entrada')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'entrada' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Entrada de Volume
          </button>
          <button
            onClick={() => setActiveTab('retirada')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'retirada' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Retirada / Check-out
          </button>
          <button
            onClick={() => setActiveTab('abertura_fechamento')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'abertura_fechamento' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Abertura & Checklist
          </button>
          <button
            onClick={() => setActiveTab('caixa')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'caixa' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Caixa Operacional
          </button>
        </div>
      </div>

      {/* TAB 1: CENTRAL DE HOJE */}
      {activeTab === 'central' && (
        <div className="space-y-6">
          {/* Operational Status Counter Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Volumes em Guarda</span>
                <Luggage className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-amber-400 tabular-nums">
                {storedVolumes.length}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">100% etiquetados e lacrados</div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Retiradas Concluídas</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                {retrievedToday.length + 18}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Tempo médio de entrega: 42s</div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Capacidade Ocupada</span>
                <Building2 className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-slate-100 tabular-nums">
                {currentUnit.capacityOccupied} / {currentUnit.capacityTotal}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                {Math.round((currentUnit.capacityOccupied / currentUnit.capacityTotal) * 100)}% de ocupação
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium flex items-center justify-between">
                <span>Fundo de Caixa Balcão</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
                R$ {currentUnit.cashBalance.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 font-mono">Caixa aberto e conferido</div>
            </div>
          </div>

          {/* Stored Luggage Visual Table */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Inventário em Tempo Real</div>
                <h3 className="text-sm font-bold text-slate-100">Bagagens Armazenadas Atualmente nos Armários</h3>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">{storedVolumes.length} volumes ativos</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                    <th className="pb-3">Código do Volume</th>
                    <th className="pb-3">Passageiro</th>
                    <th className="pb-3">Localização (Armário / Posição)</th>
                    <th className="pb-3">Entrada Realizada</th>
                    <th className="pb-3">Previsão Retirada</th>
                    <th className="pb-3">Operador</th>
                    <th className="pb-3 text-right">Ações Rápidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {storedVolumes.map((vol) => (
                    <tr key={vol.id} className="hover:bg-slate-850/60 transition-colors">
                      <td className="py-3">
                        <div className="font-mono font-bold text-amber-400">{vol.id}</div>
                        <div className="text-[11px] text-slate-400">{vol.description}</div>
                      </td>
                      <td className="py-3 font-semibold text-slate-200">
                        {vol.customerName}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-extrabold">
                            {vol.locationPosition}
                          </span>
                          <span className="text-slate-400 text-[11px]">{vol.locationLocker}</span>
                        </div>
                      </td>
                      <td className="py-3 font-mono text-slate-300">
                        {new Date(vol.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 font-mono text-slate-400">
                        {new Date(vol.expectedCheckOutTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="py-3 text-slate-300">
                        {vol.operatorIn}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedVolumeId(vol.id)}
                          className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-xs font-semibold cursor-pointer transition-colors"
                        >
                          Conferir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ENTRADA DE VOLUME */}
      {activeTab === 'entrada' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 max-w-2xl mx-auto space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <div className="text-[10px] font-mono uppercase text-amber-400 font-bold">
              Fluxo Operacional de Recepção
            </div>
            <h3 className="text-base font-bold text-slate-100">
              Registrar Entrada de Volume & Atribuição de Armário
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Conferência física, inspeção de itens proibidos ANAC, geração de tag térmica e alocação de gaveta.
            </p>
          </div>

          <form onSubmit={handleSimulateCheckin} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Código da Reserva Vinculada (ou Digitalize QR Code) *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={targetReservationCode}
                  onChange={(e) => setTargetReservationCode(e.target.value)}
                  placeholder="Ex: SC-28425"
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 font-mono"
                />
                <button
                  type="button"
                  onClick={() => showToast('Leitor Conectado', 'Aproxime o leitor de código de barras ou celular.', 'info')}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 font-semibold cursor-pointer"
                >
                  <Scan className="w-4 h-4 text-amber-400" />
                  <span>Scan</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Posição do Armário Alocado *
                </label>
                <input
                  type="text"
                  required
                  value={assignedLockerPosition}
                  onChange={(e) => setAssignedLockerPosition(e.target.value.toUpperCase())}
                  placeholder="Ex: A05 / B02 / ESP-01"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1.5">
                  Lacre de Segurança Numerado
                </label>
                <input
                  type="text"
                  defaultValue="LACRE-77402"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Observações de Inspeção Visual (Avarias prévias, frágil, rodinhas)
              </label>
              <textarea
                rows={2}
                value={entryNotes}
                onChange={(e) => setEntryNotes(e.target.value)}
                placeholder="Ex: Mala Samsonite preta, sem avarias prévias. Cliente autorizou lacre."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100"
              />
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar Entrada & Imprimir Etiqueta Térmica</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: RETIRADA / CHECKOUT */}
      {activeTab === 'retirada' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 max-w-2xl mx-auto space-y-5">
          <div className="border-b border-slate-800 pb-3">
            <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">
              Check-out Seguro & Liberação de Capacidade
            </div>
            <h3 className="text-base font-bold text-slate-100">
              Retirada de Volume & Conferência de Identidade
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Localize o volume por código, tag numerada ou reserva para proceder à liberação imediata.
            </p>
          </div>

          <form onSubmit={handleSimulateCheckout} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">
                Escanear Etiqueta ou Digitar Código do Volume / Reserva *
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  required
                  value={checkoutCode}
                  onChange={(e) => setCheckoutCode(e.target.value)}
                  placeholder="Ex: SC-VOL-008291 ou SC-28419 ou TAG-CGH-4491"
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Conferir & Retirar</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="font-semibold text-slate-200">Protocolo de Retirada Obrigatório:</div>
              <ul className="text-slate-400 space-y-1 list-disc pl-4">
                <li>Exigir documento original com foto do titular da reserva.</li>
                <li>Conferir se o número do lacre físico coincide com o sistema.</li>
                <li>Cortar o lacre somente após anuência e inspeção visual do passageiro.</li>
              </ul>
            </div>
          </form>
        </div>
      )}

      {/* TAB 4: ABERTURA & FECHAMENTO CHECKLIST */}
      {activeTab === 'abertura_fechamento' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Procedimento Padrão (SOP)</div>
              <h3 className="text-sm font-bold text-slate-100">Checklist Operacional de Turno</h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {checklistItems.filter((i) => i.done).length} de {checklistItems.length} concluídos
            </span>
          </div>

          <div className="space-y-2.5">
            {checklistItems.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                  item.done ? 'bg-slate-950/40 border-slate-800 text-slate-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center ${
                      item.done ? 'bg-emerald-500 text-slate-950 font-bold' : 'border border-slate-600'
                    }`}
                  >
                    {item.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className={item.done ? 'line-through text-slate-500' : 'font-medium text-slate-200'}>
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => showToast('Turno Validado', 'Checklist de abertura gravado com assinatura eletrônica.', 'success')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
            >
              Assinar & Validar Turno
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: CAIXA OPERACIONAL */}
      {activeTab === 'caixa' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Controle Financeiro de Balcão</div>
              <h3 className="text-sm font-bold text-slate-100">Caixa Operacional do Dia · {currentUnit.shortName}</h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">Status: ABERTO</span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Saldo Inicial</div>
              <div className="text-base font-bold font-mono text-slate-200 mt-1">R$ 1.500,00</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Entradas Dinheiro/PIX</div>
              <div className="text-base font-bold font-mono text-emerald-400 mt-1">R$ 3.320,00</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase font-mono">Saldo em Gaveta</div>
              <div className="text-base font-bold font-mono text-amber-400 mt-1">
                R$ {currentUnit.cashBalance.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => showToast('Sangria', 'Sangria de R$ 2.000 enviada ao cofre de segurança.', 'info')}
              className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-700 cursor-pointer"
            >
              Registrar Sangria
            </button>
            <button
              onClick={() => showToast('Fechamento de Caixa', 'Caixa do turno fechado sem divergências.', 'success')}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer"
            >
              Fechar Caixa do Turno
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
