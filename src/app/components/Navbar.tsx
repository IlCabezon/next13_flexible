// native
import Link from "next/link";
import Image from "next/image";

// constants
import { NavLinks } from "@/constants";

// components
import { AuthProviders } from ".";

// lib
import { getCurrentUser } from "@/lib/session";

export default async function Navbar() {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="/logo.svg" alt="Flexibble" width={115} height={43} />
        </Link>

        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map(({ href, key, text }) => (
            <Link key={key} href={href}>
              {text}
            </Link>
          ))}
        </ul>
      </div>

      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt="user photo"
                width={50}
                height={50}
              />
            )}
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
}
