"use client";

// native
import Link from "next/link";
import Image from "next/image";

// next auth
import { signOut } from "next-auth/react";

// types
import { SessionInterface } from "@/common.types";

type Props = {
  session: SessionInterface;
};

export default function ProfileMenu({ session }: Props) {
  return (
    <>
      {session.user?.image && (
        <Link href={`/profile/${session?.user?.id}`}>
          <Image
            src={session.user.image}
            alt="user photo"
            width={50}
            height={50}
          />
        </Link>
      )}
      <button type="button" onClick={() => signOut()}>
        Sign out
      </button>
    </>
  );
}
