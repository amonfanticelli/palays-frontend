"use client";
import { useEffect } from "react";
import { useGlobalContext } from "@/provider/store";

export default function Product() {
  const { userId, setUserId, data, setData } = useGlobalContext();

  useEffect(() => {
    setUserId("2");
    setData([
      { firstName: "Tim" },
      { firstName: "Michael" },
      { firstName: "Amon" },
    ]);
  });

  return (
    <div>
      <h1>olá</h1>
      <p>User id: {userId}</p>
      <p>First Names: </p>
      {data.map((e, i) => (
        <p key={i}>{e.firstName} </p>
      ))}
    </div>
  );
}
