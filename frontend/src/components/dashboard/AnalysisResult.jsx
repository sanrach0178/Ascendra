import React, { useState } from 'react';
import {
    CheckCircle2,
    AlertTriangle,
    XCircle,
    TrendingUp,
    BookOpen,
    Building2,
    Target,
    Zap,
    ChevronDown,
    ChevronUp,
    Loader2,
    Download
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import { toPng } from 'html-to-image';

const AnalysisResult = ({ analysis, onReset, jobRole, companies }) => {
    if (!analysis) return null;

    const reportRef = React.useRef();
    const { matchScore, skillGaps, companyFitIssues, recommendations, overallFeedback } = analysis;
    const [downloading, setDownloading] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return;
        setDownloading(true);
        setIsCapturing(true);

        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            console.log("Generating Single-page dynamic PDF...");

            const element = reportRef.current;
            const width = element.offsetWidth;
            const height = element.offsetHeight;

            const dataUrl = await toPng(element, {
                cacheBust: true,
                backgroundColor: '#09090b',
                width: width,
                height: height,
                filter: (node) => {
                    // Exclude the action buttons from the PDF
                    return !node.classList?.contains('no-pdf');
                },
                style: {
                    animation: 'none',
                    transition: 'none',
                    margin: '0',
                    padding: '24px',
                    borderRadius: '0'
                }
            });

            // Calculate height in mm
            const pdfWidth = 210; // A4 width
            const pdfHeight = (height * pdfWidth) / width;

            // Create PDF with custom height to fit everything in 1 page
            const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);

            pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);

            const safeRole = (jobRole || 'Analysis').replace(/[^a-z0-9]/gi, '_').toLowerCase();
            pdf.save(`Ascendra_Report_${safeRole}.pdf`);
            console.log("Single-page PDF complete");
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert(`Failed to generate PDF. Error: ${error.message}`);
        } finally {
            setDownloading(false);
            setIsCapturing(false);
        }
    };

    const scoreData = [
        { name: 'Score', value: matchScore, color: matchScore > 75 ? '#10b981' : matchScore > 50 ? '#f59e0b' : '#ef4444' },
        { name: 'Remaining', value: 100 - matchScore, color: '#27272a' }
    ];

    // Helper to parse bold text from Gemini response (e.g., "**Action:** details...")
    const parseMarkdown = (text) => {
        const parts = text.split(/\*\*(.*?)\*\*/g);
        if (parts.length > 1) {
            return {
                title: parts[1].replace(/:$/, '').trim(), // Remove trailing colon
                description: parts[2] ? parts[2].trim() : ''
            };
        }
        return { title: null, description: text };
    };

    // Card Component for consistency
    const SectionCard = ({ title, icon: Icon, colorHex, children }) => (
        <div style={{ backgroundColor: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)' }} className="rounded-2xl overflow-hidden shadow-lg">
            <div style={{ backgroundColor: `${colorHex}10`, borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }} className="px-6 py-4 flex items-center gap-3">
                <div style={{ backgroundColor: `${colorHex}20` }} className="p-2 rounded-lg">
                    <Icon style={{ color: colorHex }} className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-lg tracking-tight">{title}</h3>
            </div>
            <div className="p-6">
                {children}
            </div>
        </div>
    );

    return (
        <div
            ref={reportRef}
            ref-report-container="true"
            className={`space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20 p-8 rounded-[40px] bg-[#09090b] ${isCapturing ? 'animate-none' : ''}`}
        >

            {/* Header / Score Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score Card */}
                <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.05)' }} className="lg:col-span-1 rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl">
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6 z-10">Match Score</h3>
                    <div className="w-56 h-56 relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={scoreData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={95}
                                    startAngle={180}
                                    endAngle={0}
                                    dataKey="value"
                                    stroke="none"
                                    paddingAngle={5}
                                    cornerRadius={12}
                                >
                                    {scoreData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
                            <span className="text-6xl font-black text-white tracking-tighter">{matchScore}</span>
                            <span className="text-lg text-gray-400 mt-2 font-medium">/ 100</span>
                        </div>
                    </div>
                </div>

                {/* Summary Card */}
                <div style={{ backgroundColor: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255, 255, 255, 0.05)' }} className="lg:col-span-2 rounded-3xl p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)' }} className="p-3 rounded-2xl shadow-lg">
                                <Target className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white tracking-tight">Executive Summary</h3>
                        </div>
                        <p className="text-gray-200 text-xl leading-relaxed font-light">
                            {overallFeedback}
                        </p>
                    </div>
                </div>
            </div>

            {/* Detailed Analysis Grid (Structured for no gaps) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Skill Gaps */}
                <div className="flex flex-col h-full">
                    <SectionCard title="Missing Skills" icon={AlertTriangle} colorHex="#f59e0b">
                        <div className="flex flex-col gap-3">
                            {skillGaps.map((skill, idx) => {
                                const { title, description } = parseMarkdown(skill);
                                return (
                                    <div
                                        key={idx}
                                        style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.1)' }}
                                        className="p-4 rounded-xl flex items-start gap-4"
                                    >
                                        <div style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', color: '#f59e0b' }} className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            {title && (
                                                <h4 style={{ color: '#f59e0b' }} className="font-bold text-lg mb-1">
                                                    {title}
                                                </h4>
                                            )}
                                            <p className="text-gray-200 text-base font-medium leading-snug">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {skillGaps.length === 0 && (
                            <p className="text-gray-500 italic text-center py-6 text-lg">No major skill gaps identified! Great job.</p>
                        )}
                    </SectionCard>
                </div>

                {/* Recommendations - Action Plan */}
                <div className="flex flex-col h-full">
                    <SectionCard title="Action Plan" icon={Zap} colorHex="#10b981">
                        <div className="space-y-6">
                            {recommendations.map((rec, idx) => {
                                const { title, description } = parseMarkdown(rec);
                                return (
                                    <div key={idx} className="flex gap-5">
                                        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981' }} className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                            {idx + 1}
                                        </div>
                                        <div className="pt-1">
                                            {title && (
                                                <h4 className="text-white font-bold text-lg mb-1">
                                                    {title}
                                                </h4>
                                            )}
                                            <p className="text-gray-300 text-base leading-relaxed">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </SectionCard>
                </div>
            </div>

            {/* Company Fit - Full Width at Bottom */}
            <div className="w-full">
                <div style={{ backgroundColor: '#18181b', border: '1px solid rgba(255, 255, 255, 0.05)' }} className="rounded-3xl overflow-hidden shadow-2xl">
                    <div style={{ background: 'linear-gradient(to right, rgba(167, 139, 250, 0.1), rgba(244, 114, 182, 0.1))' }} className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div style={{ backgroundColor: 'rgba(167, 139, 250, 0.1)' }} className="p-3 rounded-2xl">
                                <Building2 style={{ color: '#a78bfa' }} className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-white text-xl">Company Fit Analysis</h3>
                        </div>
                    </div>
                    <div className="p-10 flex flex-col gap-6">
                        {companyFitIssues.length > 0 ? (
                            companyFitIssues.map((issue, idx) => {
                                const { title, description } = parseMarkdown(issue);
                                return (
                                    <div key={idx} style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }} className="rounded-2xl p-6 flex gap-5">
                                        <div style={{ backgroundColor: 'rgba(244, 114, 182, 0.1)', border: '1px solid rgba(244, 114, 182, 0.2)', color: '#f472b6' }} className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            {title && (
                                                <h4 className="text-white font-bold text-lg mb-1">
                                                    {title}
                                                </h4>
                                            )}
                                            <p className="text-gray-200 text-base leading-relaxed">
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-12">
                                <CheckCircle2 style={{ color: '#10b981' }} className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p className="text-gray-400 text-lg">No specific fit issues detected. Looks like a solid match!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Actions - Filtered out of PDF via 'no-pdf' class */}
            <div className="flex justify-center gap-6 pt-8 no-pdf">
                <button
                    onClick={onReset}
                    className="px-10 py-5 bg-white/5 text-white hover:bg-white/10 border border-white/10 rounded-2xl font-bold text-lg transition-all active:scale-95 flex items-center gap-3"
                >
                    <BookOpen className="w-6 h-6" />
                    Analyze Another
                </button>

                <button
                    onClick={handleDownloadPDF}
                    disabled={downloading}
                    className="flex-1 max-w-sm px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {downloading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <Download className="w-6 h-6" />
                    )}
                    {downloading ? 'Generating PDF...' : 'Download PDF Report'}
                </button>
            </div>
        </div>
    );
};

export default AnalysisResult;
