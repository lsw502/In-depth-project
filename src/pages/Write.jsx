import ReactQuill, { Quill } from 'react-quill';
import { useState } from 'react';
import { addBoard } from '../api/boardApi';
// import { createPost } from './api/api';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import ImageResize from 'quill-image-resize';
import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
import { loginIdAtom } from '../recoil/Atom';
import { useNavigate } from 'react-router-dom';
Quill.register('modules/ImageResize', ImageResize);

function Write() {
    const navigate = useNavigate();
    const userId = useRecoilValue(loginIdAtom);
    const queryClient = useQueryClient();
    const handleSubmitButtonClick = async () => {
        const newBoard = {
            title,
            content,
            writer: userId
            // nickname
        };
        mutation.mutate(newBoard);
    };
    const mutation = useMutation(addBoard, {
        onSuccess: (data) => {
            console.log('data', data);
            queryClient.invalidateQueries('board');
        }
    });
    const modules = {
        toolbar: {
            container: [
                ['image'],
                [{ header: [1, 2, 3, 4, 5, false] }],
                ['bold', 'underline']
            ]
        },
        /* 추가된 코드 */
        ImageResize: {
            parchment: Quill.import('parchment')
        }
    };
    const [content, setContent] = useState('');
    console.log(content);
    const [title, setTitle] = useState('');
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    // const handleSubmit = async () => {
    //     const date = new Date();
    //     try {
    //         await createPost({
    //             title: title,
    //             content,
    //             date
    //         }).then((res) => console.log(res));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    return (
        <form>
            <div>
                <label htmlFor="title">제목 :</label>
                <StInput
                    type="text"
                    placeholder="제목을 입력해주세요"
                    autoFocus
                    value={title}
                    onChange={handleTitleChange}
                />

                <ReactQuill
                    style={{ width: '800px', height: '600px' }}
                    modules={modules}
                    value={content}
                    onChange={setContent}
                />
            </div>
            <button style={{ marginTop: '50px' }}>취소</button>
            <button
                style={{ marginTop: '50px' }}
                onClick={() => {
                    handleSubmitButtonClick();
                    navigate('/board');
                }}
            >
                등록
            </button>
        </form>
    );
}
export default Write;

const StInput = styled.input`
    margin: 20px;
`;
