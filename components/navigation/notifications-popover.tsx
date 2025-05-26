'use client';

import { useState } from 'react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell, ArrowUpRight, Coins, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  read: boolean;
}

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'BTC Price Alert',
      description: 'Bitcoin has increased by 5% in the last hour',
      time: '2m ago',
      icon: <ArrowUpRight className="h-4 w-4 text-emerald-500" />,
      read: false
    },
    {
      id: '2',
      title: 'Transaction Confirmed',
      description: '0.25 ETH transaction has been confirmed',
      time: '10m ago',
      icon: <Coins className="h-4 w-4 text-primary" />,
      read: false
    },
    {
      id: '3',
      title: 'Network Congestion',
      description: 'Ethereum network is experiencing high gas fees',
      time: '1h ago',
      icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[320px] p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-[300px] overflow-auto">
          {notifications.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-4 hover:bg-muted/50 cursor-pointer",
                    !notification.read && "bg-muted/30"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-muted">
                    {notification.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{notification.title}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-2 border-t">
          <Button variant="outline" size="sm" className="w-full text-xs">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}