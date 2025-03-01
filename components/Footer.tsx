import React from "react";
import Link from "next/link"; // Assuming Next.js for consistency with your project

const Footer: React.FC = () => {
  return (
    <footer className="bg-bodyColor text-white py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm">
          {/* FAQ Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold font-titleFont text-indigo-200">FAQ</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/faq#location" className="hover:text-indigo-200 transition-colors">
                  Where we are based
                </Link>
              </li>
              <li>
                <Link href="/faq#operations" className="hover:text-indigo-200 transition-colors">
                  How we operate
                </Link>
              </li>
              <li>
                <Link href="/faq#refunds" className="hover:text-indigo-200 transition-colors">
                  Refund policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold font-titleFont text-indigo-200">Contacts</h2>
            <ul className="space-y-2">
              <li>Email: <a href="mailto:test@gmail.com" className="hover:text-indigo-200 transition-colors">test@gmail.com</a></li>
              <li>Phone: <a href="tel:123-456-7890" className="hover:text-indigo-200 transition-colors">123-456-7890</a></li>
              <li>Address: 1234 Test St, Test City, TC 56789</li>
            </ul>
          </div>

          {/* Privacy Policy Section */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold font-titleFont text-indigo-200">Privacy Policy</h2>
            <p className="text-gray-300 line-clamp-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, dicta! Voluptate nihil quidem omnis voluptatibus minima similique error eius nostrum tempore, esse cumque alias unde autem molestiae officiis.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Time Totes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;