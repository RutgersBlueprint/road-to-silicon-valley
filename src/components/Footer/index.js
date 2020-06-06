import React from "react";
import styled from "styled-components";
import media from "styled-media-query";

import fb from "../../assets/social/facebook.png";
import ig from "../../assets/social/instagram.png";
import li from "../../assets/social/linked-in.png";
import tw from "../../assets/social/twitter.png";

const IconsContainer = styled.div`
  display: flex;
  width: fit-content;
  margin: 0 auto;
`;

const Icon = styled.img`
  width: 48px;
  height: 48px;
  margin: 0 16px;

  object-fit: cover;
  user-select: none;
  user-drag: none;
`;

const LinksContainer = styled.div`
  display: flex;
  width: fit-content;
  margin: 0 auto;
  padding-top: 32px;
  
  ${media.lessThan("medium")`
    flex-direction: column;
  `}
`;
const Link = styled.a`
  padding: 0 36px;

  text-transform: uppercase;
  text-decoration: none;
  font-weight: 100;
  font-size: 14px;
  color: black;

  ${media.lessThan("medium")`
    text-align: center;
    font-size: 20px;
    line-height: 1.6;
  `}
`;

const Container = styled.div`
  padding: 48px 0;
`;

const Footer = () => {
  return (
    <Container>
      <IconsContainer>
        <Icon src={fb} />
        <Icon src={ig} />
        <Icon src={li} />
        <Icon src={tw} />
      </IconsContainer>
      <LinksContainer>
        <Link href="#about-us">About Us</Link>
        <Link href="#our-team">Our Team</Link>
        <Link href="#gallery">Gallery</Link>
        <Link href="#events">Events</Link>
        <Link href="#recruitment">Recruitment</Link>
      </LinksContainer>
    </Container>
  );
};

export { Footer };
