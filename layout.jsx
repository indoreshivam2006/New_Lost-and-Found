import './globals.css';
import { FaMapMarkerAlt, FaComments, FaHome, FaUser } from 'react-icons/fa';
import Link from 'next/link';

export const metadata = {
  title: 'CampusConnect',
  description: 'University social media app for students to connect, share, and chat.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex bg-black text-gray-900 font-sans">
        {/* Sidebar */}
        <aside className="hidden sm:flex w-20 bg- shadow-md p-4 flex-col items-center gap-8 fixed h-screen z-10 border-r border-gray-200">
          <NavIcon href="/" icon={<FaHome />} tooltip="Home" />
          <NavIcon href="/map" icon={<FaMapMarkerAlt />} tooltip="Map" />
          <NavIcon href="/chat" icon={<FaComments />} tooltip="Chat" />
          <NavIcon href="/profile" icon={<FaUser />} tooltip="Profile" />
        </aside>

        {/* Main Content */}
        <main className="flex-1 sm:ml-20 min-h-screen p-6">{children}</main>
      </body>
    </html>
  );
}

import PropTypes from 'prop-types';

function NavIcon({ href, icon, tooltip }) {
  return (
    <Link href={href} title={tooltip}>
      <div className="text-gray-600 hover:text-blue-500 transition text-xl cursor-pointer">{icon}</div>
    </Link>
  );
}

NavIcon.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  tooltip: PropTypes.string.isRequired,
};

function NavIcon({ href, icon, tooltip }) {
  return (
    <Link href={href} title={tooltip}>
      <div className="text-gray-600 hover:text-blue-500 transition text-xl cursor-pointer">{icon}</div>
    </Link>
  );
}
