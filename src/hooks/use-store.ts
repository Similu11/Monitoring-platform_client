import { useStore } from "vuex";
import { State } from "@/store";
import { Getters } from '@/hooks/utils';
interface IUserWcStore {
    state: State,
    getters: Getters
}
const useWcStore = (): IUserWcStore => {
    const { state, getters }: IUserWcStore = useStore<State>();
    return { state, getters }
};
export { useWcStore };
export default useWcStore;