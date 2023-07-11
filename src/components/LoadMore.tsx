"use client";

// native
import { useRouter } from "next/navigation";

// components
import CustomButton from "./CustomButton";

type Props = {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export default function LoadMore({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}: Props) {
  const router = useRouter();

  const handleNavigation = (direction: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    if (direction === "next" && hasNextPage) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
    } else if (direction === "first" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
    }

    const newSearchParams = currentParams.toString()
    const newPathname = `${window.location.pathname}?${newSearchParams}`
    router.push(newPathname)
  };

  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <CustomButton
          type="button"
          title="First Page"
          handleClick={() => handleNavigation("first")}
        />
      )}

      {hasNextPage && (
        <CustomButton
          type="button"
          title="Next"
          handleClick={() => handleNavigation("next")}
        />
      )}
    </div>
  );
}
