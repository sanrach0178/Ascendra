import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Plus, Edit2, Trash2, Filter } from 'lucide-react';
import ApplicationForm from '../components/ApplicationForm';

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingApp, setEditingApp] = useState(null);

    // Filters
    const [resumeFilter, setResumeFilter] = useState('All');
    const [sourceFilter, setSourceFilter] = useState('All');

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await api.get('/applications');
            setApplications(response.data);
        } catch (error) {
            console.error("Error fetching applications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleAdd = () => {
        setEditingApp(null);
        setIsModalOpen(true);
    };

    const handleEdit = (app) => {
        setEditingApp(app);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this application?")) {
            try {
                await api.delete(`/applications/${id}`);
                setApplications(applications.filter(app => app.id !== id));
            } catch (error) {
                console.error("Error deleting application", error);
            }
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (editingApp) {
                const response = await api.put(`/applications/${editingApp.id}`, formData);
                setApplications(applications.map(app => app.id === editingApp.id ? response.data : app));
            } else {
                const response = await api.post('/applications', formData);
                setApplications([...applications, response.data]);
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving application", error);
            alert("Failed to save application");
        }
    };

    const getStatusColor = (stage, outcome) => {
        if (outcome === 'REJECTED') return 'bg-red-500/20 text-red-500 border border-red-500/20';
        if (outcome === 'OFFER') return 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/20';
        if (stage === 'OFFER') return 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/20';

        switch (stage) {
            case 'APPLIED': return 'bg-blue-500/20 text-blue-400 border border-blue-500/20';
            case 'ONLINE_ASSESSMENT': return 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20';
            case 'TECHNICAL_INTERVIEW': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20';
            case 'HR_INTERVIEW': return 'bg-orange-500/20 text-orange-400 border border-orange-500/20';
            default: return 'bg-gray-700 text-gray-300';
        }
    };

    const filteredApplications = applications.filter(app => {
        if (resumeFilter !== 'All' && app.resumeVersion !== resumeFilter) return false;
        if (sourceFilter !== 'All' && app.source !== sourceFilter) return false;
        return true;
    });

    return (
        <div className="p-4 sm:p-8 min-h-screen bg-[#09090b] text-white w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold">Applications</h1>
                <button
                    onClick={handleAdd}
                    className="w-full sm:w-auto justify-center flex items-center px-4 py-2.5 bg-primary-500 hover:bg-primary-600 rounded-xl transition-all active:scale-95 shadow-lg shadow-primary-500/20"
                >
                    <Plus size={18} className="mr-2" />
                    Add Application
                </button>
            </div>

            <div className="bg-[#18181b] border border-white/10 p-4 rounded-2xl shadow-lg mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                    <Filter size={18} className="text-gray-400 mr-2" />
                    <span className="text-sm font-semibold text-gray-400 mr-2">Filters:</span>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <select
                        className="flex-1 sm:flex-none bg-[#09090b] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        value={resumeFilter}
                        onChange={(e) => setResumeFilter(e.target.value)}
                    >
                        <option value="All">All Resumes</option>
                        <option value="V1">V1</option>
                        <option value="V2">V2</option>
                        <option value="V3">V3</option>
                    </select>
                    <select
                        className="flex-1 sm:flex-none bg-[#09090b] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                        value={sourceFilter}
                        onChange={(e) => setSourceFilter(e.target.value)}
                    >
                        <option value="All">All Sources</option>
                        <option value="COLD_APPLY">Cold Apply</option>
                        <option value="REFERRAL">Referral</option>
                        <option value="CAMPUS">Campus</option>
                        <option value="LINKEDIN">LinkedIn</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
            </div>

            <div className="bg-[#18181b] rounded-xl shadow-lg overflow-hidden border border-white/10">
                {loading ? (
                    <div className="p-8 text-center text-gray-400">Loading...</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#27272a] border-b border-white/10">
                                <tr>
                                    <th className="px-6 py-4 font-semibold text-gray-400">Company</th>
                                    <th className="px-6 py-4 font-semibold text-gray-400">Role</th>
                                    <th className="px-6 py-4 font-semibold text-gray-400">Date Applied</th>
                                    <th className="px-6 py-4 font-semibold text-gray-400">Resume</th>
                                    <th className="px-6 py-4 font-semibold text-gray-400">Source</th>
                                    <th className="px-6 py-4 font-semibold text-gray-400">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredApplications.length > 0 ? (
                                    filteredApplications.map((app) => (
                                        <tr key={app.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4">{app.company}</td>
                                            <td className="px-6 py-4">{app.role}</td>
                                            <td className="px-6 py-4">{app.dateApplied}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                                                    {app.resumeVersion}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">{app.source.replace('_', ' ')}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.currentStage, app.finalOutcome)}`}>
                                                    {app.finalOutcome === 'REJECTED' ? 'REJECTED' :
                                                        app.finalOutcome === 'OFFER' ? 'OFFER' :
                                                            app.currentStage.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 flex space-x-3">
                                                <button
                                                    onClick={() => handleEdit(app)}
                                                    className="text-blue-400 hover:text-blue-300 transition-colors"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(app.id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                            No applications found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <ApplicationForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                initialData={editingApp}
            />
        </div>
    );
};

export default ApplicationList;
