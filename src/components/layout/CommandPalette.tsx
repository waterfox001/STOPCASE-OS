import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  X,
  Luggage,
  Users,
  CalendarDays,
  Box,
  Building2,
  Target,
  ArrowRight,
  ShieldCheck,
  PlusCircle
} from 'lucide-react';

interface CommandPaletteProps {
  onNavigate: (path: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onNavigate }) => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    customers,
    reservations,
    volumes,
    units,
    objectives,
    setSelectedReservationId,
    setSelectedCustomerId,
    setSelectedVolumeId,
    setIsQuickCreateOpen,
    setQuickCreateType
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search Results
  const matchedReservations = normalizedQuery
    ? reservations.filter(
        (r) =>
          r.id.toLowerCase().includes(normalizedQuery) ||
          r.customerName.toLowerCase().includes(normalizedQuery) ||
          r.unitId.toLowerCase().includes(normalizedQuery)
      )
    : reservations.slice(0, 3);

  const matchedCustomers = normalizedQuery
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(normalizedQuery) ||
          c.document.includes(normalizedQuery) ||
          c.email.toLowerCase().includes(normalizedQuery)
      )
    : customers.slice(0, 3);

  const matchedVolumes = normalizedQuery
    ? volumes.filter(
        (v) =>
          v.id.toLowerCase().includes(normalizedQuery) ||
          v.tagNumber.toLowerCase().includes(normalizedQuery) ||
          v.customerName.toLowerCase().includes(normalizedQuery) ||
          v.locationPosition.toLowerCase().includes(normalizedQuery)
      )
    : volumes.slice(0, 3);

  const matchedUnits = normalizedQuery
    ? units.filter(
        (u) =>
          u.name.toLowerCase().includes(normalizedQuery) ||
          u.airportCode.toLowerCase().includes(normalizedQuery) ||
          u.shortName.toLowerCase().includes(normalizedQuery)
      )
    : units;

  const quickPages = [
    { title: 'Dashboard Geral', path: '/', icon: Building2 },
    { title: 'Estratégia & OKRs', path: '/strategy', icon: Target },
    { title: 'Central Operacional (Hoje)', path: '/operation', icon: Luggage },
    { title: 'Volumes & Rastreabilidade', path: '/volumes', icon: Box },
    { title: 'Financeiro & Fluxo', path: '/finance', icon: CalendarDays },
    { title: 'Auditoria & Logs', path: '/audit', icon: ShieldCheck }
  ].filter((p) => !normalizedQuery || p.title.toLowerCase().includes(normalizedQuery));

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150"
      onClick={() => setIsCommandPaletteOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/70 gap-3">
          <Search className="w-5 h-5 text-amber-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por código de reserva, cliente, volume (ex: SC-VOL-008291), unidade..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-200 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 divide-y divide-slate-800/60">
          {/* Quick Actions */}
          <div className="space-y-1">
            <div className="px-2 text-[10px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
              Ações Rápidas
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  setQuickCreateType('reservation');
                  setIsQuickCreateOpen(true);
                }}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-xs text-slate-200 text-left transition-colors cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+ Criar Nova Reserva</span>
              </button>
              <button
                onClick={() => {
                  setIsCommandPaletteOpen(false);
                  setQuickCreateType('customer');
                  setIsQuickCreateOpen(true);
                }}
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-850 hover:bg-slate-800 text-xs text-slate-200 text-left transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+ Cadastrar Novo Cliente</span>
              </button>
            </div>
          </div>

          {/* Matched Reservations */}
          {matchedReservations.length > 0 && (
            <div className="pt-3 space-y-1">
              <div className="px-2 text-[10px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
                Reservas ({matchedReservations.length})
              </div>
              {matchedReservations.map((res) => (
                <div
                  key={res.id}
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    setSelectedReservationId(res.id);
                  }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <CalendarDays className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">
                        {res.id} · <span className="font-medium text-slate-300">{res.customerName}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Unidade: {res.unitId} · {res.quantity} volume(s) · R$ {res.finalAmount.toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {res.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Matched Volumes */}
          {matchedVolumes.length > 0 && (
            <div className="pt-3 space-y-1">
              <div className="px-2 text-[10px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
                Volumes & Bagagens ({matchedVolumes.length})
              </div>
              {matchedVolumes.map((vol) => (
                <div
                  key={vol.id}
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    setSelectedVolumeId(vol.id);
                  }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Box className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">
                        {vol.id} · <span className="font-normal text-slate-400">{vol.description}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Posição: <strong className="text-amber-400">{vol.locationPosition}</strong> ({vol.locationLocker}) · {vol.customerName}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{vol.tagNumber}</span>
                </div>
              ))}
            </div>
          )}

          {/* Matched Customers */}
          {matchedCustomers.length > 0 && (
            <div className="pt-3 space-y-1">
              <div className="px-2 text-[10px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
                Clientes & CRM ({matchedCustomers.length})
              </div>
              {matchedCustomers.map((cust) => (
                <div
                  key={cust.id}
                  onClick={() => {
                    setIsCommandPaletteOpen(false);
                    setSelectedCustomerId(cust.id);
                  }}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-xs font-bold text-slate-200">{cust.name}</div>
                      <div className="text-[11px] text-slate-400">
                        {cust.city}/{cust.state} · {cust.phone} · Segmento: {cust.segment}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    R$ {cust.totalSpent.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Quick Pages */}
          {quickPages.length > 0 && (
            <div className="pt-3 space-y-1">
              <div className="px-2 text-[10px] font-mono uppercase text-slate-500 font-semibold tracking-wider">
                Navegação Rápida
              </div>
              {quickPages.map((page) => {
                const Icon = page.icon;
                return (
                  <div
                    key={page.path}
                    onClick={() => {
                      setIsCommandPaletteOpen(false);
                      onNavigate(page.path);
                    }}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/80 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="text-xs font-medium text-slate-200">{page.title}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between px-4">
          <span>Dica: Use <strong>Enter</strong> para selecionar e <strong>Esc</strong> para fechar</span>
          <span className="font-mono text-slate-400">STOPCASE OS · Rastreamento Total</span>
        </div>
      </div>
    </div>
  );
};
