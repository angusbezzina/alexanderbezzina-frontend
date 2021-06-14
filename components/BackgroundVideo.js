import styled from 'styled-components';

const BackgroundVideoStyles = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 56.25%; // 16:9 Aspect-Ratio
  overflow: hidden;
  background-color: var(--black);

  .background-video {
    height: auto;
    width: 100%;
  }

  .background-video-content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 1200px) {
    height: auto;
    max-height: 100vh;
    padding-bottom: 0;

    .background-video {
      height: 100%;
    }
  }
`;

export default function BackgroundVideo({ video, children }) {
  return (
    <BackgroundVideoStyles>
      <video autoPlay loop muted playsInline className="background-video">
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="background-video-content">{children}</div>
    </BackgroundVideoStyles>
  );
}
