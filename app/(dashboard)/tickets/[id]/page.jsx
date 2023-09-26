import Image from "next/image";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: ticket } = await supabase
    .from("tickets")
    .select()
    .eq("id", params.id)
    .single();

  return {
    title: `Cloudinary Auth Gallery | ${ticket?.title || "Ticket not Found"}`,
  };
}

async function getTicket(id) {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase
    .from("tickets")
    .select()
    .eq("id", id)
    .single();

  if (!data) {
    notFound();
  }

  return data;
}

export default async function TicketDetails({ params }) {
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
            src={ticket.image}
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
