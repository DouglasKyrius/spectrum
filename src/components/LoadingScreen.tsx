import { Sparkles } from 'lucide-react';

export const LoadingScreen = () => (
  <>
    <div className="z-[10000] fixed flex w-full h-full items-center justify-center backdrop-blur-md bg-white/90 select-none">
      <div className="animate-pulse">
        <div className="flex flex-col items-center gap-y-4 gap-x-4 lg:flex-row">
          <span>
            <Sparkles size={64} />
          </span>
          <span className="font-black text-3xl">Spectrum</span>
        </div>
      </div>
    </div>
  </>
);
