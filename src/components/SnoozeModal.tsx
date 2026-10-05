import React, { useState } from 'react';
import { Medication } from '../types';
import { PillIcon } from './PillIcon';
import { soundService } from '../utils/audio';

interface SnoozeModalProps {
  medication: Medication | null;
  isOpen: boolean;
  onClose: () => void;
  onSnooze: (id: string, minutes: number) => void;
}

export const SnoozeModal: React.FC<SnoozeModalProps> = ({
  medication,
  isOpen,
  onClose,
  onSnooze,
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number>(15);

  if (!isOpen || !medication) return null;

  const snoozeOptions = [
    { label: '+15 min', minutes: 15, desc: 'Recordatorio rápido' },
    { label: '+30 min', minutes: 30, desc: 'Media hora más' },
    { label: '+1 hora', minutes: 60, desc: 'Después del almuerzo' },
    { label: '+2 horas', minutes: 120, desc: 'Esta tarde' },
  ];

  const handleConfirm = () => {
    soundService.playSnooze();
    onSnooze(medication.id, selectedMinutes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity">
      <div
        className="w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-100 animate-in slide-in-from-bottom duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Grab handle for sheet */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
            <PillIcon type={medication.type} color="#10b981" size={26} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-800">
              Posponer {medication.name}
            </h3>
            <p className="text-xs text-slate-500">
              Dosis programada: {medication.time} ({medication.dosage})
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 mb-3">
          ¿En cuánto tiempo deseas que MediCare vuelva a recordarte esta toma?
        </p>

        {/* Options */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {snoozeOptions.map((opt) => (
            <button
              key={opt.minutes}
              type="button"
              onClick={() => setSelectedMinutes(opt.minutes)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                selectedMinutes === opt.minutes
                  ? 'border-sky-500 bg-sky-50/80 shadow-xs'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="text-sm font-semibold text-slate-800">
                {opt.label}
              </div>
              <div className="text-[11px] text-slate-500">{opt.desc}</div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 active:scale-[0.98] transition-all shadow-md shadow-sky-600/20"
          >
            Confirmar posponer
          </button>
        </div>
      </div>
    </div>
  );
};
