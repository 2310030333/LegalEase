    import React, { useState, useEffect } from 'react';
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from "./ui/card"
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
    } from "./ui/dropdown-menu"
    import {Button} from "./ui/button";
    import {Input} from "./ui/input";
    import {Badge} from "./ui/badge";
    import { Calendar } from "./ui/calendar"
    import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
    import { Bell, Calendar as CalendarIcon, Menu, UserCircle, LogOut } from 'lucide-react';
    import { cn } from "../lib/utils"
    import { useNavigate, useLocation } from 'react-router-dom';
    import { format } from "date-fns";
    import axios from "axios";

    interface Notification {
        _id: string;
        notifType: string;
        from: string;
        to: string;
        notifDesc: string;
        read: boolean;
    }

    const Header = () => {
        const [date, setDate] = useState<Date | undefined>(new Date());
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        const [notifications, setNotifications] = useState<Notification[]>([]);
        const [notifOpen, setNotifOpen] = useState(false);

        const navigate = useNavigate();
        const location = useLocation();
        const { userId } = location.state as { userId: string };

        console.log(userId + "received2");

        const handleProfileClick = () => {
            navigate('/lawyer/update-profile', { state: { userId } });
        };

        const handleLogoutClick = () => {
            navigate('/');
        };

        const fetchNotifications = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/auth/getnotifications');  // adjust URL if needed
                const filteredNotifs = res.data.filter((notif: Notification) => notif.to === userId);
                setNotifications(filteredNotifs);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        const handleAccept = async (notifId: string) => {
            try {
                await axios.post(`http://localhost:5000/api/auth/acceptnotifications`, {
                    notifId,
                    lawyerId: userId,
                });
                console.log(userId + "sending lawyer id for notif") ;
                setNotifications(prev => prev.filter(n => n._id !== notifId)); // remove accepted notif
                console.log(notifId + "sending notif id for notif");
            } catch (error) {
                console.error("Error accepting notification:", error);
            }
        };

        useEffect(() => {
            fetchNotifications();
        }, [userId]);

        return (
            <div className="sticky top-0 z-50 bg-[#111] border-b border-white/10 px-4 py-2 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Menu className="h-6 w-6 text-white" />
                    </Button>
                    <h1 className="text-xl font-semibold text-white">Dashboard</h1>
                </div>

                <div className="flex items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-48 md:w-64 bg-[#222] text-white placeholder:text-gray-400 border border-white/10 focus:ring-2 focus:ring-blue-400"
                    />

                    <Popover open={notifOpen} onOpenChange={setNotifOpen}>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-6 w-6 text-white" />
                                {notifications.length > 0 && (
                                    <Badge variant="secondary" className="absolute top-0 right-0 rounded-full text-xs bg-blue-600 text-white">
                                        {notifications.length}
                                    </Badge>
                                )}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80 bg-[#222] text-white border-white/10 border p-4 space-y-3">
                            <h3 className="text-lg font-semibold mb-2">Notifications</h3>
                            {notifications.length === 0 ? (
                                <p className="text-sm text-gray-400">No new notifications.</p>
                            ) : (
                                notifications.map((notif) => (
                                    <div key={notif._id} className="border-b border-white/10 pb-2 mb-2">
                                        <p className="text-sm">{notif.notifDesc}</p>
                                        {notif.notifType === "Invitation" && (
                                            <Button
                                                size="sm"
                                                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                                                onClick={() => handleAccept(notif._id)}
                                            >
    
                                                Accept
                                            </Button>
                                        )}
                                    </div>
                                ))
                            )}
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[300px] justify-start text-left font-normal bg-[#222] text-white border border-white/10",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4 text-white/70" />
                                {date ? format(date, "PPP") : <span className="text-gray-400">Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-[#222] text-white border-white/10 border">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <UserCircle className="h-8 w-8 text-white" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 bg-[#222] border border-white/10 text-white">
                            <DropdownMenuLabel className="text-sm font-medium">My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10" onClick={handleProfileClick}>
                                <UserCircle className="mr-2 h-4 w-4 text-white/70" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10" onClick={handleLogoutClick}>
                                <LogOut className="mr-2 h-4 w-4 text-white/70" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        );
    };

    export default Header;
