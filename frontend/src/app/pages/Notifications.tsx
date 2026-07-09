import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Bell, BookOpen, Briefcase, ShoppingBag, MessageSquare, CheckCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notificationsApi } from "@/app/services/api/endpoints";
import { PageMotion } from "../components/PageMotion";
import { EmptyState } from "../components/EmptyState";
import { ListSkeleton } from "../components/Skeletons";
import type { Notification } from "@/app/types";

const iconMap: Record<Notification["type"], typeof Bell> = {
  course: BookOpen, job: Briefcase, order: ShoppingBag, message: MessageSquare, system: Bell,
};

const placeholderNotifs: Notification[] = [
  { id: "1", title: "New lesson available", body: "'Advanced typography' is now live in your UX course.", type: "course", created_at: new Date().toISOString(), read: false },
  { id: "2", title: "Application viewed", body: "TATA Digital reviewed your application.", type: "job", created_at: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: "3", title: "Order shipped", body: "Your terracotta earrings are on the way.", type: "order", created_at: new Date(Date.now() - 86400000).toISOString(), read: true },
  { id: "4", title: "New message from mentor", body: "Sneha replied to your discussion.", type: "message", created_at: new Date(Date.now() - 2 * 86400000).toISOString(), read: true },
];

const filters = ["all", "unread", "course", "job", "order", "message"] as const;

export function NotificationsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<typeof filters[number]>("all");
  const qc = useQueryClient();

  const query = useQuery({ queryKey: ["notifications"], queryFn: notificationsApi.list });
  const notifs = query.data ?? placeholderNotifs;

  const markAll = useMutation({
    mutationFn: notificationsApi.markAllRead,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const filtered = notifs.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.read;
    return n.type === filter;
  });
  const unread = notifs.filter((n) => !n.read).length;

  return (
    <PageMotion className="space-y-6">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
            Notifications
            {unread > 0 && <Badge className="gradient-primary text-primary-foreground border-0 rounded-full">{unread}</Badge>}
          </h1>
          <p className="mt-1 text-muted-foreground">Stay in the loop with everything Sakhi.</p>
        </div>
        <Button variant="outline" onClick={() => markAll.mutate()} className="rounded-full shrink-0">
          <CheckCheck className="h-4 w-4 mr-1" /> Mark all read
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
              filter === f ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {query.isLoading ? <ListSkeleton count={4} /> : filtered.length === 0 ? (
        <EmptyState icon={Bell} title="You're all caught up ✨" />
      ) : (
        <div className="space-y-2">
          {filtered.map((n, i) => {
            const Icon = iconMap[n.type];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className={`rounded-2xl border-border p-4 flex items-start gap-3 ${!n.read && "bg-primary/5 border-primary/20"}`}>
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-sm">{n.title}</div>
                      {!n.read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{n.body}</p>
                    <div className="mt-1 text-xs text-muted-foreground">{new Date(n.created_at).toLocaleString()}</div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </PageMotion>
  );
}
