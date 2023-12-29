import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelectBox = styled.div`
  margin-left: 1230px;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-top: 10px;
  margin-left: 10px;
`;

export const Select = styled.select`
  margin-bottom: 10px;
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
  width: 250px;
  margin: 15px 800px;
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
`;

export const SlideMovieDetails = styled.div`
  flex: 0 0 50%;
  margin-left: 1rem;
  overflow: hidden; /* 넘치는 부분을 숨김 */
  max-height: ${(props) =>
    props.isOverviewExpanded ? "none" : "325px"}; /* 최대 높이 설정 */
  transition: max-height 0.5s ease;
  cursor: pointer;

  &:hover {
    max-height: none; /* 마우스를 올릴 때 전체 내용 보여줌 */
  }
`;

export const SlideTabContainer = styled.div`
  display: flex;
  margin-top: 3rem;
`;

export const SlideTab = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#007BFF" : "#DDDDDD")};
`;

export const MovieCardContainer = styled.div`
  width: 200px;
  border: 1px solid #ddd;
  padding: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

export const MovieCardImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 20px;
`;

export const MovieCardDetails = styled.div`
  margin-top: 10px;
`;
