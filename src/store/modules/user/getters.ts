import { userState } from "./store";

const moduleGetter = {
    isLogin: (state: userState): boolean => {
        return state.loading;
    }
}
export default moduleGetter;