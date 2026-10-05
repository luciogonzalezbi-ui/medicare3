import React, { useState } from 'react';
import { Medication } from '../types';
import { PillIcon } from './PillIcon';
import { Plus, Package, AlertTriangle, ShieldCheck, Search, Filter } from 'lucide-react';

interface MedicationsTabProps {
  medications: Medication[];
  onSelectMed: (med: Medication) => void;
  onOpenAddModal: () => void;
}

export const MedicationsTab: React.FC<MedicationsTabProps> = ({
  medications,
  onSelectMed,
  onOpenAddModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'daily' | 'low'>('all');
  const [search, setSearch] = useState('');

  const filtered = medications.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.dosage.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'daily') return m.frequency.toLowerCase().includes('diario') || m.frequency.toLowerCase().includes('día');
    if (filter === 'low') return m.remainingPills <= 20;
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-1 pt-1">
        <div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-sky-600">
            Botiquín Personal
          </span>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">
            Medicamentos
          </h1>
        </div>
        <button
          onClick={onOpenAddModal}
          className="py-1.5 px-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-sky-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar medicamento o dosis..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-slate-200/80 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-xs"
        />
      </div>

      {/* Segmented Filter Control */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-all ${
            filter === 'all'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Todos ({medications.length})
        </button>
        <button
          onClick={() => setFilter('daily')}
          className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-all ${
            filter === 'daily'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Diarios
        </button>
        <button
          onClick={() => setFilter('low')}
          className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-all ${
            filter === 'low'
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Reponer stock
        </button>
      </div>

      {/* Medication Inventory List */}
      <div className="space-y-3">
        {filtered.map((med) => {
          const pillPercent = Math.round((med.remainingPills / med.totalPills) * 100);
          const isLowStock = med.remainingPills <= 20;

          return (
            <div
              key={med.id}
              onClick={() => onSelectMed(med)}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-sky-300 transition-all cursor-pointer shadow-xs hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: med.bgLight,
                      borderColor: `${med.color}25`,
                    }}
                  >
                    <PillIcon type={med.type} color={med.color} size={26} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-800">
                        {med.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        {med.dosage}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{med.frequency}</p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                  {med.time}
                </span>
              </div>

              {/* Stock Bar */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Package className="w-3 h-3 text-slate-400" />
                    Stock restante
                  </span>
                  <span
                    className={`font-semibold tabular-nums ${
                      isLowStock ? 'text-amber-600' : 'text-slate-700'
                    }`}
                  >
                    {med.remainingPills} de {med.totalPills} dosis
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isLowStock ? 'bg-amber-400' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${pillPercent}%` }}
                  />
                </div>

                {isLowStock && (
                  <div className="flex items-center gap-1 text-[10px] text-amber-700 font-medium mt-1.5">
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                    <span>Quedan menos del 30%. Solicita tu receta médica pronto.</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
