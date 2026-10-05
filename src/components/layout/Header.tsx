import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AirportUnitId, DatePeriod, SystemMode, UserProfile } from '../../types';
import {
  Search,
  Bell,
  Plus,
  SlidersHorizontal,
  Building2,
  Calendar,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Info,
  X,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const {
    userProfile,
    setUserProfile,
    selectedUnitId,
    setSelectedUnitId,
    selectedPeriod,
    setSelectedPeriod,
    systemMode,
    setSystemMode,
    setIsCommandPaletteOpen,
    setIsQuickCreateOpen,
    setQuickCreateType,
    notifications,
    toggleNotificationRead,
    markAllNotificationsAsRead,
    units
  } = useApp();

  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const pathTitles: Record<string, { title: string; section: string }> = {
    '/': { title: 'Visão Geral & Executiva', section: 'Dashboard' },
    '/strategy': { title: 'Estratégia & OKRs', section: 'Metas' },
    '/commercial': { title: 'Pipeline & CRM Comercial', section: 'Comercial' },
    '/customers': { title: 'Clientes & Customer 360°', section: 'CRM' },
    '/reservations': { title: 'Gestão de Reservas', section: 'Reservas' },
    '/operation': { title: 'Central Operacional de Hoje', section: 'Operação' },
    '/volumes': { title: 'Volumes & Rastreabilidade', section: 'Operação' },
    '/units': { title: 'Unidades & Comparativo', section: 'Unidades' },
    '/finance': { title: 'Fluxo de Caixa & Contas', section: 'Financeiro' },
    '/reports': { title: 'BI Executivo & Simulador', section: 'Relatórios' },
    '/team': { title: 'Equipe, Escalas & Produtividade', section: 'Pessoas' },
    '/assets': { title: 'Ativos & Manutenção', section: 'Equipamentos' },
    '/partners': { title: 'Parceiros & Concessões', section: 'Contratos' },
    '/knowledge': { title: 'Central de Conhecimento & SOP', section: 'Processos' },
    '/documents': { title: 'Gerenciador de Documentos', section: 'Compliance' },
    '/occurrences': { title: 'Central de Ocorrências', section: 'Qualidade' },
    '/audit': { title: 'Logs de Auditoria & LGPD', section: 'Segurança' },
    '/settings': { title: 'Configurações do Sistema', section: 'Administração' },
    '/mywork': { title: 'Meu Trabalho & Cockpit', section: 'Pessoal' }
  };

  const currentInfo = pathTitles[currentPath] || { title: 'STOPCASE OS', section: 'Sistema' };

  const profileLabels: Record<UserProfile, { title: string; badge: string; color: string }> = {
    diretor: { title: 'Diretoria Executiva', badge: 'SUPER ADMIN', color: 'text-amber-400 bg-amber-950/60 border-amber-800/60' },
    gestor: { title: 'Gestão de Operações', badge: 'GESTOR', color: 'text-blue-400 bg-blue-950/60 border-blue-800/60' },
    financeiro: { title: 'Controladoria & Finanças', badge: 'FINANCEIRO', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60' },
    comercial: { title: 'Comercial & Parcerias', badge: 'COMERCIAL', color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60' },
    operacional: { title: 'Operador de Aeroporto', badge: 'OPERACIONAL', color: 'text-orange-400 bg-orange-950/60 border-orange-800/60' },
    atendimento: { title: 'Atendimento ao Cliente', badge: 'BALCÃO', color: 'text-teal-400 bg-teal-950/60 border-teal-800/60' },
    auditor: { title: 'Auditor & Compliance', badge: 'AUDITOR', color: 'text-purple-400 bg-purple-950/60 border-purple-800/60' }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Breadcrumb & Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
          <span className="font-semibold text-amber-500/90 tracking-wide uppercase">{currentInfo.section}</span>
          <span className="text-slate-600">/</span>
        </div>
        <h1 className="text-base sm:text-lg font-bold text-slate-100 truncate tracking-tight">
          {currentInfo.title}
        </h1>
      </div>

      {/* Global Controls & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Search trigger (Ctrl+K) */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-950/60 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer group"
          title="Busca global no sistema (Ctrl+K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
          <span className="hidden md:inline">Buscar clientes, volumes, reservas...</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-300 rounded border border-slate-700">
            ⌘K
          </kbd>
        </button>

        {/* Airport Unit Selector */}
        <div className="relative">
          <select
            value={selectedUnitId}
            onChange={(e) => setSelectedUnitId(e.target.value as AirportUnitId)}
            className="appearance-none pl-7 pr-7 py-1.5 text-xs font-medium bg-slate-950/70 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-lg cursor-pointer focus:outline-none focus:border-amber-500 transition-colors"
          >
            <option value="all">Todas as Unidades (5)</option>
            {units.map((u) => (
              <option key={u.id} value={u.id}>
                {u.airportCode} · {u.shortName}
              </option>
            ))}
          </select>
          <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2 pointer-events-none" />
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>

        {/* Date Period Filter */}
        <div className="relative hidden xl:block">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as DatePeriod)}
            className="appearance-none pl-7 pr-7 py-1.5 text-xs font-medium bg-slate-950/70 hover:bg-slate-850 text-slate-200 border border-slate-800 rounded-lg cursor-pointer focus:outline-none focus:border-amber-500 transition-colors"
          >
            <option value="today">Hoje (05/10)</option>
            <option value="yesterday">Ontem (04/10)</option>
            <option value="7d">Últimos 7 dias</option>
            <option value="month">Este Mês (Outubro)</option>
            <option value="prev_month">Mês Anterior (Setembro)</option>
            <option value="quarter">Este Trimestre (Q4)</option>
            <option value="year">Este Ano (2026)</option>
          </select>
          <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2 pointer-events-none" />
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-2.5 pointer-events-none" />
        </div>

        {/* Mode Switcher */}
        <div className="hidden lg:flex items-center gap-1 p-0.5 bg-slate-950/70 border border-slate-800 rounded-lg">
          <button
            onClick={() => setSystemMode('standard')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              systemMode === 'standard' ? 'bg-slate-800 text-amber-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Modo padrão do sistema"
          >
            Padrão
          </button>
          <button
            onClick={() => setSystemMode('executive')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              systemMode === 'executive' ? 'bg-slate-800 text-amber-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Visão Executiva (foco em resultados e metas)"
          >
            Executivo
          </button>
          <button
            onClick={() => setSystemMode('operational')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              systemMode === 'operational' ? 'bg-slate-800 text-amber-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Modo Operação (foco no balcão e volumes)"
          >
            Operação
          </button>
          <button
            onClick={() => setSystemMode('presentation')}
            className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
              systemMode === 'presentation' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Modo Apresentação para Reuniões"
          >
            Apresentação
          </button>
        </div>

        {/* Quick Action Button (+ Criar) */}
        <div className="relative">
          <button
            onClick={() => {
              setQuickCreateType('reservation');
              setIsQuickCreateOpen(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg shadow-sm shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span className="hidden sm:inline">Nova Reserva</span>
          </button>
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifDropdownOpen((prev) => !prev)}
            className="relative p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
            title="Notificações do sistema"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            )}
          </button>

          {isNotifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-200 uppercase tracking-wider">Alertas & Notificações</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-semibold">
                      {unreadCount} novas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
                  >
                    Marcar todas lidas
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      toggleNotificationRead(n.id);
                      if (n.link) {
                        onNavigate(n.link);
                        setIsNotifDropdownOpen(false);
                      }
                    }}
                    className={`p-3 text-left transition-colors cursor-pointer flex gap-3 ${
                      n.read ? 'bg-slate-900 hover:bg-slate-850 opacity-75' : 'bg-slate-850/80 hover:bg-slate-800'
                    }`}
                  >
                    <div className="mt-0.5">
                      {n.severity === 'critical' ? (
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                      ) : n.severity === 'warning' ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      ) : n.severity === 'success' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Info className="w-4 h-4 text-blue-400" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-semibold text-slate-200 truncate">{n.title}</span>
                        <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{n.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Role & Profile Switcher */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1 text-left bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 font-bold text-xs">
              {userProfile.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 leading-none mb-0.5">
                {profileLabels[userProfile].badge}
              </div>
              <div className="text-xs font-semibold text-slate-200 leading-none">
                {profileLabels[userProfile].title}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Alternar Papel / Visão do Sistema
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Simule o STOPCASE OS com permissões e visões de cada perfil corporativo:
                </div>
              </div>

              {(Object.keys(profileLabels) as UserProfile[]).map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    setUserProfile(role);
                    setIsProfileDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    userProfile === role
                      ? 'bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="text-left">
                    <div>{profileLabels[role].title}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{profileLabels[role].badge}</div>
                  </div>
                  {userProfile === role && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
