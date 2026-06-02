"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Utensils, Droplets, Scale, Activity, Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/",          label: "Dashboard",   icon: LayoutDashboard, color: "text-green-600" },
  { href: "/cardapio",  label: "Cardápio",    icon: Utensils,        color: "text-green-500" },
  { href: "/hidrata",   label: "Hidrata+",    icon: Droplets,        color: "text-blue-500"  },
  { href: "/nutrimeta", label: "NutriMeta",   icon: Scale,           color: "text-amber-600" },
  { href: "/carbo",     label: "CarboControl",icon: Activity,        color: "text-red-700"   },
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-green-950 flex flex-col">
      {/* Logo */}
      <div className="px-6 pt-8 pb-6 border-b border-green-800">
        <p className="font-syne font-extrabold text-2xl text-white">NutriWay</p>
        <p className="text-green-400 text-xs mt-0.5">Seu caminho para a saúde</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV.map(({ href, label, icon: Icon, color }) => {
          const active = path === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                active
                  ? "bg-green-800 text-white"
                  : "text-green-200 hover:bg-green-800/50 hover:text-white"
              )}
            >
              <Icon size={18} className={active ? "text-green-300" : color} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-3 pb-6">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-green-300 hover:bg-green-800/50 hover:text-white transition-all"
        >
          <Settings size={18} />
          Configurações
        </Link>
      </div>
    </aside>
  );
}
