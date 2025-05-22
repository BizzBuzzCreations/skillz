import React, { useState } from 'react';
import { Pencil, Trash } from 'lucide-react';
import { Button } from '../ui/button';

export default function ContentManager({ course, setCourse }) {
  // Main course fields
  const [main, setMain] = useState({
    title: '',
    description: '',
    thumbnail: '',
    price: '',
    whatYouWillLearn: [''],
    skillsYouWillGain: [''],
    instructor: '',
  });

  // Content (sections/resources)
  const [sectionTitle, setSectionTitle] = useState('');
  const [resources, setResources] = useState([]);
  const [resourceForm, setResourceForm] = useState({ title: '', type: 'video', url: '', duration: '' });
  const [editingResource, setEditingResource] = useState(null);
  const [content, setContent] = useState([]);

  // Course Structure (modules/topics)
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDescription, setModuleDescription] = useState('');
  const [topics, setTopics] = useState([]);
  const [topicForm, setTopicForm] = useState({ topicTitle: '', topicDescription: '', videoUrls: [''] });
  const [editingTopic, setEditingTopic] = useState(null);
  const [courseStructure, setCourseStructure] = useState([]);

  // Add state for editing section/module
  const [editingSection, setEditingSection] = useState(null);
  const [editingModule, setEditingModule] = useState(null);

  // Handlers for main fields
  const handleMainChange = (e) => {
    const { name, value } = e.target;
    setMain(prev => ({ ...prev, [name]: value }));
  };
  const handleArrayChange = (arr, setArr, idx, value) => {
    setArr(arr.map((item, i) => i === idx ? value : item));
  };
  const handleAddArrayItem = (arr, setArr) => setArr([...arr, '']);
  const handleRemoveArrayItem = (arr, setArr, idx) => setArr(arr.filter((_, i) => i !== idx));

  // Resource handlers
  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type' && value !== 'video') {
      setResourceForm(prev => ({ ...prev, [name]: value, duration: '' }));
    } else {
      setResourceForm(prev => ({ ...prev, [name]: value }));
    }
  };
  const handleAddOrUpdateResource = (e) => {
    e.preventDefault();
    if (!resourceForm.title || !resourceForm.type || !resourceForm.url) return;
    if (editingResource !== null) {
      setResources(resources.map((r, i) => i === editingResource ? { ...resourceForm } : r));
      setEditingResource(null);
    } else {
      setResources([...resources, { ...resourceForm }]);
    }
    setResourceForm({ title: '', type: 'video', url: '', duration: '' });
  };
  const handleEditResource = (idx) => {
    setResourceForm({ ...resources[idx] });
    setEditingResource(idx);
  };
  const handleDeleteResource = (idx) => {
    setResources(resources.filter((_, i) => i !== idx));
    if (editingResource === idx) setEditingResource(null);
  };
  const handleAddSection = (e) => {
    e.preventDefault();
    if (!sectionTitle || resources.length === 0) return;
    setContent([...content, { sectionTitle, resources }]);
    setSectionTitle('');
    setResources([]);
  };

  // Topic handlers
  const handleTopicChange = (e) => {
    const { name, value } = e.target;
    setTopicForm(prev => ({ ...prev, [name]: value }));
  };
  const handleVideoUrlChange = (idx, value) => {
    setTopicForm(prev => ({ ...prev, videoUrls: prev.videoUrls.map((v, i) => i === idx ? value : v) }));
  };
  const handleAddVideoUrl = () => setTopicForm(prev => ({ ...prev, videoUrls: [...prev.videoUrls, ''] }));
  const handleRemoveVideoUrl = (idx) => setTopicForm(prev => ({ ...prev, videoUrls: prev.videoUrls.filter((_, i) => i !== idx) }));
  const handleAddOrUpdateTopic = (e) => {
    e.preventDefault();
    if (!topicForm.topicTitle) return;
    if (editingTopic !== null) {
      setTopics(topics.map((t, i) => i === editingTopic ? { ...topicForm } : t));
      setEditingTopic(null);
    } else {
      setTopics([...topics, { ...topicForm }]);
    }
    setTopicForm({ topicTitle: '', topicDescription: '', videoUrls: [''] });
  };
  const handleEditTopic = (idx) => {
    setTopicForm({ ...topics[idx] });
    setEditingTopic(idx);
  };
  const handleDeleteTopic = (idx) => {
    setTopics(topics.filter((_, i) => i !== idx));
    if (editingTopic === idx) setEditingTopic(null);
  };
  const handleAddModule = (e) => {
    e.preventDefault();
    if (!moduleTitle || topics.length === 0) return;
    setCourseStructure([...courseStructure, { moduleTitle, moduleDescription, topics }]);
    setModuleTitle('');
    setModuleDescription('');
    setTopics([]);
  };

  // Save all to parent
  React.useEffect(() => {
    setCourse({ ...main, content, courseStructure });
  }, [main, content, courseStructure, setCourse]);

  // Section handlers
  const handleEditSection = (idx) => {
    setSectionTitle(content[idx].sectionTitle);
    setResources(content[idx].resources);
    setEditingSection(idx);
  };
  const handleDeleteSection = (idx) => {
    setContent(content.filter((_, i) => i !== idx));
    if (editingSection === idx) setEditingSection(null);
  };
  const handleAddOrUpdateSection = (e) => {
    e.preventDefault();
    if (!sectionTitle || resources.length === 0) return;
    if (editingSection !== null) {
      setContent(content.map((s, i) => i === editingSection ? { sectionTitle, resources } : s));
      setEditingSection(null);
    } else {
      setContent([...content, { sectionTitle, resources }]);
    }
    setSectionTitle('');
    setResources([]);
  };
  // Module handlers
  const handleEditModule = (idx) => {
    setModuleTitle(courseStructure[idx].moduleTitle);
    setModuleDescription(courseStructure[idx].moduleDescription);
    setTopics(courseStructure[idx].topics);
    setEditingModule(idx);
  };
  const handleDeleteModule = (idx) => {
    setCourseStructure(courseStructure.filter((_, i) => i !== idx));
    if (editingModule === idx) setEditingModule(null);
  };
  const handleAddOrUpdateModule = (e) => {
    e.preventDefault();
    if (!moduleTitle || topics.length === 0) return;
    if (editingModule !== null) {
      setCourseStructure(courseStructure.map((m, i) => i === editingModule ? { moduleTitle, moduleDescription, topics } : m));
      setEditingModule(null);
    } else {
      setCourseStructure([...courseStructure, { moduleTitle, moduleDescription, topics }]);
    }
    setModuleTitle('');
    setModuleDescription('');
    setTopics([]);
  };

  return (
    <div className="w-full mx-auto my-[20px] p-6 border rounded-lg shadow-sm space-y-6">
      <h2 className="text-xl font-bold">Course Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="title" placeholder="Title" value={main.title} onChange={handleMainChange} className="border p-2 rounded" />
        <input name="thumbnail" placeholder="Thumbnail URL" value={main.thumbnail} onChange={handleMainChange} className="border p-2 rounded" />
        <input name="price" type="number" placeholder="Price" value={main.price} onChange={handleMainChange} className="border p-2 rounded" />
        <input name="instructor" placeholder="Instructor User ID" value={main.instructor} onChange={handleMainChange} className="border p-2 rounded" />
        <textarea name="description" placeholder="Description" value={main.description} onChange={handleMainChange} className="border p-2 rounded col-span-2" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-semibold">What You'll Learn</label>
          {main.whatYouWillLearn.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input value={item} onChange={e => handleArrayChange(main.whatYouWillLearn, val => setMain(m => ({ ...m, whatYouWillLearn: val })), idx, e.target.value)} className="border p-2 rounded w-full" />
              <Button type="button" onClick={() => handleRemoveArrayItem(main.whatYouWillLearn, val => setMain(m => ({ ...m, whatYouWillLearn: val })), idx)}>-</Button>
            </div>
          ))}
          <Button type="button" onClick={() => handleAddArrayItem(main.whatYouWillLearn, val => setMain(m => ({ ...m, whatYouWillLearn: val })))}>Add</Button>
        </div>
        <div>
          <label className="font-semibold">Skills You'll Gain</label>
          {main.skillsYouWillGain.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input value={item} onChange={e => handleArrayChange(main.skillsYouWillGain, val => setMain(m => ({ ...m, skillsYouWillGain: val })), idx, e.target.value)} className="border p-2 rounded w-full" />
              <Button type="button" onClick={() => handleRemoveArrayItem(main.skillsYouWillGain, val => setMain(m => ({ ...m, skillsYouWillGain: val })), idx)}>-</Button>
            </div>
          ))}
          <Button type="button" onClick={() => handleAddArrayItem(main.skillsYouWillGain, val => setMain(m => ({ ...m, skillsYouWillGain: val })))}>Add</Button>
        </div>
      </div>
      <hr />
      <h2 className="text-xl font-bold">Course Content (Sections & Resources)</h2>
      <div className="mb-4">
        <input type="text" placeholder="Section Title" value={sectionTitle} onChange={e => setSectionTitle(e.target.value)} className="border p-2 rounded w-full mb-2" />
        <h3 className="font-semibold mb-2">Add Resource</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Resource Title" value={resourceForm.title} onChange={handleResourceChange} className="border p-2 rounded" />
          <select name="type" value={resourceForm.type} onChange={handleResourceChange} className="border p-2 rounded">
            <option value="video">Video</option>
            <option value="pdf">PDF</option>
            <option value="text">Text</option>
          </select>
          <input type="text" name="url" placeholder="File URL" value={resourceForm.url} onChange={handleResourceChange} className="border p-2 rounded col-span-2" />
          {resourceForm.type === 'video' && (
            <input type="number" name="duration" placeholder="Duration (in minutes)" value={resourceForm.duration} onChange={handleResourceChange} className={`border p-2 rounded ${resourceForm.type !== 'video' ? 'hidden' : ''}`} />
          )}
        </div>
        <Button onClick={handleAddOrUpdateResource} className="mt-2">{editingResource !== null ? 'Update Resource' : 'Add Resource'}</Button>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Resources in this Section</h4>
          {resources.length === 0 ? (
            <p className="text-gray-500">No resources added yet.</p>
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
                {resources.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{item.title}</td>
                    <td className="p-2">{item.type}</td>
                    <td className="p-2 truncate max-w-xs">{item.url}</td>
                    <td className="p-2">{item.type === 'video' ? item.duration : '-'}</td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEditResource(index)} className="text-blue-500"><Pencil size={16} /></button>
                      <button onClick={() => handleDeleteResource(index)} className="text-red-500"><Trash size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Button onClick={handleAddOrUpdateSection} className="mt-4">{editingSection !== null ? 'Update Section' : 'Add Section'}</Button>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Course Content Structure</h3>
        {content.length === 0 ? (
          <p className="text-gray-500">No sections added yet.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">Section Title</th>
                <th className="text-left p-2 border">Resources</th>
                <th className="text-left p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {content.map((section, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2 font-semibold">{section.sectionTitle}</td>
                  <td className="p-2">
                    <ul className="list-disc ml-4">
                      {section.resources.map((res, i) => (
                        <li key={i}>{res.title} ({res.type})</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleEditSection(idx)} className="text-blue-500">Edit</button>
                    <button onClick={() => handleDeleteSection(idx)} className="text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <hr />
      <h2 className="text-xl font-bold">Course Structure (Modules & Topics)</h2>
      <div className="mb-4">
        <input type="text" placeholder="Module Title" value={moduleTitle} onChange={e => setModuleTitle(e.target.value)} className="border p-2 rounded w-full mb-2" />
        <input type="text" placeholder="Module Description" value={moduleDescription} onChange={e => setModuleDescription(e.target.value)} className="border p-2 rounded w-full mb-2" />
        <h3 className="font-semibold mb-2">Add Topic</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="topicTitle" placeholder="Topic Title" value={topicForm.topicTitle} onChange={handleTopicChange} className="border p-2 rounded" />
          <input type="text" name="topicDescription" placeholder="Topic Description" value={topicForm.topicDescription} onChange={handleTopicChange} className="border p-2 rounded" />
        </div>
        <div className="mt-2">
          <label className="font-semibold">Video URLs</label>
          {topicForm.videoUrls.map((url, idx) => (
            <div key={idx} className="flex gap-2 mb-1">
              <input value={url} onChange={e => handleVideoUrlChange(idx, e.target.value)} className="border p-2 rounded w-full" />
              <Button type="button" onClick={() => handleRemoveVideoUrl(idx)}>-</Button>
            </div>
          ))}
          <Button type="button" onClick={handleAddVideoUrl}>Add Video URL</Button>
        </div>
        <Button onClick={handleAddOrUpdateTopic} className="mt-2">{editingTopic !== null ? 'Update Topic' : 'Add Topic'}</Button>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Topics in this Module</h4>
          {topics.length === 0 ? (
            <p className="text-gray-500">No topics added yet.</p>
          ) : (
            <table className="w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 border">Title</th>
                  <th className="text-left p-2 border">Description</th>
                  <th className="text-left p-2 border">Video URLs</th>
                  <th className="text-left p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{item.topicTitle}</td>
                    <td className="p-2">{item.topicDescription}</td>
                    <td className="p-2">
                      <ul className="list-disc ml-4">
                        {item.videoUrls.map((url, i) => (
                          <li key={i}>{url}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2 flex gap-2">
                      <button onClick={() => handleEditTopic(index)} className="text-blue-500"><Pencil size={16} /></button>
                      <button onClick={() => handleDeleteTopic(index)} className="text-red-500"><Trash size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <Button onClick={handleAddOrUpdateModule} className="mt-4">{editingModule !== null ? 'Update Module' : 'Add Module'}</Button>
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Course Structure</h3>
        {courseStructure.length === 0 ? (
          <p className="text-gray-500">No modules added yet.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-2 border">Module Title</th>
                <th className="text-left p-2 border">Module Description</th>
                <th className="text-left p-2 border">Topics</th>
                <th className="text-left p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courseStructure.map((mod, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2 font-semibold">{mod.moduleTitle}</td>
                  <td className="p-2">{mod.moduleDescription}</td>
                  <td className="p-2">
                    <ul className="list-disc ml-4">
                      {mod.topics.map((topic, i) => (
                        <li key={i}>{topic.topicTitle} - {topic.topicDescription}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-2 flex gap-2">
                    <button onClick={() => handleEditModule(idx)} className="text-blue-500">Edit</button>
                    <button onClick={() => handleDeleteModule(idx)} className="text-red-500">Delete</button>
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
