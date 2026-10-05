import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Calendar,
  Luggage,
  User,
  CreditCard,
  Building2,
  Clock,
  Printer,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ReservationDetailDrawer: React.FC = () => {
  const {
    selectedReservationId,
    setSelectedReservationId,
    reservations,
    volumes,
    units,
    setSelectedVolumeId,
    setSelectedCustomerId,
    showToast
  } = useApp();

  if (!selectedReservationId) return null;

  const res = reservations.find((r) => r.id === selectedReservationId);
  if (!res) return null;

  const unit = units.find((u) => u.id === res.unitId);
  const relatedVolumes = volumes.filter((v) => res.volumes.includes(v.id) || v.reservationId === res.id);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
      onClick={() => setSelectedReservationId(null)}
    >
      <div
        className="w-full max-w-xl bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
              {res.id}
            </span>
            <span className="text-xs text-slate-400">· {unit?.shortName}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Impressão', `Comprovante da reserva ${res.id} enviado para impressora térmica.`, 'info')}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg cursor-pointer"
              title="Imprimir comprovante e tags"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedReservationId(null)}
              className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Main Status & Client Lockup */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase text-slate-500">Passageiro / Cliente</div>
                <div
                  onClick={() => {
                    setSelectedReservationId(null);
                    setSelectedCustomerId(res.customerId);
                  }}
                  className="text-base font-bold text-slate-100 hover:text-amber-400 cursor-pointer transition-colors"
                >
                  {res.customerName}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">{res.customerPhone}</div>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400">
                {res.status.toUpperCase()}
              </span>
            </div>

            {res.flightNumber && (
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <span>Voo de Conexão:</span>
                <span className="font-mono font-semibold text-amber-400">
                  {res.airline} · {res.flightNumber}
                </span>
              </div>
            )}
          </div>

          {/* Time & Dates */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Início (Check-in)</div>
              <div className="font-bold text-slate-200 mt-1">{new Date(res.startDate).toLocaleString('pt-BR')}</div>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Previsão Retirada</div>
              <div className="font-bold text-slate-200 mt-1">{new Date(res.expectedEndDate).toLocaleString('pt-BR')}</div>
            </div>
          </div>

          {/* Volumes Associated */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
              <span>Volumes Vinculados ({relatedVolumes.length})</span>
            </div>

            {relatedVolumes.map((vol) => (
              <div
                key={vol.id}
                onClick={() => {
                  setSelectedReservationId(null);
                  setSelectedVolumeId(vol.id);
                }}
                className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/60 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Luggage className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-200 font-mono">{vol.id}</div>
                    <div className="text-[11px] text-slate-400">{vol.description}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold font-mono text-amber-400">{vol.locationPosition}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{vol.locationLocker}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Financial Breakdown */}
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold mb-2">
              Detalhes Financeiros
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Subtotal:</span>
              <span className="font-mono text-slate-200">R$ {res.totalAmount.toFixed(2)}</span>
            </div>
            {res.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Desconto concedido:</span>
                <span className="font-mono">-R$ {res.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Forma de Pagamento:</span>
              <span className="text-slate-200">{res.paymentMethod}</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-amber-400 pt-2 border-t border-slate-800">
              <span>Total Pago:</span>
              <span className="font-mono">R$ {res.finalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Notes */}
          {res.notes && (
            <div className="p-3 bg-slate-950/40 rounded-lg border border-slate-800 text-xs">
              <span className="text-slate-400 font-semibold">Observações: </span>
              <span className="text-slate-300">{res.notes}</span>
            </div>
          )}

          {/* Creation Metadata */}
          <div className="text-[11px] text-slate-500 border-t border-slate-800/80 pt-3">
            Registrado em {new Date(res.createdAt).toLocaleString('pt-BR')} por {res.createdBy}.
          </div>
        </div>
      </div>
    </div>
  );
};
