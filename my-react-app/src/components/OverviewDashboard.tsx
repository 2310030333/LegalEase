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


const financialData = [
    { Month: 'Jan', revenue: 4000, expenses: 2400 },
    { name: 'Feb', revenue: 3000, expenses: 1398 },
    { name: 'Mar', revenue: 2000, expenses: 9800 },
    { name: 'Apr', revenue: 2780, expenses: 3908 },
    { name: 'May', revenue: 1890, expenses: 4800 },
    { name: 'Jun', revenue: 2390, expenses: 3800 },
    { name: 'Jul', revenue: 3490, expenses: 4300 },
];

const Overview = () => {
    return (
        <Card className="shadow-lg rounded-2xl bg-white dark:bg-gray-900">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Financial Overview</CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    Revenue and Expenses Over Time
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                        data={financialData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
                        <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#ffffff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                            }}
                            labelStyle={{ color: '#111827', fontWeight: 600 }}
                            itemStyle={{ color: '#374151' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#4f46e5"
                            fill="url(#revenueGradient)"
                            strokeWidth={2}
                        />
                        <Area
                            type="monotone"
                            dataKey="expenses"
                            stroke="#10b981"
                            fill="url(#expensesGradient)"
                            strokeWidth={2}
                        />
                        <defs>
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};


export default Overview;
