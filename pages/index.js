import React from 'react';
import styled from 'styled-components';
import BackgroundVideo from '../components/BackgroundVideo';

import ResumeSection from '../components/ResumeSection';
import TitleStyles from '../components/styles/TitleStyles';
import MasonryGallery from '../components/MasonryGallery';
import SubtitleStyles from '../components/styles/SubtitleStyles';
import { ScrollButtonStyles } from '../components/styles/ButtonStyles';
import Backdrop from '../components/Backdrop';
import { ListStyles, ListItemStyles } from '../components/styles/ListStyles';

const HomeStyles = styled.div`
  width: 100vw;
  max-width: 100vw;
  margin-left: -50vw;
  margin-right: -50vw;
  color: var(--offWhite);

  h1 {
    font-size: 2rem;
    animation: fadein 2s;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    outline: none;
    border: none;
    animation: fadein 2.25s;

    &:hover {
      cursor: pointer;
    }
  }

  .contact-link {
    transform: skew(-5deg) rotate(-1deg);

    span {
      margin-right: 0.5rem;
      border-bottom: 3px solid var(--aqua);
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default function HomePage() {
  const content = React.useRef(null);

  const scrollToContent = () => {
    if (content.current) {
      window.scrollTo({
        left: 0,
        top: content.current.offsetTop - 70,
        behavior: 'smooth',
      });
    }
  };

  return (
    <HomeStyles>
      <div className="home-page-inner">
        <BackgroundVideo video="https://s3-ap-southeast-2.amazonaws.com/alexanderbezzina.com/Bats+night.mp4">
          <h1>Hi, my name is Alex</h1>
          <ScrollButtonStyles type="button" onClick={scrollToContent}>
            My story...
          </ScrollButtonStyles>
        </BackgroundVideo>
        <div ref={content}>
          <ResumeSection background="green" id="about">
            <TitleStyles background="black">Me... in a nutshell</TitleStyles>
            <div>
              I am a Masters of Conservation graduate with demonstrated skills
              in ecological fieldwork, and statistical and spatial analysis. I
              have completed an independent research project focused on
              developing better conservation outcomes and increased cost
              effectiveness of invasive species management in New Zealand nature
              reserves. I have two years of experience as a volunteer research
              assistant for a big cat biologist and photographer leading to
              contributions as a secondary author on two publications. I
              attained teaching and communication experience as an undergraduate
              tutor and camera trap experience of native and invasive species
              for WWF.
            </div>
          </ResumeSection>
          <ResumeSection background="navy" id="research">
            <TitleStyles>My Research Experience</TitleStyles>
            <div>
              <SubtitleStyles>Master's Research Project</SubtitleStyles>
              <p>University of Queensland 2020</p>
              <ListStyles>
                <ListItemStyles>
                  6-month project partnered with the Department of Conservation
                  Haast Kiwi team in New Zealand
                </ListItemStyles>
                <ListItemStyles>
                  Analysed how to implement more cost-effective management of
                  invasive predators in protected areas using ArcGIS and RStudio
                  software.
                </ListItemStyles>
              </ListStyles>
              <SubtitleStyles>Research Assistant</SubtitleStyles>
              <p>
                Big Cat Biologist and National Geographic Film Maker December
                2018 – Present
              </p>
              <ListStyles>
                <ListItemStyles>
                  Analysed camera trap data to identify individual leopards and
                  hyenas
                </ListItemStyles>
                <ListItemStyles>
                  Preformed literature reviews and compiled population data on
                  big cats for analysis
                </ListItemStyles>
                <ListItemStyles>
                  Contributed to scientific report writing and critiquing
                </ListItemStyles>
              </ListStyles>
              <SubtitleStyles>Conservation and Ecology Undergraduate Tutor</SubtitleStyles>
              <p>University of Queensland February 2020 – Current</p>
              <ListStyles>
                <ListItemStyles>
                  Helped students understand the importance of protected area
                  network design and the factors that contribute to network
                  success
                </ListItemStyles>
                <ListItemStyles>
                  Hands on student education in the use of spatial analysis
                  software including ArcGIS and Marxan
                </ListItemStyles>
                <ListItemStyles>
                  Taught tutorial groups of 8-10 students, exploring complex
                  ecological concepts and scientific methods
                </ListItemStyles>
                <ListItemStyles>
                  Marked and provided feedback on worksheets and assignments,
                  critiquing writing and communication skills of students
                </ListItemStyles>
              </ListStyles>
            </div>
          </ResumeSection>
          <ResumeSection background="green" id="education-and-skills">
            <TitleStyles background="black">My Education & Skills</TitleStyles>
            <Backdrop>
              <div>
                <div>
                  <TitleStyles>Education</TitleStyles>
                </div>
                <SubtitleStyles>Master of Conservation Biology</SubtitleStyles>
                <p>University of Queensland 2019 - 2020</p>
                <SubtitleStyles>Bachelor of Science (Zoology)</SubtitleStyles>
                <p>University of Queensland 2016 - 2018</p>
                <SubtitleStyles>Exchange Semester</SubtitleStyles>
                <p>Arizona State Univeristy 2017</p>
              </div>
              <div>
                <TitleStyles>Skills</TitleStyles>
                <ListStyles>
                  <ListItemStyles>
                    Ecological fieldwork and data collection, including flora
                    and fauna surveys
                  </ListItemStyles>
                  <ListItemStyles>
                    Experimental design and statistical analysis using R-studio
                  </ListItemStyles>
                  <ListItemStyles>
                    Spatial and ecological analysis using ArcGIS platform
                  </ListItemStyles>
                  <ListItemStyles>
                    Camera trap set up and data analysis and identification of
                    species and individuals
                  </ListItemStyles>
                  <ListItemStyles>
                    Teaching and communication of complex ecological and
                    conservation concepts
                  </ListItemStyles>
                  <ListItemStyles>
                    Written communication in a range of formats including
                    scientific and government reports, grant applications, press
                    releases, and social media content
                  </ListItemStyles>
                </ListStyles>
              </div>
            </Backdrop>
          </ResumeSection>
          <ResumeSection id="photography">
            <SubtitleStyles>Photography</SubtitleStyles>
            <p>
              Vulputate ultrices metus primis eleifend suspendisse mollis magna
              praesent, ullamcorper lobortis scelerisque torquent porta cum
              etiam magnis integer, nunc aliquam taciti posuere leo facilisis
              potenti.
            </p>
            <MasonryGallery />
          </ResumeSection>
          <ResumeSection background="navy" id="contact">
            <TitleStyles>Want to get in touch?</TitleStyles>
            <p className="contact-link">
              <span>Call:</span> <a href="tel:+61431950672">+61431950672</a>
            </p>
            <p className="contact-link">
              <span>Email:</span>{" "}
              <a href="mail:alex.h.bezzina@gmail.com">
                alex.h.bezzina@gmail.com
              </a>
            </p>
          </ResumeSection>
        </div>
      </div>
    </HomeStyles>
  );
}
