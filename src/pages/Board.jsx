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
        <>
            <InputBoard />
            <>
                <InputWrapper>
                    {data.map((item) => {
                        return (
                            <Stwrapper
                                onClick={() => {
                                    navigate(`/board/${item.id}`);
                                }}
                            >
                                <div> {item.title}</div>
                            </Stwrapper>
                        );
                    })}
                </InputWrapper>
            </>
        </>
    );
};

export default Board;

const Stwrapper = styled.div`
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
        rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
    background-color: lightgray;
    border-radius: 3px;
    margin: 10px;
    width: 500px;
    padding: 10px;
`;

const InputWrapper = styled.div`
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
        rgba(0, 0, 0, 0.22) 0px 10px 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    margin: 20px;
    padding: 20px;
`;
