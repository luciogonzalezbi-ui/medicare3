import React from 'react';
import mockupImage from '../assets/images/medicare_iphone_mockup_1791239522423.jpg';
import { Smartphone, CheckCircle, Sparkles, X, Layers, Sun } from 'lucide-react';

interface RenderViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RenderViewerModal: React.FC<RenderViewerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3D Image Showcase */}
        <div className="md:w-1/2 bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-radial from-sky-900/30 to-slate-950/90 pointer-events-none" />
          <img
            src={mockupImage}
            alt="iPhone 15 Pro MediCare 3D Render held in hand"
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[70vh] md:max-h-[85vh] object-contain rounded-2xl shadow-2xl relative z-10"
          />
        </div>

        {/* Design details & Prompt breakdown */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
              <Sparkles className="w-4 h-4" />
              Render 3D · Apple Design Language
            </div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
              MediCare en iPhone 15 Pro
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-5">
              Renderizado tridimensional de alta fidelidad que muestra el dispositivo sostenido en mano en un entorno luminoso y natural, con iluminación suave y enfoque nítido sobre la pantalla OLED del iPhone 15 Pro.
            </p>

            {/* Design Spec Points */}
            <div className="space-y-3 mb-6">
              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                  Paleta de Colores
                </div>
                <p className="text-[11px] text-slate-500">
                  Azul cielo suave (#0284C7, #38BDF8), blanco puro (#FFFFFF) y verde menta (#10B981, #E6F9F2).
                </p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  Tarjeta Principal de "Hoy"
                </div>
                <p className="text-[11px] text-slate-500">
                  Hora actual con tipografía grande y limpia, temperatura y condición climática en vivo.
                </p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  Recordatorios Específicos
                </div>
                <p className="text-[11px] text-slate-500">
                  1. Ibuprofeno (400mg) - 09:00 AM con icono de pastilla y botón "Tomada".<br/>
                  2. Vitamina C - 12:00 PM con icono de cápsula y botón "Posponer".
                </p>
              </div>

              <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800 mb-1">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  Barra Inferior con 4 Iconos
                </div>
                <p className="text-[11px] text-slate-500">
                  "Hoy", "Calendario", "Medicamentos" y "Perfil" distribuidos ergonómicamente para una navegación natural con el pulgar.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              iPhone 15 Pro · Titanio Natural
            </span>
            <button
              onClick={onClose}
              className="py-2.5 px-5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow-md shadow-sky-600/20 active:scale-95 transition-all"
            >
              Volver a la App Interactiva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
