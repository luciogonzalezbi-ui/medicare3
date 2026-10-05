import React, { useState, useEffect } from 'react';
import { Medication, WeatherInfo } from '../types';
import { PillIcon } from './PillIcon';
import { soundService } from '../utils/audio';
import {
  Sun,
  Clock,
  Check,
  RotateCcw,
  Sparkles,
  ChevronRight,
  Plus,
  ShieldCheck,
  Droplets,
  Calendar as CalendarIcon,
} from 'lucide-react';

interface TodayTabProps {
  medications: Medication[];
  weather: WeatherInfo;
  onToggleStatus: (id: string) => void;
  onOpenSnooze: (med: Medication) => void;
  onSelectMed: (med: Medication) => void;
  onOpenAddModal: () => void;
}

export const TodayTab: React.FC<TodayTabProps> = ({
  medications,
  weather,
  onToggleStatus,
  onOpenSnooze,
  onSelectMed,
  onOpenAddModal,
}) => {
  const [currentTimeStr, setCurrentTimeStr] = useState<string>('09:24 AM');
  const [currentDateStr, setCurrentDateStr] = useState<string>('Lunes, 5 de Octubre');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format 12-hour
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedH = hours % 12 === 0 ? 12 : hours % 12;
      const formattedM = minutes < 10 ? `0${minutes}` : minutes;
      setCurrentTimeStr(`${String(formattedH).padStart(2, '0')}:${formattedM} ${ampm}`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      };
      const formattedDate = now.toLocaleDateString('es-ES', options);
      // Capitalize first letter
      setCurrentDateStr(formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1));
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const takenCount = medications.filter((m) => m.status === 'taken').length;
  const totalCount = medications.length;
  const progressPercent = totalCount > 0 ? Math.round((takenCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-4 pb-20">
      {/* Header Greeting */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-sky-600">
            {currentDateStr}
          </span>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            ¡Hola, Lucía!
          </h1>
        </div>
        <button
          onClick={onOpenAddModal}
          className="w-10 h-10 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 flex items-center justify-center transition-transform active:scale-95 border border-sky-500/20 shadow-xs"
          title="Agregar nuevo recordatorio"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Tarjeta Principal de "Hoy" con Hora Actual y Clima */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 p-5 text-white shadow-xl shadow-sky-500/20">
        {/* Subtle decorative background circles */}
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-40 h-40 rounded-full bg-emerald-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Hoy</span>
            </div>

            {/* Weather Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium text-white">
              <Sun className="w-4 h-4 text-amber-300 animate-[spin_12s_linear_infinite]" />
              <span className="tabular-nums font-semibold">{weather.temp}°C</span>
              <span className="text-white/80 hidden xs:inline">· Soleado</span>
            </div>
          </div>

          {/* Current Time Display */}
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs font-medium text-sky-100 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-200" />
                Hora actual
              </p>
              <div className="text-3xl font-extrabold tracking-tight tabular-nums mt-0.5">
                {currentTimeStr}
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-sky-100">Progreso de hoy</p>
              <div className="text-xl font-bold tabular-nums">
                {takenCount}/{totalCount} <span className="text-xs font-normal text-sky-200">tomas</span>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 pt-3 border-t border-white/15">
            <div className="flex items-center justify-between text-xs text-sky-100 mb-1.5">
              <span className="flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3 h-3 text-emerald-300" />
                {progressPercent === 100
                  ? '¡Excelente! Todas las tomas completadas'
                  : `${progressPercent}% completado hoy`}
              </span>
              <span className="font-semibold tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-300 to-emerald-400 h-full rounded-full transition-all duration-500 ease-out shadow-xs"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recordatorios de Medicación Section Header */}
      <div className="flex items-center justify-between pt-1 px-1">
        <div>
          <h2 className="text-sm font-bold text-slate-800 tracking-tight">
            Recordatorios de hoy
          </h2>
          <p className="text-[11px] text-slate-500">
            Horarios programados para tus tomas
          </p>
        </div>
        <span className="text-[11px] font-medium text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
          {medications.length} activos
        </span>
      </div>

      {/* Lista de Recordatorios de Medicación */}
      <div className="space-y-3">
        {medications.map((med, index) => {
          const isTaken = med.status === 'taken';
          const isSnoozed = med.status === 'snoozed';

          return (
            <div
              key={med.id}
              onClick={() => onSelectMed(med)}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 cursor-pointer p-4 ${
                isTaken
                  ? 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-200'
                  : isSnoozed
                  ? 'bg-amber-50/40 border-amber-100 hover:border-amber-200'
                  : 'bg-white border-slate-200/80 hover:border-sky-300 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Left accent bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 transition-colors ${
                  isTaken
                    ? 'bg-emerald-500'
                    : isSnoozed
                    ? 'bg-amber-400'
                    : index === 0
                    ? 'bg-sky-500'
                    : 'bg-emerald-500'
                }`}
              />

              <div className="flex items-center justify-between gap-3">
                {/* Pill icon and details */}
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                      isTaken
                        ? 'bg-emerald-100/80 border-emerald-200'
                        : isSnoozed
                        ? 'bg-amber-100/60 border-amber-200'
                        : 'bg-sky-50 border-sky-100'
                    }`}
                  >
                    <PillIcon
                      type={med.type}
                      color={isTaken ? '#059669' : med.color}
                      size={28}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3
                        className={`text-sm font-bold truncate ${
                          isTaken ? 'text-slate-600 line-through' : 'text-slate-800'
                        }`}
                      >
                        {med.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded-md shrink-0">
                        {med.dosage}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="font-semibold tabular-nums text-slate-700">
                        {med.time}
                      </span>
                      {isTaken && (
                        <span className="text-[11px] text-emerald-600 font-medium">
                          · Tomada ({med.takenAt || med.time})
                        </span>
                      )}
                      {isSnoozed && (
                        <span className="text-[11px] text-amber-600 font-medium">
                          · Pospuesta ({med.snoozedUntil})
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 truncate mt-1 max-w-[210px]">
                      {med.instructions}
                    </p>
                  </div>
                </div>

                {/* Specific Action Buttons as requested:
                    1. "Ibuprofeno" -> Botón de "Tomada"
                    2. "Vitamina C" -> Botón de "Posponer"
                    And allow toggling and customization on all!
                */}
                <div
                  className="flex items-center gap-1.5 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Snooze Button */}
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playTap();
                      onOpenSnooze(med);
                    }}
                    className={`px-2.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                      isSnoozed
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-800'
                    }`}
                    title="Posponer recordatorio"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">Posponer</span>
                  </button>

                  {/* Tomada Check Button */}
                  <button
                    type="button"
                    onClick={() => {
                      soundService.playSuccess();
                      onToggleStatus(med.id);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shadow-xs ${
                      isTaken
                        ? 'bg-emerald-600 text-white shadow-emerald-600/20 active:scale-95'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 active:scale-95'
                    }`}
                    title={isTaken ? 'Marcada como tomada' : 'Marcar como tomada'}
                  >
                    <Check className={`w-3.5 h-3.5 ${isTaken ? 'stroke-[2.5]' : ''}`} />
                    <span>{isTaken ? 'Tomada' : 'Tomar'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Wellness & Hydration Quick Reminder Banner */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">
              Consejo médico del día
            </h4>
            <p className="text-[11px] text-slate-500">
              Bebe un vaso de agua lleno con cada toma de comprimidos.
            </p>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
      </div>
    </div>
  );
};
