import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function AdminRedirect() {
  const configured = import.meta.env.VITE_STUDIO_URL || '';
  const studioUrl = /^https:\/\/[^/]+\.sanity\.studio\/?$/.test(configured) ? configured : '';
  useEffect(() => { if (studioUrl) window.location.replace(studioUrl); }, [studioUrl]);
  return <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <h1 className="text-xl text-[#eef3fb]">Portfolio Admin</h1>
    {studioUrl ? <a className="text-[#83b4ff]" href={studioUrl}>Opening admin… Continue to Studio</a> : <p>The admin is not connected yet. Follow the setup guide included with your portfolio.</p>}
    <Link to="/" className="text-[#83b4ff]">Return to portfolio</Link>
  </div>;
}
