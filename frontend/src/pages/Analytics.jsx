import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from 'recharts';
import {
    Trophy,
    Target,
    Users,
    Briefcase,
    ArrowUpRight,
    TrendingUp,
    CheckCircle2,
    Clock
} from 'lucide-react';

const Analytics = () => {
    const [resumeData, setResumeData] = useState([]);
    const [funnelData, setFunnelData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [resumeRes, funnelRes] = await Promise.all([
                    api.get('/analytics/resume-performance'),
                    api.get('/analytics/funnel')
                ]);
                setResumeData(resumeRes.data);
                setFunnelData(funnelRes.data);
            } catch (error) {
                console.error("Error fetching analytics data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
                <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mb-4" />
                <p className="text-lg font-medium animate-pulse">Gathering insights...</p>
            </div>
        );
    }

    const totalApplications = funnelData?.applied || 0;
    const interviewRate = funnelData ? ((funnelData.technicalInterview / funnelData.applied) * 100).toFixed(1) : 0;
    const offerRate = funnelData ? ((funnelData.offer / funnelData.applied) * 100).toFixed(1) : 0;
    const bestResume = resumeData.length > 0
        ? [...resumeData].sort((a, b) => b.offerRate - a.offerRate)[0].version
        : 'N/A';

    const metrics = [
        { label: 'Total Applications', value: totalApplications, icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { label: 'Interview Rate', value: `${interviewRate}%`, icon: Target, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { label: 'Offer Rate', value: `${offerRate}%`, icon: Trophy, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Best Resume', value: bestResume, icon: CheckCircle2, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    ];

    const funnelChartData = funnelData ? [
        { name: 'Applied', value: funnelData.applied },
        { name: 'OA', value: funnelData.onlineAssessment },
        { name: 'Technical', value: funnelData.technicalInterview },
        { name: 'HR', value: funnelData.hrInterview },
        { name: 'Offer', value: funnelData.offer },
    ] : [];

    return (
        <div className="p-4 sm:p-8 min-h-screen bg-[#09090b] text-white w-full space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">Analytics Dashboard</h1>
                <p className="text-gray-400 text-base sm:text-lg">Visualizing your career progression and resume performance.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, idx) => (
                    <div key={idx} className="glass-card p-6 rounded-3xl relative overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                        <div className={`absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity`}>
                            <m.icon className="w-24 h-24" />
                        </div>
                        <div className="relative z-10 flex flex-col gap-4">
                            <div className={`p-3 rounded-2xl ${m.bg} w-fit`}>
                                <m.icon className={`w-6 h-6 ${m.color}`} />
                            </div>
                            <div>
                                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-1">{m.label}</p>
                                <h3 className="text-3xl font-black text-white">{m.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Resume Performance Area Chart */}
                <div className="lg:col-span-2 glass-card p-5 sm:p-8 rounded-3xl border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-cyan-400" />
                                Resume Performance
                            </h2>
                            <p className="text-gray-400 text-sm mt-1">Interview and Offer rates by resume version</p>
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={resumeData}>
                                <defs>
                                    <linearGradient id="colorInterview" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOffer" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis
                                    dataKey="version"
                                    stroke="#475569"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke="#475569"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#18181b',
                                        borderColor: '#27272a',
                                        borderRadius: '16px',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="interviewRate"
                                    name="Interview Rate"
                                    stroke="#06b6d4"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorInterview)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="offerRate"
                                    name="Offer Rate"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorOffer)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Funnel Chart */}
                <div className="glass-card p-5 sm:p-8 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-400" />
                        Application Funnel
                    </h2>
                    <div className="space-y-6">
                        {funnelChartData.map((item, idx) => {
                            const prevValue = idx > 0 ? funnelChartData[idx - 1].value : item.value;
                            const dropRate = prevValue > 0 ? (item.value / prevValue * 100).toFixed(0) : 0;

                            return (
                                <div key={idx} className="relative">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400 text-sm font-medium">{item.name}</span>
                                        <span className="text-white font-bold">{item.value}</span>
                                    </div>
                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-1000"
                                            style={{ width: `${(item.value / totalApplications * 100) || 0}%` }}
                                        />
                                    </div>
                                    {idx > 0 && (
                                        <div className="absolute -top-1 right-12 text-[10px] text-gray-500 bg-gray-900 px-2 py-0.5 rounded-full border border-white/5 font-bold">
                                            {dropRate}% conversion
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Detailed Stats Table */}
            <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <h2 className="text-xl font-bold">Resume Performance Matrix</h2>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock className="w-4 h-4" />
                        Last updated just now
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-white/[0.01]">
                                <th className="px-5 sm:px-8 py-5 text-gray-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Version</th>
                                <th className="px-5 sm:px-8 py-5 text-gray-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Applications</th>
                                <th className="px-5 sm:px-8 py-5 text-gray-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Interviews</th>
                                <th className="px-5 sm:px-8 py-5 text-gray-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">Offers</th>
                                <th className="px-5 sm:px-8 py-5 text-gray-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs text-right">Success</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {resumeData.map((item) => (
                                <tr key={item.version} className="hover:bg-white/[0.02] transition-colors group text-sm sm:text-base">
                                    <td className="px-5 sm:px-8 py-6">
                                        <span className="px-3 sm:px-4 py-1.5 bg-cyan-500/10 text-cyan-400 rounded-xl font-bold text-xs sm:text-sm border border-cyan-500/10 group-hover:bg-cyan-500/20 transition-all">
                                            {item.version}
                                        </span>
                                    </td>
                                    <td className="px-5 sm:px-8 py-6 text-gray-200 font-medium">{item.totalApplications}</td>
                                    <td className="px-5 sm:px-8 py-6 text-gray-200 font-medium">{item.interviews}</td>
                                    <td className="px-5 sm:px-8 py-6 text-gray-200 font-medium">{item.offers}</td>
                                    <td className="px-5 sm:px-8 py-6 text-right">
                                        <div className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold text-[10px] sm:text-sm">
                                            <ArrowUpRight className="w-3 h-3 sm:w-4 h-4" />
                                            {item.offerRate.toFixed(1)}%
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {resumeData.length === 0 && (
                        <div className="p-20 text-center text-gray-500">
                            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p className="text-lg">No application data available yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
