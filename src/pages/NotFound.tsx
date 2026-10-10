import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full p-8 rounded-xl border border-[#233554] bg-[#112240] text-center space-y-6 shadow-2xl">
        <div className="space-y-2">
          <div className="text-6xl font-extrabold font-mono text-[#64ffda] tracking-widest">
            404
          </div>
          <h1 className="text-xl font-bold text-[#ccd6f6]">
            SIGNAL LOST / ROUTE NOT FOUND
          </h1>
          <p className="text-xs font-mono text-[#8892b0]">
            The telemetry path you requested did not return an ACK packet.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#0a192f] border border-[#233554] text-left font-mono text-xs text-[#8892b0] space-y-1">
          <p className="text-[#64ffda]">$ ping destination_path</p>
          <p>Request timeout for icmp_seq 0</p>
          <p>Status: ERR_TELEMETRY_DISCONNECTED</p>
        </div>

        <div className="pt-2 flex justify-center gap-3">
          <Link
            to="/"
            className="btn-mint-outline px-6 py-2.5 rounded text-xs font-mono inline-flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Station</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
