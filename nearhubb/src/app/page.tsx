"use client";

import { useQuery } from "@apollo/client";
import { GET_SALONS } from "@/graphql/queries";
import client from "@/lib/apollo-client";
import Image from "next/image";
import Link from "next/link";

interface Salon {
  slug: string;
  title: string;
  salonFields: {
    city: string;
    serviceType: string;
    address: string;
    phoneNumber: string;
    whatsappNumber?: string;
  };
}

export default function HomePage() {
  const { data, loading, error } = useQuery<{ salons: { nodes: Salon[] } }>(
    GET_SALONS,
    {
      client,
    }
  );

  return (
    <div className="bg-gray-950 text-white min-h-screen font-poppins">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap");
        .font-poppins {
          font-family: "Poppins", sans-serif;
        }
      `}</style>

      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/salon-hero.jpg')`,
        }}
      >
        <div className="max-w-7xl mx-auto text-center z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 tracking-tight animate-fade-in-up">
            Discover Luxury Salons Near You
          </h1>
          <p className="text-xl sm:text-2xl text-gray-200 mb-8 animate-fade-in-up delay-100">
            Book premium beauty and wellness experiences instantly
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Treatment or Venue"
              className="px-5 py-4 w-full sm:w-1/3 rounded-full bg-gray-800/30 backdrop-blur-lg border border-indigo-500/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 transform hover:scale-105"
            />
            <input
              type="text"
              placeholder="Location"
              className="px-5 py-4 w-full sm:w-1/3 rounded-full bg-gray-800/30 backdrop-blur-lg border border-indigo-500/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300 transform hover:scale-105"
            />
            <button className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-8 py-4 rounded-full hover:from-indigo-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Find Salons
            </button>
          </div>
          <p className="mt-6 text-sm text-gray-400 animate-fade-in-up delay-200">
            567,833 appointments booked today
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950/60 transform scale-110 transition-transform duration-1000"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gradient bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Your Ultimate Beauty Hub
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1B+", label: "Appointments Booked" },
              { value: "130K+", label: "Partner Businesses" },
              { value: "120+", label: "Countries" },
              { value: "450K+", label: "Professionals" },
            ].map((stat, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <p className="text-5xl font-bold text-indigo-400 animate-pulse">
                  {stat.value}
                </p>
                <p className="text-gray-300 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Trending Services
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {["Hair", "Nails", "Spa", "Massage"].map((cat, index) => (
            <div
              key={cat}
              className="relative bg-gray-800/30 backdrop-blur-lg p-6 rounded-xl shadow-2xl hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transform hover:-translate-y-2 transition-all duration-300 border border-indigo-500/30 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative block text-lg font-semibold text-indigo-300 group-hover:text-white">
                {cat}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Salons */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Top-Rated Salons
        </h2>
        {loading ? (
          <p className="text-center text-gray-400 animate-pulse">
            Loading salons...
          </p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading salons.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {data?.salons?.nodes?.map((salon, index) => (
              <div
                key={salon.slug}
                className="relative bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 shadow-2xl hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transform hover:-translate-y-2 transition-all duration-300 border border-indigo-500/30 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="relative text-xl font-semibold text-white mb-2">
                  {salon.title}
                </h3>
                <p className="relative text-sm text-gray-400 mb-3">
                  {salon.salonFields.city} • {salon.salonFields.serviceType}
                </p>
                <p className="relative text-gray-300 mb-2">
                  {salon.salonFields.address}
                </p>
                <p className="relative text-gray-300 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  {salon.salonFields.phoneNumber}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* App Download Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4 text-gradient bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              Get the Nearhubb App
            </h2>
            <p className="text-gray-300 mb-6 max-w-md mx-auto md:mx-0">
              Unlock seamless beauty and wellness bookings with our
              state-of-the-art mobile app
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Link
                href="#"
                className="inline-block transform hover:scale-105 transition-transform"
              >
                <Image
                  src="/app-store-badge.png"
                  alt="Download on the App Store"
                  width={150}
                  height={50}
                  className="rounded-lg shadow-lg border border-indigo-500/30"
                />
              </Link>
              <Link
                href="#"
                className="inline-block transform hover:scale-105 transition-transform"
              >
                <Image
                  src="/google-play-badge.png"
                  alt="Get it on Google Play"
                  width={150}
                  height={50}
                  className="rounded-lg shadow-lg border border-indigo-500/30"
                />
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 text-center">
            <Image
              src="/qr-code.png"
              alt="Scan to download Nearhubb app"
              width={180}
              height={180}
              className="mx-auto rounded-lg shadow-xl border border-indigo-500/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300"
            />
            <p className="text-gray-400 mt-4">Scan to download</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              step: "Search",
              desc: "Find salons and services near your location.",
              icon: (
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-indigo-400 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              ),
            },
            {
              step: "Book",
              desc: "Choose a time and book instantly online.",
              icon: (
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-indigo-400 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              ),
            },
            {
              step: "Visit",
              desc: "Go to the salon and enjoy your service.",
              icon: (
                <svg
                  className="w-16 h-16 mx-auto mb-4 text-indigo-400 animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center p-8 bg-gray-800/30 backdrop-blur-lg rounded-full shadow-2xl hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all duration-300 border border-indigo-500/30"
            >
              {item.icon}
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.step}
              </h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nearhubb for Business */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Nearhubb for Business
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Elevate your salon with the #1 booking platform, trusted by beauty
            professionals worldwide.
          </p>
          <button className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white px-8 py-4 rounded-full hover:from-indigo-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Discover More
          </button>
          <div className="mt-6 flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-6 h-6 text-yellow-400 animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-400">
                Nearhubb
              </h3>
              <p className="text-gray-400">
                Transforming beauty and wellness bookings with style.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-400">
                Explore
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-indigo-300 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-indigo-300 transition-colors"
                  >
                    Salons
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-indigo-300 transition-colors"
                  >
                    Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-400">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-indigo-300 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-indigo-300 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-indigo-300 transition-colors"
                  >
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-indigo-400">
                Connect
              </h3>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-indigo-300 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-indigo-300 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-indigo-300 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-400 mt-8">
            &copy; {new Date().getFullYear()} Nearhubb. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
