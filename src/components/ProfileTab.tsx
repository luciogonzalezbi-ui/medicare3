import React from 'react';
import { UserProfileData } from '../types';
import {
  User,
  Heart,
  Phone,
  Volume2,
  Bell,
  Smartphone,
  Shield,
  FileText,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface ProfileTabProps {
  user: UserProfileData;
  onToggleSound: () => void;
  onOpenRenderModal: () => void;
}

export const ProfileTab: React.FC<ProfileTabProps> = ({
  user,
  onToggleSound,
  onOpenRenderModal,
}) => {
  return (
    <div className="space-y-4 pb-20">
      {/* Header */}
      <div className="px-1 pt-1">
        <span className="text-[11px] font-semibold tracking-wider uppercase text-sky-600">
          Mi Salud y Ajustes
        </span>
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          Perfil
        </h1>
      </div>

      {/* User Card */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-400 to-emerald-400 p-0.5 shadow-md">
          <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center text-sky-600 font-bold text-xl">
            LG
          </div>
        </div>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-800 truncate">
            {user.name}
          </h2>
          <p className="text-xs text-slate-500 truncate">{user.email}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">
              Grupo {user.bloodType}
            </span>
            <span className="text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-100 px-2 py-0.5 rounded-full">
              Sin alergias graves
            </span>
          </div>
        </div>
      </div>

      {/* 3D Render Showcase Trigger Card */}
      <div
        onClick={onOpenRenderModal}
        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-5 text-white shadow-lg cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white">
                  Render 3D iPhone 15 Pro
                </h3>
                <span className="text-[10px] font-semibold bg-sky-500/30 text-sky-200 border border-sky-400/30 px-1.5 py-0.2 rounded-md">
                  HD
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Ver mockup fotorrealista sostenido en mano
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-sky-300 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Emergency & Doctor Contact */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Contactos de salud
        </h3>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Contacto de emergencia</p>
              <p className="text-[11px] text-slate-500">{user.emergencyContact}</p>
            </div>
          </div>
          <button className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
            Llamar
          </button>
        </div>

        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Médico de cabecera</p>
              <p className="text-[11px] text-slate-500">{user.doctorName}</p>
            </div>
          </div>
          <button className="text-xs font-semibold text-sky-600 hover:text-sky-700 bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-2xs">
            Recetas
          </button>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Preferencias de MediCare
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">
                Efectos de sonido hápticos
              </p>
              <p className="text-[11px] text-slate-500">
                Sonido suave al confirmar tomas
              </p>
            </div>
          </div>
          <button
            onClick={onToggleSound}
            className={`w-11 h-6 rounded-full transition-colors relative ${
              user.soundEnabled ? 'bg-sky-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform transform shadow-sm ${
                user.soundEnabled ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">
                Notificaciones en pantalla
              </p>
              <p className="text-[11px] text-slate-500">
                Alertas emergentes con recordatorio
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            Activo
          </span>
        </div>
      </div>
    </div>
  );
};
