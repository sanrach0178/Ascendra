import React, { useState } from 'react';
import api from '../services/api';
import { Target, ClipboardList, ChevronRight, Loader2, Upload, FileText, X, ArrowRight } from 'lucide-react';
import AnalysisResult from '../components/dashboard/AnalysisResult';
import LoadingAnalysis from '../components/dashboard/LoadingAnalysis';

const Dashboard = () => {
    const [step, setStep] = useState(1);
    const [file, setFile] = useState(null);
    const [jobRole, setJobRole] = useState('');
    const [companies, setCompanies] = useState(['']);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAddCompany = () => {
        setCompanies([...companies, '']);
    };

    const handleCompanyChange = (index, value) => {
        const newCompanies = [...companies];
        newCompanies[index] = value;
        setCompanies(newCompanies);
    };

    const handleRemoveCompany = (index) => {
        if (companies.length <= 1) return;
        const newCompanies = companies.filter((_, i) => i !== index);
        setCompanies(newCompanies);
    };

    const onDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
        } else {
            alert("Please upload a PDF file.");
        }
    };

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        }
    };

    const handleAnalyze = async () => {
        if (!file || !jobRole) {
            alert("Please upload a resume and select a target role.");
            return;
        }

        setStep(2);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('jobRole', jobRole);
        formData.append('companies', JSON.stringify(companies.filter(c => c.trim() !== '')));

        try {
            const response = await api.post('/analyze', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setAnalysisResult(response.data);
            setStep(3);
        } catch (error) {
            console.error("Analysis failed", error);
            const backendMessage = error.response?.data?.message || "";
            const axiosMessage = error.message || "";

            if (backendMessage.includes("429") || axiosMessage.includes("429") || backendMessage.toLowerCase().includes("rate limit")) {
                alert("The AI is currently at maximum capacity (Rate Limit Reached). Please wait 1-2 minutes and try again. ⏳");
            } else if (axiosMessage === "Network Error") {
                alert("Could not connect to the backend. Please ensure the server is running on port 8080.");
            } else {
                alert(`Analysis failed: ${backendMessage || axiosMessage || "Please try again."}`);
            }
            setStep(1);
        }
    };

    const resetAnalysis = () => {
        setStep(1);
        setFile(null);
        setJobRole('');
        setCompanies(['']);
        setAnalysisResult(null);
    };

    if (step === 2) {
        return <LoadingAnalysis />;
    }

    if (step === 3) {
        return <AnalysisResult
            analysis={analysisResult}
            onReset={resetAnalysis}
            jobRole={jobRole}
            companies={companies.filter(c => c.trim() !== '')}
        />;
    }

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">Interview Analysis</h1>
                <p className="text-gray-500 mt-1 text-sm">Get AI powered feedback on your resume and skills gap.</p>
            </div>

            {/* Upload Resume Section */}
            <div className="glass-card rounded-2xl p-6 mb-6">
                <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    Upload Resume
                </h2>

                {!file ? (
                    <div
                        className="border border-dashed border-gray-700 rounded-xl h-32 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={onDrop}
                        onClick={() => document.getElementById('resume-upload').click()}
                    >
                        <Upload className="w-6 h-6 text-cyan-400 mb-2" />
                        <p className="text-gray-300 text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-gray-500 text-xs mt-1">PDF (max 5MB)</p>
                        <input
                            type="file"
                            id="resume-upload"
                            className="hidden"
                            accept=".pdf"
                            onChange={onFileChange}
                        />
                    </div>
                ) : (
                    <div className="border border-white/10 rounded-2xl p-5 flex items-center gap-5 bg-white/5 relative group">
                        <div className="bg-emerald-500/10 p-4 rounded-xl">
                            <FileText className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-lg truncate">{file.name}</p>
                            <p className="text-emerald-400 text-sm mt-0.5 font-medium flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Ready for analysis
                            </p>
                        </div>
                        <button
                            onClick={() => setFile(null)}
                            className="p-2 text-gray-500 hover:text-white transition-colors hover:bg-white/5 rounded-lg"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* Target Role Section */}
            <div className="bg-[#0f172a]/20 border border-white/5 rounded-2xl p-8 mb-8">
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                    <Target className="w-5 h-5 text-cyan-400" />
                    Target Role
                </h2>
                <div>
                    <label className="block text-gray-400 text-sm font-medium mb-4">Desired Job Role</label>
                    <div className="relative group">
                        <select
                            className="w-full appearance-none bg-[#020617] border border-white/10 rounded-xl px-5 py-4 text-white hover:border-white/20 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all cursor-pointer pr-12 text-base shadow-lg"
                            value={jobRole}
                            onChange={(e) => setJobRole(e.target.value)}
                        >
                            <option value="">Select a role...</option>
                            <option value="Frontend Developer">Frontend Developer</option>
                            <option value="Backend Developer">Backend Developer</option>
                            <option value="Full Stack Developer">Full Stack Developer</option>
                            <option value="DevOps Engineer">DevOps Engineer</option>
                            <option value="Data Scientist">Data Scientist</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                            <option value="Machine Learning Engineer">Machine Learning Engineer</option>
                            <option value="Mobile Developer">Mobile Developer</option>
                            <option value="Cloud Architect">Cloud Architect</option>
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5 rotate-90" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Application History Section */}
            <div className="bg-[#0f172a]/20 border border-white/5 rounded-2xl p-8 mb-8">
                <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-3">
                    <ClipboardList className="w-5 h-5 text-cyan-400" />
                    Application History
                </h2>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    List companies you've applied to (and possibly been rejected from). This helps us analyze fit.
                </p>
                <div className="space-y-4 mb-10">
                    {companies.map((company, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <input
                                type="text"
                                placeholder="Company Name (e.g. Google)"
                                className="flex-1 bg-[#020617] border border-white/10 rounded-xl px-5 py-3.5 text-base text-white placeholder-gray-600 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all shadow-md"
                                value={company}
                                onChange={(e) => handleCompanyChange(index, e.target.value)}
                            />
                            <button
                                onClick={() => handleRemoveCompany(index)}
                                className="p-3 text-gray-600 hover:text-red-400 transition-colors hover:bg-red-500/5 rounded-xl"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Bottom Buttons */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={handleAddCompany}
                        className="flex items-center gap-2 text-base text-cyan-400 hover:text-cyan-300 font-bold transition-all hover:translate-x-1"
                    >
                        <span className="text-xl">+</span> Add another company
                    </button>
                    <button
                        onClick={handleAnalyze}
                        className="flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-base rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 group"
                    >
                        Analyze my Profile
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
