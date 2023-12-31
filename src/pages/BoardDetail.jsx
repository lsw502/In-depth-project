import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoard, removeBoard } from '../api/boardApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
import { loginIdAtom } from '../recoil/Atom';

import styled from 'styled-components';

const BoardDetail = () => {
    const queryClient = useQueryClient();
    const userId = useRecoilValue(loginIdAtom);
    // const setUserId = useSetRecoilState(loginIdAtom);
    // const [userId, setUserId] = useRecoilState(loginIdAtom);

    const paramId = useParams().id;
    const navigate = useNavigate();
    const mutation = useMutation(removeBoard, {
        onSuccess: () => {
            queryClient.invalidateQueries('board'); //
            console.log('성공하였습니다.');
        }
    });
    const { data, isLoading } = useQuery(['board', paramId], () =>
        getBoard(paramId)
    );

    if (isLoading) {
        return <h1>loading...</h1>;
    }

    return (
        <Stwapper>
            <Sttitle>{data.title}</Sttitle>
            <Stnickname>{data.nickname} 님</Stnickname>
            <Stline />
            <Stcontent>{data.contents}</Stcontent>
            {userId === data.writer ? (
                <Stwrapper>
                    <Stbutton
                        onClick={() => {
                            mutation.mutate(data.id);
                            console.log(data.id);
                            navigate('/board');
                        }}
                    >
                        삭제
                    </Stbutton>
                    <Stbutton
                        onClick={() => {
                            navigate('/board');
                        }}
                    >
                        돌아가기
                    </Stbutton>
                </Stwrapper>
            ) : (
                <button
                    onClick={() => {
                        navigate('/board');
                    }}
                >
                    돌아가기
                </button>
            )}
        </Stwapper>
    );
};

export default BoardDetail;

const Stwapper = styled.div`
    margin: 20px auto;
    padding: 20px;
    width: 1000px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const Sttitle = styled.div`
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
`;

const Stnickname = styled.div``;
const Stcontent = styled.div`
    margin-bottom: 50px;
    padding: 30px;
    font-size: 20px;
    width: 100%;
    height: 500px;
`;

const Stline = styled.div`
    border: 1px solid rgb(217, 217, 217);
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const Stwrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`;

const Stbutton = styled.button`
    padding: 10px;
    width: 100px;
    border: none;
    cursor: pointer;
    background-color: #e3dede;
    color: black;
    &:hover {
        background-color: #5e5e5f;
        color: white;
        box-shadow: 200px 0 0 0 rgba(0, 0, 0, 0.5) inset;
    }
`;
