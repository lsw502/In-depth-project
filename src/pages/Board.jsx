import React from 'react';
import { getBoards } from '../api/boardApi';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import InputBoard from '../redux/components/InputBoard/InputBoard';
import { useNavigate } from 'react-router-dom';

const Board = () => {
    const navigate = useNavigate();

    const { isLoading, isError, data } = useQuery('board', getBoards);

    if (isLoading) {
        return <h1>로딩중입니다...</h1>;
    }
    if (isError) {
        return <h1>에러가 발생했습니다.</h1>;
    }
    return (
        <div>
            <InputBoard />
            {data.map((item) => {
                return (
                    <Stwrapper>
                        <div>제목 : {item.title}</div>
                        <div>내용 : {item.contents}</div>
                        <button
                            onClick={() => {
                                navigate(`/board/${item.id}`);
                            }}
                        >
                            상세보기
                        </button>
                    </Stwrapper>
                );
            })}
        </div>
    );
};

export default Board;

const Stwrapper = styled.div`
    background-color: lightgray;
    border: 1px solid black;
    margin: 10px;
    width: 500px;
`;
