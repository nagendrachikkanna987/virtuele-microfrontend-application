import { Leaf, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-40 w-full bg-gray-50 border-t border-gray-200">
      <div className="flex items-center justify-between px-6 py-2 text-xs text-gray-600">
        <div className="flex items-center gap-4">
          <span>Project Directory</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-green-600" />
            <Globe className="w-4 h-4 text-blue-600" />
          </div>
          <span>Saturday, January 24th 2026</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
