import React, { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '../ui/button';

export default function ContentManager({ contents, setContents }) {
  const [form, setForm] = useState({
    title: '',
    type: 'video',
    url: '',
    duration: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If type changed to non-video, clear duration
    if (name === 'type' && value !== 'video') {
      setForm((prev) => ({ ...prev, [name]: value, duration: '' }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!form.title || !form.type || !form.url) {
      alert('Please fill all required fields.');
      return;
    }

    if (editingIndex !== null) {
      const updated = contents.map((item, idx) => idx === editingIndex ? { ...form } : item);
      setContents(updated);
      setEditingIndex(null);
    } else {
      setContents([...contents, { ...form }]);
    }

    setForm({ title: '', type: 'video', url: '', duration: '' });
  };

  const handleEdit = (index) => {
    // If already editing this item, reset form and editingIndex
    if (editingIndex === index) {
      setEditingIndex(null);
      setForm({ title: '', type: 'video', url: '', duration: '' });
      return;
    }
    setForm({ ...contents[index] });
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setContents(prev => {
      const updated = prev.filter((_, i) => i !== index);
      // If deleting the item being edited, reset form and editingIndex
      if (editingIndex === index) {
        setEditingIndex(null);
        setForm({ title: '', type: 'video', url: '', duration: '' });
      } else if (editingIndex !== null && index < editingIndex) {
        // If deleting an item before the one being edited, update editingIndex
        setEditingIndex(editingIndex - 1);
      }
      return updated;
    });
  };

  // Fix: Reset editingIndex if contents change (e.g., after delete)
  React.useEffect(() => {
    if (editingIndex !== null && editingIndex >= contents.length) {
      setEditingIndex(null);
      setForm({ title: '', type: 'video', url: '', duration: '' });
    }
  }, [contents, editingIndex]);

  return (
    <div className="w-full mx-auto my-[20px] p-6 border rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-bold">Upload Course Content</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="video">Video</option>
          <option value="pdf">PDF</option>
          <option value="text">Text</option>
        </select>
        <input
          type="text"
          name="url"
          placeholder="File URL"
          value={form.url}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
        {form.type === 'video' && (
          <input
            type="number"
            name="duration"
            placeholder="Duration (in minutes)"
            value={form.duration}
            onChange={handleChange}
            className={`border p-2 rounded ${form.type !== 'video' ? 'hidden' : ''}`}
          />
        )}
      </div>

      {/* <button
        onClick={handleAddOrUpdate}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        {editingIndex !== null ? 'Update Content' : 'Add Content'}
      </button> */}

      <Button
        onClick={handleAddOrUpdate}
      >{editingIndex !== null ? 'Update Content' : 'Add Content'}
      </Button>

      <div className="">
        <h3 className="text-lg font-semibold mb-2">Course Contents</h3>
        {contents.length === 0 ? (
          <p className="text-gray-500">No content added yet.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">Title</th>
                <th className="text-left p-2 border">Type</th>
                <th className="text-left p-2 border">URL</th>
                <th className="text-left p-2 border">Duration</th>
                <th className="text-left p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contents.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="p-2">{item.title}</td>
                  <td className="p-2">{item.type}</td>
                  <td className="p-2 truncate max-w-xs">{item.url}</td>
                  <td className="p-2">{item.type === 'video' ? item.duration : '-'}</td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleEdit(index)} className="text-blue-500">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => handleDelete(index)} className="text-red-500">
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
