"use client";

import { useEffect, useState } from "react";

interface CountdownTimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

const INIT_TIME = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
};

interface CountdownTimerProps {
    date: Date;
}

export default function CountdownTimer({ date }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<CountdownTimeLeft>(INIT_TIME);

    function calculateTimeLeft(): CountdownTimeLeft {
        let timeLeft: CountdownTimeLeft = {};
        let currentDate = new Date();
        let difference = date.getTime() - currentDate.getTime();

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };

        }

        return timeLeft;
    }

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    }, []);

    return (
        
        <>
        {timeLeft.seconds && <div className="flex flex-row md:flex-col justify-center text-center gap-8">
                <div className="mx-2">
                    <div className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                        {timeLeft.days}
                    </div>
                    <div>DAYS</div>
                </div>
                <div className="mx-2">
                    <div className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                        {timeLeft.hours}
                    </div>
                    <div>HOURS</div>
                </div>
                <div className="mx-2">
                    <div className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                        {timeLeft.minutes}
                    </div>
                    <div>MINUTES</div>
                </div>
            </div>}
        </>
    );
}
