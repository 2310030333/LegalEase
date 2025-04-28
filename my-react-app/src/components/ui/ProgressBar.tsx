import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="mb-8">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-gray-800 text-white">
            Onboarding Progress
          </div>
          <div className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-400">{`${Math.round(progress)}%`}</div>
        </div>
        <div className="flex mb-2">
          <div
            className="flex-auto h-2 mb-2 rounded-xl bg-gray-300"
          >
            <div
              className="h-2 rounded-xl bg-green-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
