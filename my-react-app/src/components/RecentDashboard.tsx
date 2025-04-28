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


const recentOrders = [
    { id: 1, client: 'John Doe', date: '2024-07-28', type: "Divorce", status: 'Completed' },
    { id: 2, client: 'Manav Dhar', date: '2024-07-27', type: "Manslaughter", status: 'Pending' },
    { id: 3, client: 'K. Sri Aashritha', date: '2024-07-26', type: "Abuse", status: 'Completed' },
    { id: 4, client: 'Alice Brown', date: '2024-07-25', type: "Divorce", status: 'Pending' },
    { id: 5, client: 'Mike Davis', date: '2024-07-24', type: "Assault", status: 'Cancelled' },
];

const Recent = () => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof typeof recentOrders[0] | null; direction: 'ascending' | 'descending' } | null>(null);

    const sortedOrders = React.useMemo(() => {
        let sortableItems = [...recentOrders];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key!] < b[sortConfig.key!]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key!] > b[sortConfig.key!]) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [sortConfig]);

    const requestSort = (key: keyof typeof recentOrders[0]) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const renderSortIcon = (key: keyof typeof recentOrders[0]) => {
        if (sortConfig?.key === key) {
            return sortConfig.direction === 'ascending'
                ? <ChevronDown className="ml-1 h-4 w-4 transition-all text-gray-500" />
                : <ChevronUp className="ml-1 h-4 w-4 transition-all text-gray-500" />;
        }
        return null;
    };

    return (
        <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-900">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Recent Cases</CardTitle>
                <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
                    A summary of your latest cases
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-gray-200 dark:border-gray-700 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-800">
                                {['id', 'client', 'date', 'type'].map((col, index) => (
                                    <TableHead key={col} className={index === 3 ? "text-right" : ""}>
                                        <Button
                                            variant="ghost"
                                            className="p-0 h-auto text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
                                            onClick={() => requestSort(col as keyof typeof recentOrders[0])}
                                        >
                                            {col[0].toUpperCase() + col.slice(1)}
                                            {renderSortIcon(col as keyof typeof recentOrders[0])}
                                        </Button>
                                    </TableHead>
                                ))}
                                <TableHead className="text-right text-gray-600 dark:text-gray-300">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sortedOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium text-gray-800 dark:text-gray-100">{order.id}</TableCell>
                                    <TableCell className="text-gray-700 dark:text-gray-300">{order.client}</TableCell>
                                    <TableCell className="text-gray-700 dark:text-gray-300">{order.date}</TableCell>
                                    <TableCell className="text-right text-gray-800 dark:text-gray-100">{order.type}</TableCell>
                                    <TableCell className="text-right">
                                    <Badge
        className={cn(
            "px-2 py-1 rounded-full text-xs font-semibold",
            order.status === 'Completed' && "bg-green-500/20 text-green-600",
            order.status === 'Pending' && "bg-yellow-500/20 text-yellow-600",
            order.status === 'Shipped' && "bg-blue-500/20 text-blue-600",
            order.status === 'Cancelled' && "bg-red-500/20 text-red-600"
        )}
    >
        {order.status}
    </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};


export default Recent;