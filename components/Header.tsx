/** @jsxImportSource @emotion/react */
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from 'next-auth/react';
import { css } from "@emotion/react";
import styled from '@emotion/styled';

const linkStyles = css`
  text-decoration: none;
  display: inline-block;
  margin-left: 1rem;
  color: var(--geist-foreground);

  &[data-active='true'] {
    color: gray;
    font-weight: bold;
    text-decoration: underline;
  }
`;

const Nav = styled.nav`
  display: flex;
  padding: 2rem;
  align-items: center;
`;

const RightDiv = styled.div`
  margin-left: auto;
  a {
    text-decoration: none;
    color: var(--geist-foreground);
    display: inline-block;
    border: 1px solid var(--geist-foreground);
    padding: 0.5rem 1rem;
    border-radius: 3px;
  }
`;

const Button = styled.button`
  border: none;
`;

const LinkWrapper = styled.a`
  ${linkStyles};
`;

const getLeftContent = (session, status, isActive) => (
  <div>
    <Link href="/" passHref>
      <LinkWrapper data-active={isActive('/')}>
        Home
      </LinkWrapper>
    </Link>
    {
      status !== "loading" &&
      <Link href="/drafts" passHref>
        <LinkWrapper data-active={isActive('/drafts')}>
          My drafts
        </LinkWrapper>
      </Link>
    }
  </div>
);

const getRightContent = (session, status, isActive) => {
  if (status === 'loading') {
    return (
      <RightDiv>
        <p>Validating session...</p>
      </RightDiv>
    );
  }

  if (session) {
    return (
      <RightDiv>
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Button>
          <Link  href="/create" passHref>
            <LinkWrapper>
              New post
            </LinkWrapper>
          </Link>
        </Button>
        <Button onClick={() => signOut()}>
          <a css={linkStyles}>Log out</a>
        </Button>
      </RightDiv>
    );
  }

  return (
    <RightDiv>
      <Link href="/api/auth/signin" passHref>
        <LinkWrapper data-active={isActive('/signup')}>
          Log In
        </LinkWrapper>
      </Link>
    </RightDiv>
  );
};

function Header() {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  const leftContent = getLeftContent(session, status, isActive);
  const rightContent = getRightContent(session, status, isActive);

  return <Nav>{leftContent}{rightContent}</Nav>;
}

export default Header;
