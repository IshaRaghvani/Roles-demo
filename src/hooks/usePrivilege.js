// usePrivilege.js
import { useUser } from "../context/UserContext";

const usePrivilege = () => {
    const { userInfo } = useUser();

    const hasPrivilege = (privilege) => {
        return userInfo?.privileges[privilege] === true;
    };

    return { hasPrivilege };
};

export default usePrivilege;
