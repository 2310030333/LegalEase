const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>(taskListData);

    const toggleTaskCompletion = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };