
import React from 'react';

export const PlusIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

export const TrashIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

export const LocationIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const TrophyIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} inline-block text-yellow-400`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M11.12 2.234a.75.75 0 10-1.24 0l-1.42 2.502a.75.75 0 01-.66.414H4.5a.75.75 0 000 1.5h3.3a.75.75 0 01.66.414l1.42 2.503a.75.75 0 001.24 0l1.42-2.503a.75.75 0 01.66-.414h3.3a.75.75 0 000-1.5h-3.3a.75.75 0 01-.66-.414l-1.42-2.502zM10 11.5a.75.75 0 00-1.5 0v2.75a.75.75 0 001.5 0V11.5z" clipRule="evenodd" />
        <path d="M4.5 14.5a.75.75 0 01.75.75v.255a3.5 3.5 0 006.5 0V15.25a.75.75 0 011.5 0v.005a5 5 0 01-9.5 0V15.25a.75.75 0 01.75-.75z" />
    </svg>
);


export const RefreshIcon = ({ className = "h-6 w-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 20l5.5-5.5M20 4l-5.5 5.5" />
    </svg>
);

export const SpinnerIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
