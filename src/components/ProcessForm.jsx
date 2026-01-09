import React, { useState } from 'react';
import '../styles/ProcessForm.css';

export const ProcessForm = ({ onAddProcess, processes }) => {
  const [formData, setFormData] = useState({
    name: '',
    arrival: '',
    burst: '',
    priority: '1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.arrival || !formData.burst) {
      alert('Please fill in all required fields');
      return;
    }

    const newProcess = {
      id: Date.now(),
      name: formData.name,
      arrival: parseInt(formData.arrival),
      burst: parseInt(formData.burst),
      priority: parseInt(formData.priority)
    };

    onAddProcess(newProcess);
    setFormData({
      name: '',
      arrival: '',
      burst: '',
      priority: '1'
    });
  };

  return (
    <div className="process-form-container">
      <h2>Add New Process</h2>
      <form onSubmit={handleSubmit} className="process-form">
        <div className="form-group">
          <label htmlFor="name">Process Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., P1"
            maxLength={10}
          />
        </div>

        <div className="form-group">
          <label htmlFor="arrival">Arrival Time *</label>
          <input
            type="number"
            id="arrival"
            name="arrival"
            value={formData.arrival}
            onChange={handleChange}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="burst">Burst Time (Duration) *</label>
          <input
            type="number"
            id="burst"
            name="burst"
            value={formData.burst}
            onChange={handleChange}
            placeholder="1"
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority Level</label>
          <input
            type="number"
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            placeholder="1"
            min="1"
            max="10"
          />
          <small>Lower number = Higher priority</small>
        </div>

        <button type="submit" className="add-btn">Add Process</button>
      </form>

      {processes.length > 0 && (
        <div className="processes-list">
          <h3>Added Processes ({processes.length})</h3>
          <table className="processes-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process) => (
                <tr key={process.id}>
                  <td>{process.name}</td>
                  <td>{process.arrival}</td>
                  <td>{process.burst}</td>
                  <td>{process.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProcessForm;
