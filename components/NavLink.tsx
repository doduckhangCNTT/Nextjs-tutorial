import Link from "next/link";
import React from "react";
import Nav from "react-bootstrap/Nav";

interface IProps {
  href: string;
  name?: string;
}

const NavLink: React.FC<IProps> = ({ href, name }) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <Nav.Link>{name}</Nav.Link>
    </Link>
  );
};

export default NavLink;
