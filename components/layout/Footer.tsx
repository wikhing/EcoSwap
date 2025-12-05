import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#054a15] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                
                {/* Top Section: 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    
                    {/* Column 1: Mission Statement */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">EcoSwap</h4>
                        <p className="text-sm text-gray-100 leading-relaxed max-w-xs">
                            A sustainable item exchange platform for UM students. Reduce waste, one swap at a time.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-100">
                            <li><Link href="/about" className="hover:text-green-200 transition-colors">About Us</Link></li>
                            <li><Link href="/impact" className="hover:text-green-200 transition-colors">SDG Info</Link></li>
                            <li><Link href="/contact" className="hover:text-green-200 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Support */}
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-100">
                            <li><Link href="/faq" className="hover:text-green-200 transition-colors">FAQ</Link></li>
                            <li><Link href="/safety" className="hover:text-green-200 transition-colors">Safety Guidelines</Link></li>
                            <li><Link href="/report" className="hover:text-green-200 transition-colors">Report an Issue</Link></li>
                        </ul>
                    </div>
                </div>
                
                {/* Bottom Section: Copyright with Divider */}
                <div className="border-t border-white/20 pt-8 text-center">
                    <p className="text-xs text-gray-300">
                        &copy; 2025 EcoSwap Team 3 Occ 7. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}