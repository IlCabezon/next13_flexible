"use client";

// native
import { useState, useEffect } from "react";

// next-auth
import { getProviders, signIn } from "next-auth/react";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signInUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

export default function AuthProviders() {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();

      setProviders(res);
    };
    fetchProviders();
  }, []);

  if (providers) {
    return (
      <div>
        {Object.values(providers).map(({ id }: Provider) => (
          <button key={id} onClick={() => signIn(id)}>{id}</button>
        ))}
      </div>
    );
  }
}
