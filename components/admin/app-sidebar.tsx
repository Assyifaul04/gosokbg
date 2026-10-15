"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  BarChart3,
  Settings,
  ScrollText,
} from "lucide-react";

import { NavMain } from "@/components/admin/nav-main";
import { NavUser } from "@/components/admin/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navMain = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: <LayoutDashboard />,
    isActive: true,
  },
  {
    title: "Pengguna",
    url: "/admin/users",
    icon: <Users />,
  },
  {
    title: "Riwayat Proses",
    url: "/admin/history",
    icon: <ImageIcon />,
  },
  {
    title: "Statistik",
    url: "/admin/stats",
    icon: <BarChart3 />,
  },
  {
    title: "Audit Log",
    url: "/admin/audit",
    icon: <ScrollText />,
  },
  {
    title: "Pengaturan",
    url: "/admin/settings",
    icon: <Settings />,
  },
];

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/admin/dashboard" />}
              className="justify-center"
            >
              <Image
                src="/images/gosokbg.png"
                alt="GosokBG"
                width={160}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name ?? "Admin",
            email: user.email ?? "",
            avatar: user.image ?? "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}