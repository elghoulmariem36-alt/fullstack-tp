"use client";
import { useParams } from "next/navigation";

export default function ContactDetail() {
  const params = useParams<{ id: string }>();

  return (
    <>
      <div>Contact Page</div>
      <h2>Contact ID: {params.id}</h2>
    </>
  );
}