import Image from "next/image";
import { notFound } from "next/navigation";
export const dynamicParams = true;
export async function generateStaticParams() {
  const res = await fetch("http://localhost:4000/tickets");
  const tickets = await res.json();
  return tickets.map((ticket) => ({
    id: ticket.id,
  }));
}
async function getTicket(id) {
  const res = await fetch(`http://localhost:4000/tickets/${id}`, {
    next: {
      revalidate: 30,
    },
  });

  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function ImageDetails({ params }) {
  const ticket = await getTicket(params.id);

  return (
    <main>
      <nav>
        <h2>Image Details and Blog</h2>
      </nav>
      <div className="card">
        <div className="flex items-center justify-center">
          <h3>{ticket.title}</h3>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={ticket.image_src}
            alt="image"
            width={600}
            height={100}
            style={{ borderRadius: "8px" }}
          />
        </div>
        <small>Created By {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
