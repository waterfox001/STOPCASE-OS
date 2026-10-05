import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  Clock,
  Target,
  Briefcase,
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Building2,
  User,
  Plus
} from 'lucide-react';

export const MyWorkModule: React.FC = () => {
  const {
    userProfile,
    followUps,
    occurrences,
    objectives,
    showToast
  } = useApp();

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Conferir ocupação dos armários do Piso 1 Congonhas antes do pico das 17h', done: false, priority: 'Alta' },
    { id: 2, title: 'Validar conciliação das taxas da Aena com a gerência financeira', done: true, priority: 'Média' },
    { id: 3, title: 'Substituir bobina térmica reserva do guichê 2 Recife', done: false, priority: 'Média' },
    { id: 4, title: 'Revisar proposta do convênio corporativo com LATAM Airlines', done: false, priority: 'Urgente' }
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
            Cockpit Individual · Produtividade
          </div>
          <h2 className="text-xl font-extrabold text-slate-100 tracking-tight mt-0.5">
            Meu Trabalho, Tarefas & Rotina Diária
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Visão consolidada de pendências, follow-ups de clientes, metas e incidentes atribuídos a você.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 font-bold uppercase">
            {userProfile}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: My Tasks & Follow-ups */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tasks Box */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-slate-100">Minhas Tarefas & Checklist do Dia</h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {tasks.filter((t) => t.done).length} de {tasks.length} concluídas
              </span>
            </div>

            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                    task.done ? 'bg-slate-950/40 border-slate-800 text-slate-400' : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center ${
                        task.done ? 'bg-emerald-500 text-slate-950' : 'border border-slate-600'
                      }`}
                    >
                      {task.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className={task.done ? 'line-through text-slate-500' : 'font-medium'}>
                      {task.title}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase ${
                      task.priority === 'Urgente'
                        ? 'bg-rose-500/20 text-rose-400'
                        : task.priority === 'Alta'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-ups assigned */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-slate-100">Follow-ups Comerciais sob sua Responsabilidade</h3>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {followUps.slice(0, 3).map((f) => (
                <div key={f.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-200">{f.companyName} ({f.contactName})</div>
                    <div className="text-slate-400 text-[11px] mt-0.5">{f.nextAction}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[10px] text-amber-400 font-bold">Prazo: {f.dueDate}</div>
                    <span className="text-[10px] text-slate-500 font-mono">Canal: {f.channel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Key Results & Occurrences */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Target className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-slate-100">Metas Vinculadas a Você</h3>
            </div>

            <div className="space-y-3 text-xs">
              {objectives[0]?.keyResults.slice(0, 2).map((kr) => (
                <div key={kr.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="font-semibold text-slate-200">{kr.title}</div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${kr.progress}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>{kr.progress}% concluído</span>
                    <span className="text-amber-400">Prazo: {kr.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-bold text-slate-100">Ocorrências Atribuídas</h3>
            </div>

            <div className="space-y-2 text-xs">
              {occurrences.slice(0, 2).map((o) => (
                <div key={o.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="font-mono font-bold text-rose-400 text-[11px]">{o.protocol}</div>
                  <div className="font-semibold text-slate-200 text-xs mt-0.5">{o.title}</div>
                  <div className="text-[10px] text-slate-500 font-mono mt-1">Status: {o.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
