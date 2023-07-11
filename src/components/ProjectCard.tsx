// native
import Link from "next/link";
import Image from "next/image";

// lib
import { randomizer } from "@/lib/interactions";

type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

export default function ProjectCard({
  id,
  image,
  title,
  name,
  avatarUrl,
  userId,
}: Props) {
  const interactions = [randomizer(), randomizer()]

  return (
    <div className="flexCenter flex-col rounded-xl drop-shadow--card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          width={414}
          height={314}
          alt="project preview"
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="hidden group-hover:flex profile_card-title">
          <p>{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="profile image"
            />
            <p>{name}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src="hearth.svg" width={13} height={12} alt="heahearthrt" />
            <p className="text-sm">{Math.min(...interactions)}k</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="eye.svg" width={13} height={12} alt="eye" />
            <p className="text-sm">{Math.max(...interactions)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
