import { useNavigate } from 'react-router-dom';

function CollapsibleExample() {
    const navigate = useNavigate();
    return (
        <>
            <div
                onClick={() => {
                    navigate('/board');
                }}
            >
                게시판
            </div>
            <div>프로필</div>
        </>
    );
}

export default CollapsibleExample;
