import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { CommandPalette } from './components/layout/CommandPalette';
import { ToastContainer } from './components/common/ToastContainer';
import { RealizationModal } from './components/modals/RealizationModal';
import { ReservationWizardModal } from './components/modals/ReservationWizardModal';
import { ReservationDetailDrawer } from './components/drawers/ReservationDetailDrawer';
import { VolumeDetailDrawer } from './components/drawers/VolumeDetailDrawer';
import { Customer360Drawer } from './components/drawers/Customer360Drawer';

// Modules
import { DashboardModule } from './modules/dashboard/DashboardModule';
import { StrategyModule } from './modules/strategy/StrategyModule';
import { CommercialModule } from './modules/commercial/CommercialModule';
import { CustomersModule } from './modules/customers/CustomersModule';
import { ReservationsModule } from './modules/reservations/ReservationsModule';
import { OperationModule } from './modules/operation/OperationModule';
import { VolumesModule } from './modules/volumes/VolumesModule';
import { UnitsModule } from './modules/units/UnitsModule';
import { FinanceModule } from './modules/finance/FinanceModule';
import { ReportsModule } from './modules/reports/ReportsModule';
import { TeamModule } from './modules/team/TeamModule';
import { AssetsModule } from './modules/assets/AssetsModule';
import { PartnersModule } from './modules/partners/PartnersModule';
import { KnowledgeModule } from './modules/knowledge/KnowledgeModule';
import { DocumentsModule } from './modules/documents/DocumentsModule';
import { OccurrencesModule } from './modules/occurrences/OccurrencesModule';
import { AuditModule } from './modules/audit/AuditModule';
import { SettingsModule } from './modules/settings/SettingsModule';
import { MyWorkModule } from './modules/mywork/MyWorkModule';

const MainAppContent: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const { sidebarCollapsed } = useApp();

  const renderModule = () => {
    switch (currentPath) {
      case '/':
        return <DashboardModule onNavigate={setCurrentPath} />;
      case '/strategy':
        return <StrategyModule />;
      case '/commercial':
        return <CommercialModule />;
      case '/customers':
        return <CustomersModule />;
      case '/reservations':
        return <ReservationsModule />;
      case '/operation':
        return <OperationModule />;
      case '/volumes':
        return <VolumesModule />;
      case '/units':
        return <UnitsModule />;
      case '/finance':
        return <FinanceModule />;
      case '/reports':
        return <ReportsModule />;
      case '/team':
        return <TeamModule />;
      case '/assets':
        return <AssetsModule />;
      case '/partners':
        return <PartnersModule />;
      case '/knowledge':
        return <KnowledgeModule />;
      case '/documents':
        return <DocumentsModule />;
      case '/occurrences':
        return <OccurrencesModule />;
      case '/audit':
        return <AuditModule />;
      case '/settings':
        return <SettingsModule />;
      case '/mywork':
        return <MyWorkModule />;
      default:
        return <DashboardModule onNavigate={setCurrentPath} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Fixed Sidebar */}
      <Sidebar currentPath={currentPath} onNavigate={setCurrentPath} />

      {/* Main Content Viewport */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? 'pl-20' : 'pl-64'
        }`}
      >
        {/* Top Header */}
        <Header currentPath={currentPath} onNavigate={setCurrentPath} />

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {renderModule()}
        </main>
      </div>

      {/* Global Interactive Elements */}
      <CommandPalette onNavigate={setCurrentPath} />
      <RealizationModal />
      <ReservationWizardModal />
      <ReservationDetailDrawer />
      <VolumeDetailDrawer />
      <Customer360Drawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
