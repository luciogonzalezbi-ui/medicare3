import React, { useState } from 'react';
import { Medication } from '../types';
import { PillIcon } from './PillIcon';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Flame,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
} from 'lucide-react';

interface CalendarTabProps {
  medications: Medication[];
}

export const CalendarTab: React.FC<CalendarTabProps> = ({ medications }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(3); // Wednesday/selected

  const daysOfWeek = [
    { day: 'Lun', date: '2', full: '2 de Octubre', status: 'completed', percent: 100 },
    { day: 'Mar', date: '3', full: '3 de Octubre', status: 'completed', percent: 100 },
    { day: 'Mié', date: '4', full: '4 de Octubre', status: 'completed', percent: 100 },
    { day: 'Jue', date: '5', full: '5 de Octubre (Hoy)', status: 'in-progress', percent: 75 },
    { day: 'Vie', date: '6', full: '6 de Octubre', status: 'upcoming', percent: 0 },
    { day: 'Sáb', date: '7', full: '7 de Octubre', status: 'upcoming', percent: 0 },
    { day: 'Dom', date: '8', full: '8 de Octubre', status: 'upcoming', percent: 0 },
  ];

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-sky-600">
            Seguimiento y Registro
          </span>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Calendario
          </h1>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>14 días de racha</span>
        </div>
      </div>

      {/* Week Selector Bar */}
      <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-600 font-medium">
          <span className="font-bold text-slate-800">Octubre 2026</span>
          <div className="flex gap-1 text-slate-400">
            <button className="p-1 hover:text-slate-700 rounded-lg hover:bg-slate-100">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 hover:text-slate-700 rounded-lg hover:bg-slate-100">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {daysOfWeek.map((item, idx) => {
            const isSelected = selectedDayIndex === idx;
            const isToday = idx === 3;
            return (
              <button
                key={item.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`py-2 px-1 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 scale-105'
                    : isToday
                    ? 'bg-sky-50 text-sky-700 border border-sky-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-[10px] font-medium uppercase opacity-80">
                  {item.day}
                </span>
                <span className="text-sm font-bold tabular-nums">
                  {item.date}
                </span>
                {/* Dot status */}
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected
                      ? 'bg-white'
                      : item.status === 'completed'
                      ? 'bg-emerald-500'
                      : item.status === 'in-progress'
                      ? 'bg-sky-500'
                      : 'bg-slate-200'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Monthly Adherence Card */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-5 text-white shadow-lg shadow-emerald-500/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-200" />
            <h3 className="text-sm font-bold">Adherencia al Tratamiento</h3>
          </div>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">
            Este mes
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black tabular-nums">96.4%</span>
          <span className="text-xs text-emerald-100">de tomas registradas a tiempo</span>
        </div>
        <p className="text-xs text-emerald-100/90 mt-2 leading-relaxed">
          Mantener la constancia reduce un 45% los picos de malestar y optimiza la efectividad del tratamiento prescrito.
        </p>
      </div>

      {/* Selected Day Timeline */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">
            Horario para {daysOfWeek[selectedDayIndex].full}
          </h3>
          <span className="text-xs font-medium text-slate-500">
            {medications.length} tomas programadas
          </span>
        </div>

        <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-100">
          {medications.map((med) => {
            const isTaken = med.status === 'taken';
            return (
              <div
                key={med.id}
                className="relative pl-9 flex items-center justify-between"
              >
                {/* Timeline node */}
                <div
                  className={`absolute left-2.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                    isTaken ? 'bg-emerald-500' : 'bg-sky-400'
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <PillIcon type={med.type} color={med.color} size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">
                      {med.name} ({med.dosage})
                    </h4>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {med.time} · {med.frequency}
                    </p>
                  </div>
                </div>

                <div>
                  {isTaken ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Completada
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                      Pendiente
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
