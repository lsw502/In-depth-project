import React, { useState } from 'react';
// import { getBoards } from '../api/boardApi';
import { useInfiniteQuery, useQuery } from 'react-query';
import styled from 'styled-components';
import InputBoard from '../components/InputBoard';
import { useNavigate } from 'react-router-dom';
import { getBoards } from 'api/boardApi';

const Board = () => {
    // const getBoards = async ({ pageParam = 1 }) => {
    //     console.log();
    //     const response = await axios.get(
    //         `${process.env.REACT_APP_SERVER_URL}/comments?_page=${pageParam}`
    //     );
    //     console.log(response.data);
    //     return response.data;
    // };
    const navigate = useNavigate();

    // const {} = useInfiniteQuery({
    //     queryKey: ['boardss'],
    //     queryFn: getBoards,
    //     getNextPageParam: (LastPage) => {
    //         return LastPage;
    //     }
    // });

    // 데이터 가져오기
    const { isLoading, isError, data } = useQuery('board', getBoards);

    if (isLoading) {
        return <h1>loading..</h1>;
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
                                <div> {item.createdAt}</div>
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
    border-radius: 3px;
    margin: 10px;
    width: 700px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    background-color: #e3dede;
    &:hover {
        background-color: #5e5e5f;
        color: white;
    }
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
    padding: 40px;
`;
