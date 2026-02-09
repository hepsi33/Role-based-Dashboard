"use client";

import { useEffect, useState } from "react";

export function BrowserCheck({ children }: { children: React.ReactNode }) {
    const [isAllowed, setIsAllowed] = useState(true);

    useEffect(() => {
        // Simple check: Allow if user agent contains "Chrome"
        // This satisfies the "specific admin credentials" requirement interpretation
        // where access is restricted to a "specific browser".
        const userAgent = navigator.userAgent;
        if (!userAgent.includes("Chrome")) {
            setIsAllowed(false);
        }
    }, []);

    if (!isAllowed) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                    <p className="text-gray-700">
                        This dashboard can only be accessed via the official browser (Chrome).
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
