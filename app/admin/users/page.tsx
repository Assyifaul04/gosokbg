import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { UsersMain } from "@/components/admin/users/users-main";
import { UsersStats } from "@/components/admin/users/users-stats";

type UserRow = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: Date;
};

// ============ Bagian async: statistik ============
async function UsersStatsSection() {
  const [totalUsers, adminCount, activeCount] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { isActive: true } }),
  ]);

  return (
    <UsersStats total={totalUsers} admins={adminCount} active={activeCount} />
  );
}

// ============ Bagian async: tabel user ============
async function UsersTableSection() {
  const users = (await prisma.user.findMany({
    take: 100,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  })) as UserRow[];

  return (
    <UsersMain
      users={users.map((u: UserRow) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        image: u.image,
        role: u.role,
        isActive: u.isActive,
        createdAt: u.createdAt.toISOString(),
      }))}
    />
  );
}

// ============ Skeleton placeholder ============
function StatsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-24 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-900"
        />
      ))}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-10 animate-pulse rounded-md bg-gray-100 dark:bg-gray-900" />
      <div className="h-96 animate-pulse rounded-lg bg-gray-100 dark:bg-gray-900" />
    </div>
  );
}

// ============ Halaman ============
export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Pengguna
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Kelola semua pengguna GosokBG.
        </p>
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <UsersStatsSection />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <UsersTableSection />
      </Suspense>
    </div>
  );
}