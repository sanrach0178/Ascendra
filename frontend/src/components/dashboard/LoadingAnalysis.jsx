import React, { useState, useEffect } from 'react';
import { Loader2, Zap, Search, Brain, FileText, CheckCircle2 } from 'lucide-react';

const LoadingAnalysis = () => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { text: "Reading PDF Document...", icon: FileText },
        { text: "Extracting Key Information...", icon: Search },
        { text: "Analyzing Skills & Experience...", icon: Brain },
        { text: "Matching with Job Requirements...", icon: Zap },
        { text: "Evaluating Company Fit...", icon: CheckCircle2 },
        { text: "Generating Final Report...", icon: Loader2 }
    ];

    useEffect(() => {
        // Simulate progress
        const interval = setInterval(() => {
            setProgress(oldProgress => {
                if (oldProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Random jump between 1-3%
                const jump = Math.random() * 2 + 0.5;
                return Math.min(oldProgress + jump, 100);
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Change text based on progress thresholds
        if (progress < 15) setCurrentStep(0);
        else if (progress < 30) setCurrentStep(1);
        else if (progress < 50) setCurrentStep(2);
        else if (progress < 70) setCurrentStep(3);
        else if (progress < 85) setCurrentStep(4);
        else setCurrentStep(5);
    }, [progress]);

    const CurrentIcon = steps[currentStep].icon;

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-md mx-auto p-8 relative">
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] animate-pulse" />

            {/* Central Icon Animation */}
            <div className="relative mb-8">
                {/* Outer Ring Spinning */}
                <div className="absolute inset-0 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full w-24 h-24 animate-spin" />

                {/* Inner Static Circle */}
                <div className="w-24 h-24 rounded-full bg-gray-900 border border-white/10 flex items-center justify-center relative z-10 shadow-2xl shadow-cyan-500/20">
                    <CurrentIcon className={`w-10 h-10 text-cyan-400 ${currentStep === 5 ? 'animate-spin' : 'animate-pulse'}`} />
                </div>
            </div>

            {/* Step Text */}
            <div className="text-center mb-6 h-16 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold text-white mb-2 tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-300 key={currentStep}">
                    {steps[currentStep].text}
                </h2>
                <p className="text-cyan-400/80 text-sm font-medium uppercase tracking-widest">
                    AI Processing
                </p>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden mb-4 relative">
                {/* Animated Gradient Bar */}
                <div
                    className="h-full bg-gradient-to-r from-cyan-600 via-cyan-400 to-emerald-400 transition-all duration-200 ease-out relative"
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-white/30 w-full animate-[shimmer_2s_infinite]" />
                </div>
            </div>

            {/* Percentage Text */}
            <div className="flex justify-between w-full text-xs text-gray-500 font-mono">
                <span>System Status: ONLINE</span>
                <span>{Math.round(progress)}%</span>
            </div>

            {/* Fun Tip Carousel (Optional) */}
            <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/5 text-center max-w-sm backdrop-blur-sm">
                <p className="text-gray-400 text-xs italic">
                    "Tip: Quantifying your achievements with numbers makes your resume 40% more likely to be shortlisted."
                </p>
            </div>
        </div>
    );
};

export default LoadingAnalysis;
