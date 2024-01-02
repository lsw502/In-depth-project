import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation, useQueryClient } from 'react-query';
import { addBoard } from '../api/boardApi';
import { NicknameAtom, loginIdAtom } from '../recoil/Atom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

function InputBoard() {
    const userId = useRecoilValue(loginIdAtom);
    const userNickname = useRecoilValue(NicknameAtom);
    const queryClient = useQueryClient();
    const [title, setTitle] = useState('');
    const [contents, setContent] = useState('');
    const [image, setImage] = useState('');
    const [show, setShow] = useState(false);
    const mutation = useMutation(addBoard, {
        onSuccess: (data) => {
            console.log('data', data);
            queryClient.invalidateQueries('board');
        }
    });
    // 이미지 업로드하는 방법
    const handleImageAdd = (e) => {
        setImage(e.target.value);
    };
    console.log(image);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    const handleSubmitButtonClick = async () => {
        if (!title || !contents)
            return alert('제목 또는 내용은 필수로 입력해주세요');
        const newBoard = {
            title,
            contents,
            writer: userId,
            nickname: userNickname,
            createdAt: new Date().toLocaleDateString('ko', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        };
        mutation.mutate(newBoard);
        setTitle('');
        setContent('');
        handleClose();
    };

    return (
        <>
            {userId !== '' ? (
                <Stbutton onClick={handleShow}>글쓰기</Stbutton>
            ) : (
                <></>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>애니잇</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>제목</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="제목을 입력해주세요"
                                autoFocus
                                value={title}
                                onChange={handleTitleChange}
                            />
                        </Form.Group>

                        {/* <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <input
                                type="file"
                                accept="image/*"
                                value={image}
                                onChange={handleImageAdd}
                            />
                        </Form.Group> */}
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>내용</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="내용을 입력해주세요"
                                rows={15}
                                value={contents}
                                onChange={handleContentChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="primary" onClick={handleSubmitButtonClick}>
                        등록하기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default InputBoard;

const Stbutton = styled.div`
    margin: 20px auto;
    border-radius: 5px;
    width: 100px;
    padding: 10px;
    cursor: pointer;
    background-color: #e3dede;
    color: black;
    &:hover {
        background-color: #5e5e5f;
        color: white;
    }
`;
