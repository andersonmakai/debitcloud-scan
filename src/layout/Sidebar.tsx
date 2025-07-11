import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  FileSearch,
  Boxes,
  BarChart2,
  Settings
} from "lucide-react";

const Sidebar = () => {
  const menu = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/faturacao/clientes", label: "Clientes", icon: <Users size={20} /> },
    { path: "/faturacao/faturas", label: "Faturação", icon: <FileText size={20} /> },
    { path: "/fiscal/declaracoes", label: "Fiscal", icon: <FileSearch size={20} /> },
    { path: "/inventario/produtos", label: "Inventário", icon: <Boxes size={20} /> },
    { path: "/contabilidade/diario", label: "Contabilidade", icon: <BarChart2 size={20} /> },
    { path: "/configuracoes", label: "Configurações", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col py-6 px-4">
      <h1 className="text-xl font-bold mb-8">DebitCloud</h1>
      <nav className="flex flex-col gap-3">
        {menu.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                isActive ? "bg-gray-700" : "hover:bg-gray-800"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
