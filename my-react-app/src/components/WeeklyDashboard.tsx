import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import { Button } from "./ui/button"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Legend,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    ComposedChart
} from 'recharts';
import {
    Calendar as CalendarIcon,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    ListChecks,
    Menu,
    Plus,
    Search,
    ShoppingCart,
    Users,
    UserCircle,
    LayoutDashboard,
    FileText,
    Settings,
    LogOut,
    XCircle,
    Bell,
    Mail
} from 'lucide-react';
import { cn } from "../lib/utils"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { format } from "date-fns";
import { Badge } from "./ui/badge"

const weeklySalesData = [
    { name: 'Sun', sales: 200 },
    { name: 'Mon', sales: 350 },
    { name: 'Tue', sales: 300 },
    { name: 'Wed', sales: 420 },
    { name: 'Thu', sales: 280 },
    { name: 'Fri', sales: 500 },
    { name: 'Sat', sales: 450 },
];

const Weekly = () => {
    return (
        <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Weekly Sales</CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    Sales performance across the week
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={weeklySalesData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280' }} />
                        <YAxis tick={{ fill: '#6b7280' }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                            }}
                            labelStyle={{
                                fontWeight: 600,
                                color: '#1f2937',
                                fontSize: '14px',
                            }}
                            itemStyle={{ color: '#374151', fontSize: '13px' }}
                        />
                        <Bar dataKey="sales" radius={[4, 4, 0, 0]} fill="#6366f1" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default Weekly;