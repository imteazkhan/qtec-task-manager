// ===================== TaskList.jsx =====================
import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

const STATUS_CONFIG = {
  pending: {
    label: 'Pending',
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-300',
    dot: 'bg-amber-400',
  },
  in_progress: {
    label: 'In Progress',
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-300',
    dot: 'bg-blue-500',
  },
  completed: {
    label: 'Completed',
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-300',
    dot: 'bg-emerald-500',
  },
};

const StatusBadge = ({ status }) => {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
};

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete }) => {
  const [editingTask, setEditingTask] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted');
      onTaskDelete(id);
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await api.put(`/tasks/${id}`, editForm);
      toast.success('Task updated!');
      onTaskUpdate(res.data.data);
      setEditingTask(null);
    } catch {
      toast.error('Update failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 font-sans px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
        Task List
        </h2>
        <span className="text-sm text-gray-400 font-medium">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      {/* Empty State */}
      {!tasks.length ? (
        <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400">
          <svg className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-sm font-medium">No tasks found</p>
          <p className="text-xs mt-1 opacity-60">Add a task to get started</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                deletingId === task.id ? 'opacity-50 scale-95' : ''
              }`}
            >
              {editingTask === task.id ? (
                /* ── EDIT MODE ── */
                <div className="p-5 space-y-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                    Editing Task
                  </p>
                  <input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Task title"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Description"
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                  />
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="flex-1 bg-gray-900 text-white py-2 rounded-xl text-sm font-semibold hover:bg-gray-700 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingTask(null)}
                      className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl text-sm font-semibold hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* ── VIEW MODE ── */
                <div className="flex items-center gap-4 p-4">

                  {/* Left: Title + Description Box */}
                  <div className="flex-1 min-w-0 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                    <p className="font-bold text-gray-800 text-base leading-tight truncate">
                      {task.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                      {task.description || 'No description'}
                    </p>
                  </div>

                  {/* Center: Status Badge */}
                  <div className="flex-shrink-0">
                    <StatusBadge status={task.status} />
                  </div>

                  {/* Right: Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => {
                        setEditingTask(task.id);
                        setEditForm(task);
                      }}
                      title="Edit"
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      title="Delete"
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;