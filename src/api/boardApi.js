import axios from 'axios';

// 조회들
const getBoards = async (props) => {
    console.log(props);
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/comments?_page=1`
    );
    // console.log(response.data);
    return response.data;
};

const addBoard = async (newBoard) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, newBoard);
};

// 조회
const getBoard = async (id) => {
    const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/comments/${id}`
    );
    return response.data;
};

// 삭제

const removeBoard = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/comments/${id}`);
};

export { getBoards, getBoard, addBoard, removeBoard };
