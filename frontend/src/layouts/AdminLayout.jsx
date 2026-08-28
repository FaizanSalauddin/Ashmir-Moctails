import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-svh w-full overflow-hidden bg-obsidian text-offwhite">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main
        className="
          min-w-0
          flex-1
          overflow-x-hidden
          overflow-y-auto
          px-4
          pb-10
          pt-20
          sm:px-6
          md:px-10
          md:py-10
        "
      >
        <Outlet />
      </main>
    </div>
  );
}