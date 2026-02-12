import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { History, Calendar, Target, ChevronRight, Trash2, Loader2, Sparkles } from 'lucide-react';

const AnalysisHistory = ({ onSelect }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        try {
            const response = await api.get('/analysis/history');
            setHistory(response.data);
        } catch (error) {
            console.error("Failed to fetch history", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to delete this analysis?")) return;
        try {
            await api.delete(`/analysis/${id}`);
            setHistory(prev => prev.filter(item => item.id !== id));
        } catch (error) {
            console.error("Failed to delete analysis", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center gap-3 text-gray-400 py-10">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading your history...</span>
            </div>
        );
    }

    if (history.length === 0) return null;

    return (
        <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                        <History className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">Recent Analyses</h2>
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{history.length} Saved</span>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 mask-linear-right">
                {history.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => onSelect(item)}
                        className="flex-shrink-0 w-80 bg-white/5 rounded-3xl p-6 cursor-pointer hover:bg-white/10 border border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Sparkles className="w-16 h-16 text-white" />
                        </div>

                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-cyan-500/10 rounded-xl group-hover:bg-cyan-500 group-hover:text-black transition-all">
                                <Target className="w-4 h-4 text-cyan-400 group-hover:text-inherit" />
                            </div>
                            <button
                                onClick={(e) => handleDelete(e, item.id)}
                                className="p-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/5 rounded-lg"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-cyan-400 transition-colors truncate">
                            {item.role}
                        </h3>

                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                                <Calendar className="w-3 h-3" />
                                {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                            <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${item.matchScore > 75 ? 'bg-emerald-500/10 text-emerald-400' :
                                    item.matchScore > 50 ? 'bg-amber-500/10 text-amber-400' :
                                        'bg-red-500/10 text-red-400'
                                }`}>
                                {item.matchScore}% Match
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-cyan-400 text-[10px] font-black tracking-tighter opacity-0 group-hover:opacity-100 transition-all">
                            VIEW FULL REPORT
                            <ChevronRight className="w-4 h-4" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalysisHistory;
