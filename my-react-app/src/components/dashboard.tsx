import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CheckCircle, Plus } from 'lucide-react';
import Distribution from './DistributionDashboard';
import Header from './HeaderDashboard';
import Weekly from './WeeklyDashboard';
import Overview from './OverviewDashboard';
import Recent from './RecentDashboard';
import Sidebar from './SidebarDashboard';
import { useLocation } from 'react-router-dom';
// Dummy Data for Task List
const taskListData = [
  { id: 1, title: 'Talk to client', completed: true },
  { id: 2, title: 'Finish case documentation', completed: false },
  { id: 3, title: 'Write documentation', completed: false },
  { id: 4, title: 'Test application', completed: true },
  { id: 5, title: 'Deploy to server', completed: false },
];

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface DashboardProps {
  userId: string;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(taskListData);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const handleAdd = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  return (
    <Card className="rounded-2xl shadow-lg bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
          Task List
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          Your tasks for the day
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Add new task..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdd();
                }
              }}
              className="input-dark"
            />
            <Button
              onClick={handleAdd}
              className="rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-3 rounded-xl border border-gray-200 shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-500" />
                    )}
                  </Button>
                  <span
                    className={
                      task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'
                    }
                  >
                    {task.title}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard: React.FC<DashboardProps> = () => {
    const location = useLocation();
    const { userId } = location.state as { userId: string };
    console.log('Received userId:', userId);
    
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  console.log(userId, "hello");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/auth/get-lawyer-details/${userId}`);
        setFullName(response.data.fullName); // Assuming the full name is in the response
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <section id="dashboard" className="animated-wave-gradient min-h-screen">
      <div className="flex h-full md:pl-64">
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="flex-1 overflow-auto">
          <Header />
          <main className="p-6">
            <div className="text-4xl font-extrabold text-white mb-6">
              Hey, {fullName || 'there'}!
            </div>
            <div className="text-lg text-gray-300 mb-10">
              Track your legal tasks and insights all in one place.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Recent />
              <Distribution />
              <TaskList />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
