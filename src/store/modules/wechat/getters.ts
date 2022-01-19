import { userState } from "./store";

const moduleGetter = {
    isTest: (state: userState): boolean => {
        return state.loading;
    }
}
export default moduleGetter;