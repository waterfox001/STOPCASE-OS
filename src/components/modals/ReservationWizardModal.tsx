import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LuggageCategory, Customer, Reservation } from '../../types';
import {
  X,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Clock,
  Building2,
  Luggage,
  CreditCard,
  User,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const ReservationWizardModal: React.FC = () => {
  const {
    isQuickCreateOpen,
    setIsQuickCreateOpen,
    quickCreateType,
    units,
    categories,
    customers,
    addReservation,
    addCustomer
  } = useApp();

  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('CUST-001');
  const [newCustomerName, setNewCustomerName] = useState<string>('');
  const [newCustomerPhone, setNewCustomerPhone] = useState<string>('');
  const [newCustomerDoc, setNewCustomerDoc] = useState<string>('');
  const [isCreatingNewCustomer, setIsCreatingNewCustomer] = useState<boolean>(false);

  const [selectedUnitId, setSelectedUnitId] = useState<string>('CGH');
  const [startDate, setStartDate] = useState<string>('2026-10-05T14:00');
  const [expectedEndDate, setExpectedEndDate] = useState<string>('2026-10-06T18:00');
  const [selectedCategoryCode, setSelectedCategoryCode] = useState<'P' | 'M' | 'G' | 'ESP'>('M');
  const [quantity, setQuantity] = useState<number>(1);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<'PIX' | 'Cartão Crédito' | 'Cartão Débito' | 'Faturado / Empresa' | 'Dinheiro'>('PIX');
  const [flightNumber, setFlightNumber] = useState<string>('LA 3390');
  const [airline, setAirline] = useState<string>('LATAM');
  const [notes, setNotes] = useState<string>('');

  if (!isQuickCreateOpen || quickCreateType !== 'reservation') return null;

  // Selected entities
  const currentCategory = categories.find((c) => c.code === selectedCategoryCode) || categories[1];
  const currentUnit = units.find((u) => u.id === selectedUnitId) || units[0];
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

  // Calculate durations and prices
  const start = new Date(startDate).getTime();
  const end = new Date(expectedEndDate).getTime();
  const diffHours = Math.max(1, Math.round((end - start) / (1000 * 60 * 60)));
  const days = Math.max(1, Math.ceil(diffHours / 24));

  const basePricePerItem = currentCategory.dailyRate * days;
  const subtotal = basePricePerItem * quantity;
  const discountAmount = Number(((subtotal * discountPercent) / 100).toFixed(2));
  const airportTax = 0.00; // Isento no balcão
  const finalAmount = Math.max(0, subtotal - discountAmount + airportTax);

  const handleNext = () => {
    if (step < 8) setStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleFinish = () => {
    let customerId = selectedCustomerId;
    let customerName = selectedCustomer?.name || 'Cliente Balcão';
    let customerPhone = selectedCustomer?.phone || '(11) 99999-0000';

    if (isCreatingNewCustomer && newCustomerName) {
      const created = addCustomer({
        name: newCustomerName,
        document: newCustomerDoc || '000.000.000-00',
        email: 'cliente@exemplo.com.br',
        phone: newCustomerPhone || '(11) 99999-0000',
        city: currentUnit.shortName,
        state: 'BR',
        segment: 'Novo'
      });
      customerId = created.id;
      customerName = created.name;
      customerPhone = created.phone;
    }

    addReservation({
      customerId,
      customerName,
      customerPhone,
      unitId: selectedUnitId,
      startDate: new Date(startDate).toISOString(),
      expectedEndDate: new Date(expectedEndDate).toISOString(),
      category: selectedCategoryCode,
      quantity,
      totalAmount: subtotal,
      discountAmount,
      finalAmount,
      paymentMethod,
      paymentStatus: 'paid',
      status: 'active',
      volumes: [],
      flightNumber,
      airline,
      notes
    });

    setIsQuickCreateOpen(false);
    setStep(1);
  };

  const stepsList = [
    'Cliente',
    'Unidade',
    'Data/Hora',
    'Categoria',
    'Quantidade',
    'Valor',
    'Pagamento',
    'Confirmação'
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150"
      onClick={() => setIsQuickCreateOpen(false)}
    >
      <div
        className="w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
              Wizard de Emissão Operacional · 8 Etapas
            </div>
            <h2 className="text-base font-bold text-slate-100">
              Nova Reserva de Guarda-Volumes / Bagagem
            </h2>
          </div>
          <button
            onClick={() => setIsQuickCreateOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="bg-slate-950/60 px-4 py-2.5 border-b border-slate-800/80 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[580px] gap-2">
            {stepsList.map((st, index) => {
              const num = index + 1;
              const isPast = num < step;
              const isCurrent = num === step;

              return (
                <div key={st} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-500/40'
                        : isPast
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-3.5 h-3.5" /> : num}
                  </div>
                  <span
                    className={`text-xs whitespace-nowrap ${
                      isCurrent ? 'font-bold text-amber-400' : isPast ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {st}
                  </span>
                  {num < 8 && <div className="w-4 h-0.5 bg-slate-800" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Main Content Grid (Form + Dynamic Sidebar Summary) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-y-auto">
          {/* Form Step Body (2 cols) */}
          <div className="lg:col-span-2 p-6 space-y-6">
            {/* ETAPA 1: Cliente */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Etapa 1 · Identificação do Cliente</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsCreatingNewCustomer(!isCreatingNewCustomer)}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    {isCreatingNewCustomer ? 'Selecionar da Base Existente' : '+ Cadastrar Novo Cliente no Balcão'}
                  </button>
                </div>

                {!isCreatingNewCustomer ? (
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Buscar e Selecionar Cliente Cadastrado
                    </label>
                    <select
                      value={selectedCustomerId}
                      onChange={(e) => setSelectedCustomerId(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      {customers.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} · {c.document} · ({c.segment}) - {c.phone}
                        </option>
                      ))}
                    </select>
                    {selectedCustomer && (
                      <div className="mt-3 p-3 bg-slate-950/60 rounded-lg border border-slate-800 text-xs space-y-1">
                        <div className="text-slate-200 font-semibold">{selectedCustomer.name}</div>
                        <div className="text-slate-400">CPF: {selectedCustomer.document} · {selectedCustomer.phone}</div>
                        <div className="text-slate-400">Segmento: <span className="text-amber-400">{selectedCustomer.segment}</span> · Histórico: {selectedCustomer.reservationsCount} reservas</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo *</label>
                      <input
                        type="text"
                        value={newCustomerName}
                        onChange={(e) => setNewCustomerName(e.target.value)}
                        placeholder="Ex: João Silva de Souza"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">CPF / Passaporte *</label>
                        <input
                          type="text"
                          value={newCustomerDoc}
                          onChange={(e) => setNewCustomerDoc(e.target.value)}
                          placeholder="000.000.000-00"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Telefone *</label>
                        <input
                          type="text"
                          value={newCustomerPhone}
                          onChange={(e) => setNewCustomerPhone(e.target.value)}
                          placeholder="(11) 98888-7777"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ETAPA 2: Unidade */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Etapa 2 · Seleção da Unidade / Aeroporto</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {units.map((u) => {
                    const isSelected = selectedUnitId === u.id;
                    const occupancyPct = Math.round((u.capacityOccupied / u.capacityTotal) * 100);
                    return (
                      <div
                        key={u.id}
                        onClick={() => setSelectedUnitId(u.id)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                            {u.airportCode}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">{occupancyPct}% ocupado</span>
                        </div>
                        <div className="text-sm font-bold text-slate-100">{u.name}</div>
                        <div className="text-xs text-slate-400 mt-1">{u.terminal}</div>
                        <div className="text-[11px] text-slate-500 mt-2">
                          Vagas disponíveis: <strong className="text-emerald-400">{u.capacityTotal - u.capacityOccupied}</strong> de {u.capacityTotal}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ETAPA 3: Data / Hora */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Etapa 3 · Período de Armazenamento e Voo</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Data & Hora de Entrada (Início)
                    </label>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Previsão de Retirada (Check-out)
                    </label>
                    <input
                      type="datetime-local"
                      value={expectedEndDate}
                      onChange={(e) => setExpectedEndDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <span>Duração estimada calculada:</span>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {diffHours} horas ({days} diária{days > 1 ? 's' : ''})
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Companhia Aérea (Opcional)
                    </label>
                    <input
                      type="text"
                      value={airline}
                      onChange={(e) => setAirline(e.target.value)}
                      placeholder="LATAM / Gol / Azul"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Número do Voo (Opcional)
                    </label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="Ex: LA 3390"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 4: Categoria / Tamanho */}
            {step === 4 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-amber-400" />
                  <span>Etapa 4 · Categoria e Dimensões do Volume</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {categories.map((cat) => {
                    const isSelected = selectedCategoryCode === cat.code;
                    return (
                      <div
                        key={cat.id}
                        onClick={() => setSelectedCategoryCode(cat.code)}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="font-mono text-xs font-bold px-2 py-0.5 rounded text-slate-950"
                            style={{ backgroundColor: cat.color }}
                          >
                            {cat.code}
                          </span>
                          <span className="font-mono text-xs font-bold text-slate-200">
                            R$ {cat.dailyRate.toFixed(2)}/dia
                          </span>
                        </div>
                        <div className="text-sm font-bold text-slate-100 mt-2">{cat.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{cat.dimensions}</div>
                        <div className="text-[11px] text-slate-500 mt-1">{cat.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ETAPA 5: Quantidade */}
            {step === 5 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span>Etapa 5 · Quantidade de Volumes</span>
                </h3>
                <div className="p-6 bg-slate-950/60 rounded-xl border border-slate-800 text-center space-y-4">
                  <div className="text-xs text-slate-400">
                    Quantas bagagens da categoria <strong>{currentCategory.name}</strong> serão armazenadas nesta reserva?
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-xl font-bold text-slate-200 cursor-pointer"
                    >
                      -
                    </button>
                    <div className="w-20 text-3xl font-extrabold font-mono text-amber-400 tabular-nums">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-xl font-bold text-slate-200 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Cada volume receberá uma etiqueta exclusiva e armário alocado individualmente.
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 6: Valor */}
            {step === 6 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Etapa 6 · Cálculo de Tarifas e Descontos</span>
                </h3>
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Tarifa unitária ({currentCategory.name}):</span>
                    <span className="font-mono">R$ {currentCategory.dailyRate.toFixed(2)} / dia</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Período contratado:</span>
                    <span className="font-mono">{days} diária(s) × {quantity} volume(s)</span>
                  </div>
                  <div className="flex justify-between font-semibold text-slate-200 pt-2 border-t border-slate-800">
                    <span>Subtotal:</span>
                    <span className="font-mono">R$ {subtotal.toFixed(2)}</span>
                  </div>

                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Aplicar Desconto Promocional / Convênio (%):
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                        className="w-24 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 font-mono"
                      />
                      <span className="text-slate-400">% de desconto (-R$ {discountAmount.toFixed(2)})</span>
                    </div>
                  </div>

                  <div className="flex justify-between font-bold text-sm text-amber-400 pt-3 border-t border-slate-800">
                    <span>Total Final a Cobrar:</span>
                    <span className="font-mono text-base">R$ {finalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ETAPA 7: Pagamento */}
            {step === 7 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Etapa 7 · Forma de Pagamento</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {(['PIX', 'Cartão Crédito', 'Cartão Débito', 'Faturado / Empresa', 'Dinheiro'] as const).map((method) => {
                    const isSelected = paymentMethod === method;
                    return (
                      <div
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`p-3 rounded-xl border text-center font-semibold text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-amber-400 ring-1 ring-amber-500'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {method}
                      </div>
                    );
                  })}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Observações Operacionais ou Requisitos Especiais:
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex: Bagagem frágil, preferência por locker inferior, cliente voltará antes do fechamento."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-sm text-slate-100"
                  />
                </div>
              </div>
            )}

            {/* ETAPA 8: Confirmação */}
            {step === 8 && (
              <div className="space-y-4 animate-in fade-in">
                <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Etapa 8 · Revisão Final e Confirmação</span>
                </h3>
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cliente:</span>
                    <span className="font-semibold text-slate-200">{isCreatingNewCustomer ? newCustomerName : selectedCustomer?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Unidade Aeroporto:</span>
                    <span className="font-semibold text-amber-400">{currentUnit.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Período:</span>
                    <span className="font-mono text-slate-200">{startDate.replace('T', ' ')} até {expectedEndDate.replace('T', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Volumes & Categoria:</span>
                    <span className="font-semibold text-slate-200">{quantity}x {currentCategory.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Forma de Pagamento:</span>
                    <span className="font-semibold text-slate-200">{paymentMethod} (Quitado)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold text-amber-400">
                    <span>Total Final:</span>
                    <span className="font-mono">R$ {finalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300">
                  Ao confirmar, o sistema gerará os códigos de rastreamento (SC-VOL-XXXXXX), registrará a ocupação do armário e emitirá o recibo fiscal.
                </div>
              </div>
            )}
          </div>

          {/* Lateral Summary (Resumo Lateral Dinâmico) */}
          <div className="p-6 bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-3">
                Resumo da Operação
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase font-mono">Aeroporto</div>
                  <div className="font-bold text-slate-100">{currentUnit.shortName}</div>
                  <div className="text-[11px] text-slate-400">{currentUnit.terminal}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase font-mono">Volumes</div>
                  <div className="font-bold text-slate-100">{quantity} volume(s)</div>
                  <div className="text-[11px] text-slate-400">{currentCategory.name}</div>
                </div>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase font-mono">Período</div>
                  <div className="font-bold font-mono text-amber-400">{days} diária(s) ({diffHours}h)</div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal:</span>
                    <span className="font-mono">R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Desconto ({discountPercent}%):</span>
                      <span className="font-mono">-R$ {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Taxas:</span>
                    <span className="font-mono">R$ 0,00</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-amber-400 pt-2 border-t border-slate-800">
                    <span>Total:</span>
                    <span className="font-mono text-base">R$ {finalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="pt-6 flex items-center gap-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg cursor-pointer flex items-center justify-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Voltar</span>
                </button>
              )}

              {step < 8 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Avançar</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="flex-1 py-2 text-xs font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-lg shadow-md shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Emitir Reserva</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
