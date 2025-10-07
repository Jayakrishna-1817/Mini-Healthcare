import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();
  
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentForm, setAppointmentForm] = useState({
    doctorName: '',
    date: '',
    time: ''
  });
  
  const [trackEntries, setTrackEntries] = useState([]);
  const [trackForm, setTrackForm] = useState({
    painLevel: 5,
    energyLevel: 5,
    notes: ''
  });
  
  const [loading, setLoading] = useState({
    appointment: false,
    track: false
  });

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    fetchDoctors();
    fetchAppointments();
    fetchTrackEntries();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchTrackEntries = async () => {
    try {
      const response = await axios.get('/api/track');
      setTrackEntries(response.data);
    } catch (error) {
      console.error('Error fetching track entries:', error);
    }
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, appointment: true });

    try {
      await axios.post('/api/appointment', appointmentForm);
      setAppointmentForm({ doctorName: '', date: '', time: '' });
      fetchAppointments();
      alert('Appointment booked successfully! Treatment plan generated.');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to book appointment');
    } finally {
      setLoading({ ...loading, appointment: false });
    }
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    setLoading({ ...loading, track: true });

    try {
      await axios.post('/api/track', trackForm);
      setTrackForm({ painLevel: 5, energyLevel: 5, notes: '' });
      fetchTrackEntries();
      alert('Health entry saved successfully!');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to save entry');
    } finally {
      setLoading({ ...loading, track: false });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const latestTreatmentPlan = appointments.length > 0 ? appointments[0]?.treatmentPlan : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user?.name}
            </h1>
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Book Appointment */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Book Appointment
              </h3>
              <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Doctor</label>
                  <select
                    value={appointmentForm.doctorName}
                    onChange={(e) => setAppointmentForm({...appointmentForm, doctorName: e.target.value})}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} — {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={appointmentForm.date}
                      onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      value={appointmentForm.time}
                      onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={loading.appointment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {loading.appointment ? 'Booking...' : 'Book Appointment'}
                </button>
              </form>
            </div>
          </div>

          {/* Treatment Plan */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Treatment Plan
              </h3>
              {latestTreatmentPlan ? (
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-gray-900">Diagnosis</p>
                    <p className="text-gray-700">{latestTreatmentPlan.diagnosis}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Recommended Medicines</p>
                    <ul className="list-disc list-inside text-gray-700">
                      {latestTreatmentPlan.recommended_medicines?.map((medicine, index) => (
                        <li key={index}>{medicine}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Lifestyle Advice</p>
                    <p className="text-gray-700">{latestTreatmentPlan.lifestyle_advice}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No treatment plan yet. Book an appointment to generate one.</p>
              )}
            </div>
          </div>

          {/* Health Tracking */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Health Tracking
              </h3>
              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Pain Level (1-10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={trackForm.painLevel}
                      onChange={(e) => setTrackForm({...trackForm, painLevel: Number(e.target.value)})}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Energy Level (1-10)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={trackForm.energyLevel}
                      onChange={(e) => setTrackForm({...trackForm, energyLevel: Number(e.target.value)})}
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    value={trackForm.notes}
                    onChange={(e) => setTrackForm({...trackForm, notes: e.target.value})}
                    placeholder="Optional notes..."
                    rows="3"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading.track}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                >
                  {loading.track ? 'Saving...' : 'Add Entry'}
                </button>
              </form>
            </div>
          </div>

          {/* Tracking Entries */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Your Tracking Entries
              </h3>
              {trackEntries.length > 0 ? (
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {trackEntries.map((entry) => (
                    <div key={entry._id} className="border rounded-md p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            Pain: {entry.painLevel} / Energy: {entry.energyLevel}
                          </p>
                          {entry.notes && <p className="text-sm text-gray-600">{entry.notes}</p>}
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No entries yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="mt-6 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Your Appointments
            </h3>
            {appointments.length > 0 ? (
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div key={appointment._id} className="border rounded-md p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{appointment.doctorName}</p>
                        <p className="text-sm text-gray-600">
                          Diagnosis: {appointment.treatmentPlan?.diagnosis}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {appointment.date} {appointment.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No appointments yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;