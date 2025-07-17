'use client';

import { useQuery } from '@apollo/client';
import { GET_SALONS } from '@/graphql/queries';
import client from '@/lib/apollo-client';

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
  const { data, loading, error } = useQuery<{ salons: { nodes: Salon[] } }>(GET_SALONS, {
    client,
  });

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r  bg-black text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Book Beauty Services Near You</h1>
        <p className="text-lg mb-6">Find top-rated salons in your area and book instantly</p>
        <div className="flex flex-col md:flex-row justify-center gap-2 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Location"
            className="px-4 py-2 w-full md:w-auto rounded-md bg-white text-black"
          />
          <input
            type="text"
            placeholder="Service (e.g., Haircut)"
            className="px-4 py-2 w-full md:w-auto bg-white text-black"
          />
          <button className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-300">
            Search
          </button>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 px-6 bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {['Hair', 'Nails', 'Spa', 'Massage'].map((cat) => (
            <div
              key={cat}
              className="bg-gray-700 p-4 rounded-lg shadow hover:shadow-md text-center"
            >
              <span className="block text-lg font-medium">{cat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Salons */}
      <section className="py-12 px-6 bg-gray-900">
        <h2 className="text-2xl font-bold text-center mb-6">Featured Salons</h2>
        {loading ? (
          <p className="text-center">Loading salons...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading salons.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data?.salons?.nodes?.map((salon) => (
              <div
                key={salon.slug}
                className="bg-gray-800 rounded-lg p-4 shadow hover:shadow-md"
              >
                <h3 className="text-xl font-semibold">{salon.title}</h3>
                <p className="text-sm text-gray-400">
                  {salon.salonFields.city} - {salon.salonFields.serviceType}
                </p>
                <p className="text-gray-300">{salon.salonFields.address}</p>
                <p className="text-gray-300">📞 {salon.salonFields.phoneNumber}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className="py-12 px-6 bg-gray-800">
        <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center max-w-5xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold mb-2">1. Search</h3>
            <p>Find salons and services near your location.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">2. Book</h3>
            <p>Choose a time and book instantly online.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">3. Visit</h3>
            <p>Go to the salon and enjoy your service.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-black text-white text-center">
        <p>&copy; {new Date().getFullYear()} Nearhubb. All rights reserved.</p>
      </footer>
    </div>
  );
}
