// native
import Image from "next/image";
import Link from "next/link";

// constants
import { footerLinks } from "@/constants";

export default function Footer() {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image src="/logo-purple.svg" alt="logo" width={115} height={38} />
          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Flexibble is the worlds leading community for creatives to share,
            grow, and get hired.
          </p>
        </div>

        <div className="flex flex-wrap gap-12">
          {footerLinks.map(({ title, links }) => (
            <FooterColumn key={title} title={title} links={links} />
          ))}
        </div>
      </div>

      <div className="flexBetween footer_copyright">
        <p>
          @2023 Flexibble. All rights reserved
        </p>
        <p className="text-gray">
          <span className="text-black font-semibold mr-1">
            10,214
          </span>
          projects submitted
        </p>
      </div>
    </footer>
  );
}

// aux component

type FooterColumnProps = {
  title: string;
  links: Array<string>;
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="footer_column">
      <h4 className="font-semibold">{title}</h4>
      <ul className="flex flex-col gap-2 font-normal">
        {links.map((link) => (
          <Link key={link} href="/">{link}</Link>
        ))}
      </ul>
    </div>
  );
}
