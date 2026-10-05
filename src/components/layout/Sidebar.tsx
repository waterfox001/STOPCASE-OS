import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Target,
  Briefcase,
  Users,
  CalendarDays,
  Luggage,
  Box,
  Building2,
  DollarSign,
  BarChart3,
  UserCheck,
  Wrench,
  FileSpreadsheet,
  BookOpen,
  FolderLock,
  AlertOctagon,
  ShieldCheck,
  Settings,
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface NavGroup {
  label: string;
  items: {
    title: string;
    path: string;
    icon: React.ElementType;
    badge?: number | string;
    badgeColor?: string;
    permission?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath, onNavigate }) => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    can,
    occurrences,
    followUps,
    volumes,
    reservations
  } = useApp();

  const openOccurrencesCount = occurrences.filter((o) => o.status === 'Aberta' || o.status === 'Em Resolução').length;
  const overdueFollowUpsCount = followUps.filter((f) => f.status === 'overdue').length;
  const storedVolumesCount = volumes.filter((v) => v.status === 'stored').length;
  const activeReservationsCount = reservations.filter((r) => r.status === 'active').length;

  const navGroups: NavGroup[] = [
    {
      label: 'ESTRATÉGIA & VENDAS',
      items: [
        {
          title: 'Dashboard Geral',
          path: '/',
          icon: LayoutDashboard,
          permission: 'dashboard.view'
        },
        {
          title: 'Estratégia & Metas (OKRs)',
          path: '/strategy',
          icon: Target,
          badge: '4 KRs',
          badgeColor: 'bg-emerald-500/20 text-emerald-400',
          permission: 'strategy.view'
        },
        {
          title: 'Comercial & CRM',
          path: '/commercial',
          icon: Briefcase,
          badge: overdueFollowUpsCount > 0 ? `${overdueFollowUpsCount} pend.` : undefined,
          badgeColor: 'bg-amber-500/20 text-amber-400',
          permission: 'commercial.view'
        },
        {
          title: 'Clientes & 360°',
          path: '/customers',
          icon: Users,
          permission: 'customers.view'
        },
        {
          title: 'Reservas',
          path: '/reservations',
          icon: CalendarDays,
          badge: activeReservationsCount,
          badgeColor: 'bg-blue-500/20 text-blue-400',
          permission: 'reservations.view'
        }
      ]
    },
    {
      label: 'OPERAÇÃO AEROPORTUÁRIA',
      items: [
        {
          title: 'Central Operacional',
          path: '/operation',
          icon: Luggage,
          permission: 'operation.view'
        },
        {
          title: 'Volumes & Rastreabilidade',
          path: '/volumes',
          icon: Box,
          badge: storedVolumesCount,
          badgeColor: 'bg-indigo-500/20 text-indigo-400',
          permission: 'volumes.view'
        },
        {
          title: 'Unidades Aeroportos',
          path: '/units',
          icon: Building2,
          permission: 'units.view'
        }
      ]
    },
    {
      label: 'GESTÃO & PERFORMANCE',
      items: [
        {
          title: 'Financeiro & Fluxo',
          path: '/finance',
          icon: DollarSign,
          permission: 'finance.view'
        },
        {
          title: 'Relatórios & BI',
          path: '/reports',
          icon: BarChart3,
          permission: 'reports.view'
        },
        {
          title: 'Equipe & Escalas',
          path: '/team',
          icon: UserCheck,
          permission: 'team.view'
        },
        {
          title: 'Ativos & Manutenção',
          path: '/assets',
          icon: Wrench,
          permission: 'assets.view'
        },
        {
          title: 'Parceiros & Concessões',
          path: '/partners',
          icon: FileSpreadsheet,
          permission: 'partners.view'
        }
      ]
    },
    {
      label: 'GOVERNANÇA & QUALIDADE',
      items: [
        {
          title: 'Central de SOPs',
          path: '/knowledge',
          icon: BookOpen,
          permission: 'knowledge.view'
        },
        {
          title: 'Documentos',
          path: '/documents',
          icon: FolderLock,
          permission: 'documents.view'
        },
        {
          title: 'Ocorrências',
          path: '/occurrences',
          icon: AlertOctagon,
          badge: openOccurrencesCount > 0 ? openOccurrencesCount : undefined,
          badgeColor: 'bg-rose-500/20 text-rose-400',
          permission: 'occurrences.view'
        },
        {
          title: 'Auditoria & Logs',
          path: '/audit',
          icon: ShieldCheck,
          permission: 'audit.view'
        },
        {
          title: 'Configurações',
          path: '/settings',
          icon: Settings,
          permission: 'settings.view'
        },
        {
          title: 'Meu Trabalho',
          path: '/mywork',
          icon: CheckSquare,
          permission: 'mywork.view'
        }
      ]
    }
  ];

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 ease-in-out ${
        sidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950/60">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => onNavigate('/')}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
              <Luggage className="w-4 h-4 text-slate-950 font-bold" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                <span>STOPCASE</span>
                <span className="text-[10px] px-1 py-0.2 bg-amber-500/20 text-amber-400 rounded font-mono font-bold">
                  OS
                </span>
              </div>
              <div className="text-[10px] text-slate-400 truncate tracking-wide">
                Sistema Operacional de Gestão
              </div>
            </div>
          </div>
        ) : (
          <div
            className="w-full flex justify-center cursor-pointer"
            onClick={() => onNavigate('/')}
            title="STOPCASE OS"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Luggage className="w-4 h-4 text-slate-950 font-bold" />
            </div>
          </div>
        )}

        <button
          onClick={() => setSidebarCollapsed((prev) => !prev)}
          className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors cursor-pointer ${
            sidebarCollapsed ? 'mx-auto mt-2 hidden' : ''
          }`}
          title={sidebarCollapsed ? 'Expandir Menu' : 'Recolher Menu'}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group, gIdx) => {
          // Filter items based on RBAC permission
          const visibleItems = group.items.filter((item) => !item.permission || can(item.permission));
          if (visibleItems.length === 0) return null;

          return (
            <div key={gIdx} className="space-y-1">
              {!sidebarCollapsed && (
                <div className="px-3 mb-1 text-[10px] font-mono tracking-wider font-semibold text-slate-500 uppercase">
                  {group.label}
                </div>
              )}
              {visibleItems.map((item) => {
                const isActive = currentPath === item.path;
                const Icon = item.icon;

                return (
                  <button
                    key={item.path}
                    onClick={() => onNavigate(item.path)}
                    title={sidebarCollapsed ? item.title : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-300 font-semibold border-l-2 border-amber-500 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    {!sidebarCollapsed && (
                      <span className="truncate flex-1 text-left">{item.title}</span>
                    )}
                    {!sidebarCollapsed && item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold tabular-nums ${
                          item.badgeColor || 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom Status & Quick Toggle */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        {!sidebarCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-[11px] text-slate-400 font-medium">5 Bases Conectadas</div>
            </div>
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="text-xs text-slate-500 hover:text-slate-300 p-1 hover:bg-slate-800 rounded cursor-pointer"
              title="Recolher menu"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800 cursor-pointer"
              title="Expandir menu"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
