/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Medication,
  TabType,
  WeatherInfo,
  UserProfileData,
} from './types';
import {
  INITIAL_MEDICATIONS,
  INITIAL_WEATHER,
  INITIAL_USER,
} from './data/initialData';
import { soundService } from './utils/audio';
import { IPhoneFrame } from './components/IPhoneFrame';
import { TodayTab } from './components/TodayTab';
import { CalendarTab } from './components/CalendarTab';
import { MedicationsTab } from './components/MedicationsTab';
import { ProfileTab } from './components/ProfileTab';
import { SnoozeModal } from './components/SnoozeModal';
import { MedicationDetailModal } from './components/MedicationDetailModal';
import { AddMedicationModal } from './components/AddMedicationModal';
import { RenderViewerModal } from './components/RenderViewerModal';
import mockupImage from './assets/images/medicare_iphone_mockup_1791239522423.jpg';

import {
  Smartphone,
  Sparkles,
  Maximize2,
  Plus,
  Volume2,
  RotateCcw,
  CheckCircle2,
  Clock,
  Layers,
  Info,
} from 'lucide-react';

export default function App() {
  const [medications, setMedications] = useState<Medication[]>(INITIAL_MEDICATIONS);
  const [weather] = useState<WeatherInfo>(INITIAL_WEATHER);
  const [user, setUser] = useState<UserProfileData>(INITIAL_USER);
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [snoozeMed, setSnoozeMed] = useState<Medication | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRenderModalOpen, setIsRenderModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'iphone' | 'compact'>('iphone');

  // Mark medication as taken / untaken
  const handleToggleStatus = (id: string) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id !== id) return med;
        const willBeTaken = med.status !== 'taken';
        const now = new Date();
        const h = now.getHours() % 12 || 12;
        const m = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        const takenTime = `${String(h).padStart(2, '0')}:${m} ${ampm}`;

        return {
          ...med,
          status: willBeTaken ? 'taken' : 'pending',
          takenAt: willBeTaken ? takenTime : undefined,
          remainingPills: willBeTaken ? Math.max(0, med.remainingPills - 1) : med.remainingPills,
        };
      })
    );
  };

  // Snooze medication
  const handleSnooze = (id: string, minutes: number) => {
    const targetDate = new Date(Date.now() + minutes * 60000);
    const h = targetDate.getHours() % 12 || 12;
    const m = targetDate.getMinutes() < 10 ? `0${targetDate.getMinutes()}` : targetDate.getMinutes();
    const ampm = targetDate.getHours() >= 12 ? 'PM' : 'AM';
    const snoozeTime = `${String(h).padStart(2, '0')}:${m} ${ampm}`;

    setMedications((prev) =>
      prev.map((med) => {
        if (med.id !== id) return med;
        return {
          ...med,
          status: 'snoozed',
          snoozedUntil: snoozeTime,
        };
      })
    );
  };

  // Add custom medication
  const handleAddMedication = (newMed: Medication) => {
    setMedications((prev) => [...prev, newMed].sort((a, b) => a.timeMinutes - b.timeMinutes));
  };

  // Reset demo state
  const handleResetData = () => {
    setMedications(INITIAL_MEDICATIONS);
    soundService.playTap();
  };

  const completedCount = medications.filter((m) => m.status === 'taken').length;
  const nextPending = medications.find((m) => m.status !== 'taken');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50/40 to-slate-200 text-slate-800 flex flex-col font-sans">
      {/* 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            M
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            MediCare
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setActiveTab('today')}
            className={`transition-colors hover:text-sky-600 ${
              activeTab === 'today' ? 'text-sky-600 underline underline-offset-4 decoration-2' : ''
            }`}
          >
            Hoy
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`transition-colors hover:text-sky-600 ${
              activeTab === 'calendar' ? 'text-sky-600 underline underline-offset-4 decoration-2' : ''
            }`}
          >
            Calendario
          </button>
          <button
            onClick={() => setActiveTab('medications')}
            className={`transition-colors hover:text-sky-600 ${
              activeTab === 'medications' ? 'text-sky-600 underline underline-offset-4 decoration-2' : ''
            }`}
          >
            Medicamentos
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`transition-colors hover:text-sky-600 ${
              activeTab === 'profile' ? 'text-sky-600 underline underline-offset-4 decoration-2' : ''
            }`}
          >
            Perfil
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsRenderModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span className="hidden sm:inline">Render 3D</span>
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 shadow-md shadow-sky-600/20 active:scale-95 transition-all whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nuevo Recordatorio</span>
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
        {/* Left Column: Interactive iPhone 15 Pro UI */}
        <div className="w-full max-w-[420px] flex flex-col items-center">
          {/* Device Controls Bar */}
          <div className="w-full flex items-center justify-between mb-3 px-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-medium">
              <Smartphone className="w-4 h-4 text-sky-600" />
              iPhone 15 Pro · Titanio Natural
            </span>

            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('iphone')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  viewMode === 'iphone' ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Marco 3D
              </button>
              <button
                type="button"
                onClick={() => setViewMode('compact')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  viewMode === 'compact' ? 'bg-sky-50 text-sky-700 font-bold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Plano
              </button>
            </div>
          </div>

          {/* Interactive Screen within Frame */}
          <IPhoneFrame
            activeTab={activeTab}
            onTabChange={setActiveTab}
            fullWidthMode={viewMode === 'compact'}
          >
            {activeTab === 'today' && (
              <TodayTab
                medications={medications}
                weather={weather}
                onToggleStatus={handleToggleStatus}
                onOpenSnooze={(med) => setSnoozeMed(med)}
                onSelectMed={(med) => setSelectedMed(med)}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            )}
            {activeTab === 'calendar' && (
              <CalendarTab medications={medications} />
            )}
            {activeTab === 'medications' && (
              <MedicationsTab
                medications={medications}
                onSelectMed={(med) => setSelectedMed(med)}
                onOpenAddModal={() => setIsAddModalOpen(true)}
              />
            )}
            {activeTab === 'profile' && (
              <ProfileTab
                user={user}
                onToggleSound={() =>
                  setUser((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
                }
                onOpenRenderModal={() => setIsRenderModalOpen(true)}
              />
            )}
          </IPhoneFrame>
        </div>

        {/* Right Column: Design Showcase & Live Control Deck (Desktop Presence) */}
        <div className="w-full lg:max-w-md xl:max-w-lg space-y-6">
          {/* Photorealistic 3D Render Feature Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-sm font-bold text-slate-800">
                  Render 3D Oficial · Apple Design
                </h3>
              </div>
              <button
                onClick={() => setIsRenderModalOpen(true)}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                Ampliar
              </button>
            </div>

            {/* Thumbnail */}
            <div
              onClick={() => setIsRenderModalOpen(true)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md bg-slate-900 border border-slate-100"
            >
              <img
                src={mockupImage}
                alt="Render 3D iPhone 15 Pro MediCare en mano"
                referrerPolicy="no-referrer"
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div>
                  <p className="text-white text-xs font-bold">
                    iPhone 15 Pro sostenido en mano
                  </p>
                  <p className="text-slate-300 text-[11px]">
                    Entorno luminoso natural · Enfoque nítido en pantalla MediCare
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              Cumple al detalle las especificaciones: diseño en tonos suaves de azul cielo, blanco y verde menta con la tarjeta "Hoy", el clima y los recordatorios interactivos de Ibuprofeno y Vitamina C.
            </p>
          </div>

          {/* Quick Adherence Status & Fast Toggles */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">
                Resumen de Medicación
              </h3>
              <button
                onClick={handleResetData}
                className="text-xs font-medium text-slate-500 hover:text-slate-700 flex items-center gap-1"
                title="Reiniciar valores de prueba"
              >
                <RotateCcw className="w-3 h-3" />
                Reiniciar demo
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-100">
                <span className="text-[11px] font-semibold text-sky-700">Completadas hoy</span>
                <div className="text-2xl font-extrabold text-sky-900 mt-0.5 tabular-nums">
                  {completedCount} de {medications.length}
                </div>
                <div className="text-[10px] text-sky-600 mt-1">
                  {Math.round((completedCount / medications.length) * 100)}% de cumplimiento
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <span className="text-[11px] font-semibold text-emerald-700">Próxima toma</span>
                <div className="text-base font-bold text-emerald-950 mt-1 truncate">
                  {nextPending ? nextPending.name : '¡Todo al día!'}
                </div>
                <div className="text-[10px] text-emerald-600 mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {nextPending ? nextPending.time : 'Sin pendientes'}
                </div>
              </div>
            </div>

            {/* Quick action checklist */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Acciones rápidas sobre la lista
              </span>
              <div className="space-y-2">
                {medications.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          m.status === 'taken' ? 'bg-emerald-500' : 'bg-amber-400'
                        }`}
                      />
                      <span className="font-semibold text-slate-800">{m.name}</span>
                      <span className="text-slate-400">({m.dosage})</span>
                      <span className="text-slate-500 font-mono text-[11px]">{m.time}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleToggleStatus(m.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          m.status === 'taken'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-emerald-500'
                        }`}
                      >
                        {m.status === 'taken' ? '✓ Tomada' : 'Tomar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <SnoozeModal
        medication={snoozeMed}
        isOpen={Boolean(snoozeMed)}
        onClose={() => setSnoozeMed(null)}
        onSnooze={handleSnooze}
      />

      <MedicationDetailModal
        medication={selectedMed}
        isOpen={Boolean(selectedMed)}
        onClose={() => setSelectedMed(null)}
        onToggleStatus={handleToggleStatus}
        onOpenSnooze={(med) => setSnoozeMed(med)}
      />

      <AddMedicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddMedication}
      />

      <RenderViewerModal
        isOpen={isRenderModalOpen}
        onClose={() => setIsRenderModalOpen(false)}
      />
    </div>
  );
}
