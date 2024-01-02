import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelectBox = styled.div`
  width: 100%;
  max-width: 1500px;
  height: 60px;
  margin: 0 auto;

  @media (max-width: 786px) {
    max-width: 100%;
  }
`;

export const Label = styled.label`
  margin-top: 10px;
  margin-left: 10px;
`;

export const Select = styled.select`
  margin-bottom: 10px;
  border-radius: 20px;
`;

export const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

export const LoadMoreButton = styled.button`
  margin-bottom: 10px;
  height: 30px;
  width: 400px;
  margin: 15px 800px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
`;

export const SlideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;
  height: 600px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

export const SlidePopularSlider = styled.div`
  display: flex;
  gap: 1rem;
  height: 500px;
  overflow: hidden;
  justify-content: center;
  width: 100%;
  transition: transform 0.5s ease;
`;

export const SlideMovieContainer = styled.div`
  display: flex;
  max-width: 800px;
`;

export const SlideMovieImageContainer = styled.div`
  flex: 0 0 50%;
  width: 100%;
`;

export const SlideMovieImage = styled.img`
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

export const SlideMovieDetails = styled.div`
  flex: 0 0 50%;
  margin-left: 5rem;
  overflow: hidden; /* 넘치는 부분을 숨김 */
  max-height: ${(props) =>
    props.isOverviewExpanded ? "none" : "500px"}; /* 최대 높이 설정 */
  transition: max-height 0.5s ease;
  cursor: pointer;
  h3 {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    font-size: 23px;
    font-weight: bold;
  }

  p {
    margin: 5px 0 20px;
    font-size: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  @media screen and (max-width: 1200px) {
    margin-left: 2rem;
    max-height: ${(props) => (props.isOverviewExpanded ? "none" : "400px")};
  }

  @media screen and (max-width: 768px) {
    margin-left: 1rem;
    max-height: ${(props) => (props.isOverviewExpanded ? "none" : "300px")};

    h3 {
      font-size: 20px;
      margin-bottom: 30px;
    }

    p {
      -webkit-line-clamp: 6;
    }
  }
`;

export const SlideTabContainer = styled.div`
  display: flex;
  margin-top: 3rem;
`;

export const SlideTab = styled.div`
  width: 13px;
  height: 10px;
  border-radius: 40%;
  margin: 0 5px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#007BFF" : "#DDDDDD")};
  transition: transform 0.5s ease;
  transform: scale(${(props) => (props.active ? 1.5 : 1)});
`;

export const MovieCardContainer = styled.div`
  position: relative;
  width: 200px;
  border: 1px solid #ddd;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  overflow: hidden;
`;

export const MovieCardImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  transition: filter 0.5s ease;

  &:hover {
    filter: blur(3px);
  }
`;

export const MovieCardDetailsOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.8);
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0;
  transition: opacity 0.5s ease;
  cursor: pointer;

  ${MovieCardContainer}:hover & {
    opacity: 1;
  }

  h3 {
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: bold;
  }

  p {
    margin: 5px 0;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const MovieCardDetails = styled.div`
  margin-top: 10px;
`;

export const SearchInput = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  width: 250px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  border: none;
`;

export const SearchButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const SearchBox = styled.div`
  margin-left: 560px;
  width: 450px;
`;

export const OptionBox = styled.div`
  width: 400px;
  margin-left: 1100px;
  margin-top: -35px;
`;

export const GenreCircle = styled.div`
  display: inline-block;
  margin-right: 8px;
  margin-bottom: 5px;
  padding: 5px;
  border-radius: 50%;
  border: 1px solid rgba(128, 128, 128, 0.3);
  font-size: 12px;
  border-radius: 20px;
`;
