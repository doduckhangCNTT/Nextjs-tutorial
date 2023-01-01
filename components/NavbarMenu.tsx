import Link from "next/link";
import React from "react";
import { Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import ActiveLink from "./ActiveLink";
import NavLink from "./NavLink";

const NavbarMenu = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" className="p-2">
        <Navbar.Brand>
          <Link href="/" passHref legacyBehavior>
            <Nav.Link style={{ background: "red" }}>My Nextjs App</Nav.Link>
          </Link>
        </Navbar.Brand>

        <Nav>
          <NavLink href="/about" name="About" />
          <NavLink href="/post" name="Post" />
          <NavLink href="/jokes/random" name="Jokes" />
          <NavLink href="/books" name="Books" />
          <NavLink href="/fastRefresh" name="FastRefresh" />
          <NavLink href="/users" name="User" />

          <ActiveLink href="/post">ABC</ActiveLink>
        </Nav>
      </Navbar>
    </div>
  );
};

export default NavbarMenu;
