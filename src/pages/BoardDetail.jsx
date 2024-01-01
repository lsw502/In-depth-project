import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoard, removeBoard } from '../api/boardApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginIdAtom } from '../recoil/Atom';
import InputBoard from '../components/InputBoard';
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
        return <h1>로딩중입니다...</h1>;
    }

    return (
        <Stwapper>
            <Sttitle>{data.title}</Sttitle>
            <Stnickname>{data.nickname}</Stnickname>
            <Stline />
            <div>{data.contents}</div>
            <Spacer></Spacer>

            {userId === data.writer ? (
                <>
                    <button
                        onClick={() => {
                            mutation.mutate(data.id);
                            console.log(data.id);
                            navigate('/board');
                        }}
                    >
                        삭제
                    </button>
                    <button
                        onClick={() => {
                            navigate('/board');
                        }}
                    >
                        돌아가기
                    </button>
                </>
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
    margin: 20px;
    padding: 20px;

    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
        rgba(0, 0, 0, 0.23) 0px 6px 6px;
`;

const Sttitle = styled.div`
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: bold;
`;

const Stnickname = styled.div``;

const Stline = styled.div`
    border: 1px solid rgb(217, 217, 217);
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const Spacer = styled.div``;
