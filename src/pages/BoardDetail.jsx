import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBoard, removeBoard } from '../api/boardApi';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginIdAtom } from '../recoil/Atom';
import InputBoard from '../redux/components/InputBoard/InputBoard';

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
        <>
            <div>{data.nickname}</div>
            <div>{data.title}</div>
            <div>{data.contents}</div>
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
        </>
    );
};

export default BoardDetail;
