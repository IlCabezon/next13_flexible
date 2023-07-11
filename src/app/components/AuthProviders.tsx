"use client";

// native
import { useState, useEffect } from "react";

// next-auth
import { getProviders, signIn } from "next-auth/react";

// components
import CustomButton from "@/components/CustomButton";

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
          <CustomButton
            key={id}
            type="button"
            title="Sign In"
            handleClick={() => signIn(id)}
          />
        ))}
      </div>
    );
  }
}
