import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { VolumeItem } from '../../types';
import {
  Box,
  Search,
  MapPin,
  Move,
  History,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Layers
} from 'lucide-react';

export const VolumesModule: React.FC = () => {
  const {
    volumes,
    units,
    selectedUnitId,
    setSelectedVolumeId,
    updateVolumePosition,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'grid' | 'lista'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<'A' | 'B' | 'C'>('A');

  const currentUnit = units.find((u) => u.id === selectedUnitId) || units[0];

  const filteredVolumes = volumes.filter((v) => {
    const matchesUnit = selectedUnitId === 'all' || v.unitId === selectedUnitId;
    const matchesSearch =
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.tagNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.locationPosition.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesUnit && matchesSearch;
  });

  // Storage grid positions generator (10 slots per area, e.g. A01 to A10)
  const gridPositions = Array.from({ length: 12 }, (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    const posCode = `${selectedArea}${num}`;
    const occupant = volumes.find(
      (v) => (selectedUnitId === 'all' || v.unitId === selectedUnitId) && v.locationPosition === posCode && v.status === 'stored'
    );
    return {
      code: posCode,
      occupant,
      status: occupant ? 'ocupado' : i === 11 ? 'manutencao' : 'disponivel'
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Rastreabilidade Operacional & Armazenamento
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Localização Interna & Grade Visual de Armários
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Rastreamento de bagagens (SC-VOL-XXXXXX) por armário, gaveta e inspeção de integridade física.
          </p>
        </div>

        {/* Submenu Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-xl">
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'grid' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Grid Visual de Posições
          </button>
          <button
            onClick={() => setActiveTab('lista')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'lista' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Lista de Volumes
          </button>
        </div>
      </div>

      {/* Capacity Alert if unit is busy */}
      {currentUnit.capacityOccupied / currentUnit.capacityTotal >= 0.85 && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-amber-300">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <span>
              <strong>Atenção de Ocupação:</strong> A base {currentUnit.shortName} atingiu{' '}
              {Math.round((currentUnit.capacityOccupied / currentUnit.capacityTotal) * 100)}% de ocupação. Considere direcionar novos volumes para a área pulmão B.
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-amber-400 shrink-0">
            {currentUnit.capacityTotal - currentUnit.capacityOccupied} vagas restantes
          </span>
        </div>
      )}

      {/* TAB 1: GRID VISUAL DE ARMAZENAMENTO */}
      {activeTab === 'grid' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">Mapeamento Físico</div>
              <h3 className="text-base font-bold text-slate-100">
                Armários da Base: {selectedUnitId === 'all' ? 'Congonhas (Padrão)' : currentUnit.name}
              </h3>
            </div>

            {/* Area Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Selecionar Bloco / Área:</span>
              <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800">
                {(['A', 'B', 'C'] as const).map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedArea(area)}
                    className={`px-3 py-1 text-xs font-mono font-bold rounded cursor-pointer transition-colors ${
                      selectedArea === area ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Área {area}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/50" />
              <span>Disponível</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-amber-500 border border-amber-400" />
              <span>Ocupado (Bagagem Alocada)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-500/20 border border-rose-500/50" />
              <span>Manutenção / Bloqueado</span>
            </div>
          </div>

          {/* Visual Grid of Storage Lockers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {gridPositions.map((pos) => {
              const isOccupied = pos.status === 'ocupado';
              const isMaintenance = pos.status === 'manutencao';

              return (
                <div
                  key={pos.code}
                  onClick={() => {
                    if (pos.occupant) {
                      setSelectedVolumeId(pos.occupant.id);
                    } else if (!isMaintenance) {
                      showToast('Posição Livre', `Posição ${pos.code} disponível para novos check-ins.`, 'info');
                    }
                  }}
                  className={`p-4 rounded-xl border flex flex-col justify-between min-h-[110px] cursor-pointer transition-all ${
                    isOccupied
                      ? 'bg-amber-500/10 border-amber-500/40 hover:border-amber-400'
                      : isMaintenance
                      ? 'bg-rose-950/20 border-rose-800/40 opacity-70 cursor-not-allowed'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-sm text-slate-100">{pos.code}</span>
                    <span
                      className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                        isOccupied
                          ? 'bg-amber-500 text-slate-950'
                          : isMaintenance
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {pos.status}
                    </span>
                  </div>

                  {isOccupied && pos.occupant && (
                    <div className="space-y-0.5 text-left">
                      <div className="font-mono text-[10px] font-bold text-amber-400 truncate">
                        {pos.occupant.id}
                      </div>
                      <div className="text-[11px] text-slate-200 font-semibold truncate">
                        {pos.occupant.customerName}
                      </div>
                    </div>
                  )}

                  {!isOccupied && !isMaintenance && (
                    <div className="text-[10px] text-slate-500 font-mono">Livre para guarda</div>
                  )}
                  {isMaintenance && (
                    <div className="text-[10px] text-rose-400 font-mono">Calibração de trava</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: LISTA DE VOLUMES */}
      {activeTab === 'lista' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por código (SC-VOL-XXXXXX), passageiro ou tag..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <span className="text-xs text-slate-400 font-mono">{filteredVolumes.length} volumes listados</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] font-mono text-slate-400 uppercase">
                  <th className="pb-3">Código do Volume</th>
                  <th className="pb-3">Tag Térmica</th>
                  <th className="pb-3">Passageiro</th>
                  <th className="pb-3">Base</th>
                  <th className="pb-3">Posição Interna</th>
                  <th className="pb-3">Entrada</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Rastreabilidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredVolumes.map((vol) => (
                  <tr key={vol.id} className="hover:bg-slate-850/60 transition-colors">
                    <td className="py-3">
                      <div className="font-mono font-bold text-amber-400">{vol.id}</div>
                      <div className="text-[11px] text-slate-400">{vol.description}</div>
                    </td>
                    <td className="py-3 font-mono text-slate-300">{vol.tagNumber}</td>
                    <td className="py-3 font-semibold text-slate-200">{vol.customerName}</td>
                    <td className="py-3 font-mono text-slate-400">{vol.unitId}</td>
                    <td className="py-3">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-800 text-amber-400 font-bold">
                        {vol.locationPosition}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-slate-400 text-[11px]">
                      {vol.checkInTime.replace('T', ' ').slice(0, 16)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          vol.status === 'stored'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {vol.status === 'stored' ? 'ARMAZENADO' : 'RETIRADO'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setSelectedVolumeId(vol.id)}
                        className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Linha do Tempo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
