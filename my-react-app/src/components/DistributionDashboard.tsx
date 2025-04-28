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
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
    const productCategories = [
        { name: 'Divorce', value: 400, color: '#0088FE' },
        { name: 'Manslaughter', value:200, color: '#00C49F' },
        { name: 'Abuse', value: 200, color: '#FFBB28' },
        { name: 'Assault', value: 200, color: '#FF8042' },
    ];
    const Distribution = () => {
        return (
            <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-900">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                        Case Category Distribution
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                        Percentage of cases in each category
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    <ResponsiveContainer width="100%" height={320}>
                        <PieChart>
                            <Pie
                                data={productCategories}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={110}
                                dataKey="value"
                                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                                    const RADIAN = Math.PI / 180;
                                    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                    const name = productCategories[index].name;

                                    return (
                                        <text
                                            x={x}
                                            y={y}
                                            fill="#374151"
                                            textAnchor={x > cx ? "start" : "end"}
                                            dominantBaseline="central"
                                            className="text-sm font-medium"
                                        >
                                            {name}
                                        </text>
                                    );
                                }}
                            >
                                {productCategories.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
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
                            <Legend
                                layout="horizontal"
                                verticalAlign="bottom"
                                align="center"
                                wrapperStyle={{ color: '#6b7280', fontSize: '12px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        );
    };

    export default Distribution;
