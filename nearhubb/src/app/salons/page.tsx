// src/app/salons/page.tsx
'use client';

import { useQuery, gql } from '@apollo/client';
import client from '@/lib/apollo-client';

type Salon = {
  slug: string;
  title: string;
  salonFields: {
    city: string;
    serviceType: string;
    address: string;
    phoneNumber: string;
    whatsappNumber: string;
  };
};

type SalonsData = {
  salons: {
    nodes: Salon[];
  };
};

const GET_SALONS = gql`
  query GetSalons {
    salons {
      nodes {
        slug
        title
        salonFields {
          city
          serviceType
          address
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`;

export default function SalonsPage() {
  const { data, loading, error } = useQuery<SalonsData>(GET_SALONS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading salons.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Salon Listings</h1>
      {data?.salons.nodes.map((salon) => (
        <div key={salon.slug} className="border p-4 mb-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{salon.title}</h2>
          <p>City: {salon.salonFields.city}</p>
          <p>Service: {salon.salonFields.serviceType}</p>
          <p>Address: {salon.salonFields.address}</p>
          <p>Phone: {salon.salonFields.phoneNumber}</p>
          <p>WhatsApp: {salon.salonFields.whatsappNumber}</p>
        </div>
      ))}
    </div>
  );
}
