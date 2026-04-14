import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success('Task deleted successfully');
        onTaskDelete(id);
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  const startEdit = (task) => {
    setEditingTask(task.id);
    setEditForm({
      title: task.title,
      description: task.description || '',
      status: task.status
    });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await api.put(`/tasks/${id}`, editForm);
      toast.success('Task updated successfully');
      onTaskUpdate(response.data.data);
      setEditingTask(null);
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        No tasks yet. Create your first task above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
          {editingTask === task.id ? (
            // Edit Mode
            <div>
              <input
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
              />
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                rows="2"
              />
              <select
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <div className="space-x-2">
                <button
                  onClick={() => handleUpdate(task.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // View Mode
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                  {task.status.replace('_', ' ')}
                </span>
              </div>
              
              {task.description && (
                <p className="text-gray-600 mb-4">{task.description}</p>
              )}
              
              <div className="flex space-x-2">
                <button
                  onClick={() => startEdit(task)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;