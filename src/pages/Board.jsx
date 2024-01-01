import React, { useState } from 'react';
import { getBoards } from '../api/boardApi';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import InputBoard from '../components/InputBoard';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Board = () => {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { isLoading, isError, data } = useQuery('board', getBoards);

    const handlePageClick = ({ selected }) => {
        console.log(page);
        setPage(selected + 1);
    };

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

                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={5} // 전체페이지가 몇개인지
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={page - 1}
                    />
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
