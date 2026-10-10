import { useState } from 'react';
import { X, Zap, RotateCcw, Award } from 'lucide-react';

interface GameModeOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GameModeOverlay({ isOpen, onClose }: GameModeOverlayProps) {
  // Mini ECE logic puzzle: Power the Circuit!
  // 3 nodes: Power Source -> Filter Gate -> Rocket Ignition MCU
  const [switches, setSwitches] = useState({
    pwr: false,
    filter: false,
    pyro: false,
  });
  const [success, setSuccess] = useState(false);

  const toggleSwitch = (key: 'pwr' | 'filter' | 'pyro') => {
    setSwitches((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (next.pwr && next.filter && next.pyro) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
      return next;
    });
  };

  const handleReset = () => {
    setSwitches({ pwr: false, filter: false, pyro: false });
    setSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0a192f]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-[#112240] border-2 border-[#64ffda] rounded-2xl p-6 sm:p-8 shadow-[0_0_40px_rgba(100,255,218,0.25)] space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#233554] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#64ffda] animate-ping" />
            <h2 className="text-lg font-bold font-mono text-[#64ffda]">
              [ECE MINI-GAME: CIRCUIT POWER SEQUENCE]
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#8892b0] hover:text-[#64ffda] hover:bg-[#0a192f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Narrative / Instructions */}
        <p className="text-xs sm:text-sm text-[#8892b0] font-mono leading-relaxed">
          Mission control: Power the Trishul dual-MCU telemetry bus by sequencing the circuit power rails in the correct order.
        </p>

        {/* Interactive Schematic Board */}
        <div className="p-6 rounded-xl bg-[#0a192f] border border-[#233554] space-y-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-circuit-grid opacity-20 pointer-events-none" />

          {/* Interactive Switch Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            {/* Step 1: 7.4V LiPo Main Bus */}
            <button
              onClick={() => toggleSwitch('pwr')}
              className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                switches.pwr
                  ? 'bg-[#112240] border-[#64ffda] text-[#64ffda] shadow-[0_0_15px_rgba(100,255,218,0.3)]'
                  : 'bg-[#0a192f] border-[#233554] text-[#8892b0] hover:border-[#64ffda]/40'
              }`}
            >
              <div className="text-[10px] font-mono mb-1">NODE 01</div>
              <Zap className={`w-5 h-5 mx-auto mb-2 ${switches.pwr ? 'text-[#64ffda]' : 'text-[#8892b0]'}`} />
              <div className="text-xs font-bold font-mono">7.4V Li-Po</div>
              <div className="text-[10px] font-mono mt-1 text-[#64ffda]">
                {switches.pwr ? 'ENGAGED' : 'OPEN'}
              </div>
            </button>

            {/* Step 2: 3.3V Step-Down LDO */}
            <button
              onClick={() => toggleSwitch('filter')}
              disabled={!switches.pwr}
              className={`p-4 rounded-xl border text-center transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                switches.filter
                  ? 'bg-[#112240] border-[#64ffda] text-[#64ffda] shadow-[0_0_15px_rgba(100,255,218,0.3)]'
                  : 'bg-[#0a192f] border-[#233554] text-[#8892b0] hover:border-[#64ffda]/40'
              }`}
            >
              <div className="text-[10px] font-mono mb-1">NODE 02</div>
              <Zap className={`w-5 h-5 mx-auto mb-2 ${switches.filter ? 'text-[#64ffda]' : 'text-[#8892b0]'}`} />
              <div className="text-xs font-bold font-mono">3.3V Regulator</div>
              <div className="text-[10px] font-mono mt-1 text-[#64ffda]">
                {switches.filter ? 'REGULATED' : 'WAITING'}
              </div>
            </button>

            {/* Step 3: Dual MCU Telemetry */}
            <button
              onClick={() => toggleSwitch('pyro')}
              disabled={!switches.pwr || !switches.filter}
              className={`p-4 rounded-xl border text-center transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                switches.pyro
                  ? 'bg-[#112240] border-[#64ffda] text-[#64ffda] shadow-[0_0_15px_rgba(100,255,218,0.3)]'
                  : 'bg-[#0a192f] border-[#233554] text-[#8892b0] hover:border-[#64ffda]/40'
              }`}
            >
              <div className="text-[10px] font-mono mb-1">NODE 03</div>
              <Zap className={`w-5 h-5 mx-auto mb-2 ${switches.pyro ? 'text-[#64ffda]' : 'text-[#8892b0]'}`} />
              <div className="text-xs font-bold font-mono">Pico 2 + Nano</div>
              <div className="text-[10px] font-mono mt-1 text-[#64ffda]">
                {switches.pyro ? 'ONLINE (10Hz)' : 'IDLE'}
              </div>
            </button>
          </div>

          {/* Circuit Status readout */}
          <div className="p-3 rounded-lg bg-[#112240] border border-[#233554] text-xs font-mono text-center">
            {success ? (
              <div className="text-[#64ffda] font-bold flex items-center justify-center gap-2">
                <Award className="w-4 h-4" />
                <span>ALL TELEMETRY CORES ONLINE! READY FOR LAUNCH!</span>
              </div>
            ) : (
              <span className="text-[#8892b0]">
                STATUS: Power rails offline. Click Node 01 to begin power sequence.
              </span>
            )}
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleReset}
            className="text-xs font-mono text-[#8892b0] hover:text-[#64ffda] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Bus</span>
          </button>

          <button
            onClick={onClose}
            className="btn-mint-outline px-5 py-2 rounded text-xs font-mono cursor-pointer"
          >
            Close Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameModeOverlay;
