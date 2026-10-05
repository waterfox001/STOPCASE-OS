import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  Luggage,
  Star,
  Clock,
  History,
  AlertTriangle,
  MessageSquare,
  Plus
} from 'lucide-react';

export const Customer360Drawer: React.FC = () => {
  const {
    selectedCustomerId,
    setSelectedCustomerId,
    customers,
    reservations,
    volumes,
    occurrences,
    setSelectedReservationId,
    setSelectedVolumeId,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'geral' | 'reservas' | 'volumes' | 'ocorrencias' | 'notas'>('geral');
  const [internalNote, setInternalNote] = useState('');

  if (!selectedCustomerId) return null;

  const customer = customers.find((c) => c.id === selectedCustomerId);
  if (!customer) return null;

  const customerReservations = reservations.filter((r) => r.customerId === customer.id);
  const customerVolumes = volumes.filter((v) => v.customerName === customer.name);
  const customerOccurrences = occurrences.filter((o) => o.customerName === customer.name);

  const averageTicket = customer.reservationsCount > 0
    ? customer.totalSpent / customer.reservationsCount
    : 0;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internalNote.trim()) return;
    showToast('Anotação Salva', `Nota interna adicionada ao perfil de ${customer.name}.`, 'success');
    setInternalNote('');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
      onClick={() => setSelectedCustomerId(null)}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
              {customer.id}
            </span>
            <span className="text-xs text-slate-400">· Visão 360° do Cliente</span>
          </div>
          <button
            onClick={() => setSelectedCustomerId(null)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer Identity Bar */}
        <div className="p-5 bg-slate-950/50 border-b border-slate-800">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
                {customer.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-100">{customer.name}</h2>
                <div className="text-xs text-slate-400 font-mono">CPF: {customer.document}</div>
              </div>
            </div>
            <span
              className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                customer.segment === 'VIP'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : customer.segment === 'Corporativo'
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-slate-800 text-slate-300'
              }`}
            >
              {customer.segment}
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-4 gap-2 text-center mt-4">
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase font-mono">LTV Gasto</div>
              <div className="text-xs font-extrabold font-mono text-emerald-400 mt-0.5">
                R$ {customer.totalSpent.toFixed(2)}
              </div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase font-mono">Reservas</div>
              <div className="text-xs font-extrabold font-mono text-slate-200 mt-0.5">
                {customer.reservationsCount}
              </div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase font-mono">Ticket Médio</div>
              <div className="text-xs font-extrabold font-mono text-amber-400 mt-0.5">
                R$ {averageTicket.toFixed(2)}
              </div>
            </div>
            <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-500 uppercase font-mono">NPS Score</div>
              <div className="text-xs font-extrabold font-mono text-amber-300 mt-0.5 flex items-center justify-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{customer.npsScore || 10} / 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 bg-slate-950/70 px-4 text-xs font-medium">
          {(
            [
              { key: 'geral', label: 'Geral & Contatos' },
              { key: 'reservas', label: `Reservas (${customerReservations.length})` },
              { key: 'volumes', label: `Volumes (${customerVolumes.length})` },
              { key: 'ocorrencias', label: `Ocorrências (${customerOccurrences.length})` },
              { key: 'notas', label: 'Notas Internas' }
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-3 px-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? 'border-amber-500 text-amber-400 font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'geral' && (
            <div className="space-y-4 text-xs animate-in fade-in">
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2.5">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold mb-1">
                  Canais de Comunicação
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{customer.city} / {customer.state}</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2.5">
                <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold mb-1">
                  Ciclo de Vida do Cliente
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Primeiro atendimento na Stopcase:</span>
                  <span className="font-mono text-slate-200">{customer.firstVisitDate}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Última visita registrada:</span>
                  <span className="font-mono text-slate-200">{customer.lastVisitDate}</span>
                </div>
              </div>

              {customer.notes && (
                <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold mb-1">
                    Preferências do Passageiro
                  </div>
                  <p className="text-slate-300 leading-relaxed">{customer.notes}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reservas' && (
            <div className="space-y-2.5 animate-in fade-in">
              {customerReservations.length === 0 ? (
                <div className="text-xs text-slate-500 italic py-4 text-center">
                  Nenhuma reserva registrada.
                </div>
              ) : (
                customerReservations.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => setSelectedReservationId(r.id)}
                    className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold font-mono text-amber-400">{r.id}</div>
                      <div className="text-slate-400 text-[11px] mt-0.5">
                        {new Date(r.startDate).toLocaleDateString('pt-BR')} · {r.quantity} vol. · Unidade {r.unitId}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-slate-200">R$ {r.finalAmount.toFixed(2)}</div>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {r.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'volumes' && (
            <div className="space-y-2.5 animate-in fade-in">
              {customerVolumes.length === 0 ? (
                <div className="text-xs text-slate-500 italic py-4 text-center">
                  Nenhum volume ativo armazenado.
                </div>
              ) : (
                customerVolumes.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVolumeId(v.id)}
                    className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold font-mono text-blue-400">{v.id}</div>
                      <div className="text-slate-300 text-[11px]">{v.description}</div>
                      <div className="text-slate-500 text-[10px] font-mono mt-0.5">Tag: {v.tagNumber}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-amber-400">{v.locationPosition}</div>
                      <span className="text-[10px] text-slate-400">{v.locationLocker}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'ocorrencias' && (
            <div className="space-y-2.5 animate-in fade-in">
              {customerOccurrences.length === 0 ? (
                <div className="text-xs text-slate-500 italic py-4 text-center">
                  Excelente: nenhuma ocorrência ou incidente associado a este cliente.
                </div>
              ) : (
                customerOccurrences.map((o) => (
                  <div key={o.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-mono text-rose-400">{o.protocol}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                        {o.status}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-200">{o.title}</div>
                    <div className="text-slate-400 text-[11px]">{o.description}</div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'notas' && (
            <div className="space-y-3 animate-in fade-in">
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={3}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  placeholder="Escreva uma anotação interna sobre o cliente (ex: @João passageiro prefere ser contatado via WhatsApp)..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Adicionar Nota Interna</span>
                </button>
              </form>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                    <span>Lucas Vianna (Balcão Congonhas)</span>
                    <span className="font-mono">03/10/2026 14:22</span>
                  </div>
                  <p className="text-slate-300">
                    Cliente realizou reserva com antecedência e elogiou a rapidez da liberação por QR Code.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
