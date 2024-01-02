import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// localstorage에 key: userInfo의 value값으로 이메일이 저장됩니다.
const { persistAtom } = recoilPersist({
    key: 'userInfo',
    storage: localStorage // 저장은 여기에 해야지!
});

export const loginIdAtom = atom({
    key: 'loginIdAtom',
    default: '',
    effects_UNSTABLE: [persistAtom]
});

//  localstorage에 key: usernicknameInfo value값으로 닉네임이 저장됩니다.

const { persistAtom: persistNickNameAtom } = recoilPersist({
    key: 'usernicknameInfo',
    storage: localStorage
});

export const NicknameAtom = atom({
    key: 'NicknameAtom',
    default: '',
    effects_UNSTABLE: [persistNickNameAtom]
});
