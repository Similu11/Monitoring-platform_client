import { ref, Ref } from 'vue';
export type ApiRequest = () => Promise<void>;
export interface UsableApi<T> {
    response: Ref<T | undefined>;
    request: ApiRequest
}
function useApi<T>(url: RequestInfo, options?: RequestInit) {
    const response: Ref<T | undefined> = ref();
    const request = async () => {
        const res = await fetch(url);
        const data = await res.json();
        response.value = data;
    };
    return {
        response,
        request
    }
}
export { useApi };
export default useApi; //https://api.github.com/