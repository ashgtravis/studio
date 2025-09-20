import { getNotificationsByMaid, getMaidById } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BellRing, CheckCircle2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

export default function MaidNotificationsPage() {
  // In a real app, maid ID would come from session
  const maidId = "1";
  const maid = getMaidById(maidId);
  const notifications = getNotificationsByMaid(maidId);

  return (
    <div className="container py-8 md:py-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Here are your latest updates and booking requests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-4 p-4 rounded-lg border",
                    notification.read ? "bg-secondary/50" : "bg-background"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full mt-1",
                      notification.read ? "bg-muted" : "bg-primary/10"
                    )}
                  >
                    {notification.read ? (
                      <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <BellRing className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {notification.body}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(notification.created_at), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <BellRing className="mx-auto h-12 w-12 mb-4" />
                <p>You have no notifications yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
