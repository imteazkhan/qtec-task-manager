// ===================== TaskForm.jsx =====================
import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const TaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/tasks', formData);
      toast.success('Task created');
      setFormData({ title: '', description: '', status: 'pending' });
      onTaskCreated(res.data.data);
    } catch {
      toast.error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 font-serif">
      <div className="bg-white border rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
            required
          />

          <textarea
            placeholder="Description"
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          />

          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button className="w-full border border-black py-2 rounded-md hover:bg-black hover:text-white transition">
            {loading ? 'Creating...' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;