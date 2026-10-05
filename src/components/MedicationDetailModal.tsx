import React from 'react';
import { Medication } from '../types';
import { PillIcon } from './PillIcon';
import { Clock, ShieldAlert, User, CheckCircle2, Package } from 'lucide-react';

interface MedicationDetailModalProps {
  medication: Medication | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleStatus: (id: string) => void;
  onOpenSnooze: (med: Medication) => void;
}

export const MedicationDetailModal: React.FC<MedicationDetailModalProps> = ({
  medication,
  isOpen,
  onClose,
  onToggleStatus,
  onOpenSnooze,
}) => {
  if (!isOpen || !medication) return null;

  const isTaken = medication.status === 'taken';

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
        role="dialog"
      >
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center border"
              style={{
                backgroundColor: medication.bgLight,
                borderColor: `${medication.color}30`,
              }}
            >
              <PillIcon type={medication.type} color={medication.color} size={32} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">{medication.name}</h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                  {medication.dosage}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">{medication.frequency}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg text-xs"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Status banner */}
        <div
          className={`p-3 rounded-2xl mb-4 flex items-center justify-between ${
            isTaken
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : medication.status === 'snoozed'
              ? 'bg-amber-50 border border-amber-200 text-amber-800'
              : 'bg-sky-50 border border-sky-100 text-sky-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 shrink-0" />
            <span className="text-xs font-medium">
              {isTaken
                ? `Tomada hoy a las ${medication.takenAt || medication.time}`
                : medication.status === 'snoozed'
                ? `Pospuesta hasta las ${medication.snoozedUntil || 'más tarde'}`
                : `Programada para las ${medication.time}`}
            </span>
          </div>
          {isTaken && (
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-white/80 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Registrada
            </span>
          )}
        </div>

        {/* Key details list */}
        <div className="space-y-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-sky-600" />
              Instrucciones de toma
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {medication.instructions}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
              <Package className="w-3.5 h-3.5 text-emerald-600" />
              Disponibilidad en botiquín
            </div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Pastillas restantes:</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {medication.remainingPills} de {medication.totalPills} dosis
              </span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-2">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all"
                style={{
                  width: `${(medication.remainingPills / medication.totalPills) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-1">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              Prescripción médica
            </div>
            <p className="text-xs text-slate-600">{medication.prescribedBy}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {!isTaken && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSnooze(medication);
              }}
              className="py-3 px-4 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all"
            >
              Posponer
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              onToggleStatus(medication.id);
              onClose();
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-white transition-all shadow-md ${
              isTaken
                ? 'bg-slate-700 hover:bg-slate-800 shadow-slate-700/20'
                : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/25'
            }`}
          >
            {isTaken ? 'Desmarcar como tomada' : 'Marcar como tomada ahora'}
          </button>
        </div>
      </div>
    </div>
  );
};
