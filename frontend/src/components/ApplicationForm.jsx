import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ApplicationForm = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        company: '',
        role: '',
        dateApplied: '',
        resumeVersion: 'V1',
        source: 'COLD_APPLY',
        currentStage: 'APPLIED',
        finalOutcome: 'IN_PROGRESS',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                company: '',
                role: '',
                dateApplied: new Date().toISOString().split('T')[0],
                resumeVersion: 'V1',
                source: 'COLD_APPLY',
                currentStage: 'APPLIED',
                finalOutcome: 'IN_PROGRESS',
            });
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-[#18181b] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8 relative animate-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold text-white mb-6">
                    {initialData ? 'Edit Application' : 'Add New Application'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Company</label>
                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Date Applied</label>
                            <input
                                type="date"
                                name="dateApplied"
                                value={formData.dateApplied}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Resume Version</label>
                            <select
                                name="resumeVersion"
                                value={formData.resumeVersion}
                                onChange={handleChange}
                                className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                            >
                                <option value="V1">V1</option>
                                <option value="V2">V2</option>
                                <option value="V3">V3</option>
                                <option value="Custom">Custom</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Source</label>
                            <select
                                name="source"
                                value={formData.source}
                                onChange={handleChange}
                                className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                            >
                                <option value="COLD_APPLY">Cold Apply</option>
                                <option value="REFERRAL">Referral</option>
                                <option value="CAMPUS">Campus</option>
                                <option value="LINKEDIN">LinkedIn</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Stage</label>
                            <select
                                name="currentStage"
                                value={formData.currentStage}
                                onChange={handleChange}
                                className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                            >
                                <option value="APPLIED">Applied</option>
                                <option value="ONLINE_ASSESSMENT">Online Assessment</option>
                                <option value="TECHNICAL_INTERVIEW">Tech Interview</option>
                                <option value="HR_INTERVIEW">HR Interview</option>
                                <option value="OFFER">Offer</option>
                                <option value="REJECTED">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Outcome</label>
                        <select
                            name="finalOutcome"
                            value={formData.finalOutcome}
                            onChange={handleChange}
                            className="w-full bg-[#09090b] border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all"
                        >
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="OFFER">Offer</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-3 px-4 py-2 text-gray-300 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-500/20 active:scale-95"
                        >
                            Save Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ApplicationForm;
