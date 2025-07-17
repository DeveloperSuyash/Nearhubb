// 'use client' not required for server components
import { GET_SALONS } from '@/graphql/queries';
import  client  from '@/lib/apollo-client';

export async function generateStaticParams() {
  const res = await client.query({
    query: GET_SALONS,
  });

  return res.data.salons.nodes.map((salon: any) => ({ slug: salon.slug }));
}

export default async function SalonPage({ params }: { params: { slug: string } }) {
  const { data } = await client.query({
    query: GET_SALONS,
    variables: { slug: params.slug },
  });

  const salon = data?.salon;

  return (
    <div className="bg-zinc-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold">{salon.title}</h1>
      <p className="text-gray-400 italic">{salon.salonFields.reviewSnippet}</p>
      <img src={salon.salonFields.salonPhoto.sourceUrl} alt="Salon" className="rounded my-4" />

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold">📍 Address</h2>
          <p>{salon.salonFields.address}</p>

          <h2 className="font-semibold mt-4">📞 Phone</h2>
          <p>{salon.salonFields.phoneNumber}</p>

          <h2 className="font-semibold mt-4">🕒 Opening Hours</h2>
          <ul>
            {salon.salonFields.openingHours.map((day: any, i: number) => (
              <li key={i}>{day.day}: {day.time}</li>
            ))}
          </ul>

          <a
            href={salon.salonFields.appointmentUrl}
            target="_blank"
            className="mt-6 inline-block bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Book Appointment
          </a>
        </div>

        <div>
          <h2 className="font-semibold">✨ Services</h2>
          <div className="grid grid-cols-2 gap-2">
            {salon.salonFields.servicePhoto.map((img: any, i: number) => (
              <img key={i} src={img.sourceUrl} className="rounded" />
            ))}
          </div>

          <h2 className="font-semibold mt-4">🏆 Business USP</h2>
          <ul className="list-disc ml-5">
            {salon.salonFields.businessUsp.map((usp: string, i: number) => (
              <li key={i}>{usp}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">❓ FAQs</h2>
        {salon.salonFields.faqs.map((faq: any, i: number) => (
          <div key={i} className="mt-2">
            <p className="font-semibold">{faq.question}</p>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">⭐ Reviews</h2>
        {salon.salonFields.reviewBody.map((r: any, i: number) => (
          <div key={i} className="border-b border-gray-700 py-2">
            <p className="font-semibold">{r.name} - {r.rating}/5</p>
            <p>{r.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
