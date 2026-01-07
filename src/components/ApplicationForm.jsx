import React from 'react';
import { instituteList } from '../data/institute';

export default function ApplicationForm({
  formData,
  setFormData,
  onSave,
  onCancel
}) {

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-indigo-200 space-y-6">

      {/* ================= INSTITUTE ================= */}
      <div>
        <h3 className="font-semibold text-indigo-900 mb-2">
          Institute Details
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Institute Type</label>
            <select
              name="instituteType"
              value={formData.instituteType}
              onChange={(e) => {
                handleChange(e);
                setFormData(p => ({ ...p, instituteName: '' }));
              }}
              className="w-full p-2 border rounded"
            >
              {Object.keys(instituteList).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Institute Name</label>
            <select
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Institute</option>
              {instituteList[formData.instituteType]?.map(inst => (
                <option key={inst} value={inst}>{inst}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ================= APPLICATION ================= */}
      <div>
        <h3 className="font-semibold text-indigo-900 mb-2">
          Application Stage
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <label className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="applicationFilled"
              checked={formData.applicationFilled}
              onChange={handleChange}
            />
            Application Submitted
          </label>
        </div>
      </div>

      {/* ================= SHORTLIST & PI ================= */}
      <div>
        <h3 className="font-semibold text-indigo-900 mb-2">
          Interview Stage
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="shortlisted"
              checked={formData.shortlisted}
              onChange={handleChange}
            />
            Shortlisted for PI
          </label>

          <div>
            <label className="text-sm">PI Registration Deadline</label>
            <input
              type="date"
              name="piRegistrationDeadline"
              value={formData.piRegistrationDeadline}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="text-sm">PI Date</label>
            <input
              type="date"
              name="piDate"
              value={formData.piDate}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="md:col-span-3">
            <label className="text-sm">PI Venue</label>
            <input
              type="text"
              name="piVenue"
              value={formData.piVenue}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </div>

      {/* ================= RESULT & FEES ================= */}
      <div>
        <h3 className="font-semibold text-indigo-900 mb-2">
          Result & Fees
        </h3>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm">Result</label>
            <select
              name="result"
              value={formData.result}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Pending</option>
              <option value="Selected">Selected</option>
              <option value="Waitlisted">Waitlisted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="text-sm">Fee Payment Deadline</label>
            <input
              type="date"
              name="feeDeadline"
              value={formData.feeDeadline}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <label className="flex items-center gap-2 mt-6">
            <input
                type="checkbox"
                name="feePaid"
                checked={formData.feePaid}
                disabled={formData.result !== 'Selected'}
                onChange={handleChange}
            />
            Fee Paid
            </label>

        </div>
      </div>

      {/* ================= NOTES ================= */}
      <div>
        <label className="text-sm font-medium">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          className="w-full p-2 border rounded"
          placeholder="Portal links, document status, reminders, etc."
        />
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex gap-3">
        <button
          onClick={onSave}
          className="bg-indigo-600 text-white px-6 py-2 rounded"
        >
          Save
        </button>

        <button
          onClick={onCancel}
          className="bg-gray-400 text-white px-6 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
