import { useEffect } from 'react';

const TriggerClickOutside = (ref: any, trigger: () => void) => {
    useEffect(() => {
        const handleClickOutside = (e: any) => {
            if (ref.current && !ref.current.contains(e.target)) {
                trigger();
            }
        };        

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [ref]);
};

export default TriggerClickOutside;