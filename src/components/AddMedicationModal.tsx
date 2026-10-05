import React, { useState } from 'react';
import { Medication, PillIconType } from '../types';
import { PillIcon } from './PillIcon';
import { soundService } from '../utils/audio';

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newMed: Medication) => void;
}

export const AddMedicationModal: React.FC<AddMedicationModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('14:00');
  const [type, setType] = useState<PillIconType>('pill');
  const [instructions, setInstructions] = useState('');
  const [totalPills, setTotalPills] = useState('30');
  const [frequency, setFrequency] = useState('Diario');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // Convert 24h to 12h AM/PM
    const [hhStr, mmStr] = time.split(':');
    const hh = parseInt(hhStr, 10);
    const mm = parseInt(mmStr, 10);
    const ampm = hh >= 12 ? 'PM' : 'AM';
    const displayH = hh % 12 === 0 ? 12 : hh % 12;
    const formattedTime = `${String(displayH).padStart(2, '0')}:${String(mm).padStart(2, '0')} ${ampm}`;

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: name.trim(),
      dosage: dosage.trim() || '1 dosis',
      time: formattedTime,
      timeMinutes: hh * 60 + mm,
      type,
      instructions: instructions.trim() || 'Tomar según prescripción con agua.',
      color: type === 'capsule' ? '#10b981' : '#0284c7',
      bgLight: type === 'capsule' ? '#d1fae5' : '#e0f2fe',
      status: 'pending',
      totalPills: parseInt(totalPills, 10) || 30,
      remainingPills: parseInt(totalPills, 10) || 30,
      frequency: frequency.trim() || 'Diario',
      prescribedBy: 'Mi Médico de Cabecera',
    };

    soundService.playSuccess();
    onAdd(newMed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4 sm:hidden" />

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-800">
            Nuevo Recordatorio de Medicación
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nombre del medicamento *
            </label>
            <input
              type="text"
              required
              placeholder="ej. Paracetamol, Amoxicilina"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Dosis *
              </label>
              <input
                type="text"
                placeholder="ej. 500mg, 10ml"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hora programada *
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tipo de presentación
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['pill', 'capsule', 'tablet'] as PillIconType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`py-2 px-3 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    type === t
                      ? 'border-sky-500 bg-sky-50 text-sky-800 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <PillIcon type={t} size={22} color={type === t ? '#0284c7' : '#64748b'} />
                  <span className="text-[11px] capitalize">
                    {t === 'pill' ? 'Pastilla' : t === 'capsule' ? 'Cápsula' : 'Comprimido'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Frecuencia
            </label>
            <input
              type="text"
              placeholder="ej. Cada 12 horas, Cada 24h con cena"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Instrucciones / Notas
            </label>
            <textarea
              rows={2}
              placeholder="ej. Tomar después de comer con abundante líquido."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 transition-all"
            >
              Guardar recordatorio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
