
import { useApi } from "@/hooks";
import { ref, Ref } from 'vue';
export interface Myest {
    current_user_url: string;
    current_user_authorizations_html_url: string;
    authorizations_url: string;
    code_search_url: string;
    commit_search_url: string;
    emails_url: string;
    emojis_url: string;
    events_url: string;
    feeds_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    hub_url: string;
    issue_search_url: string;
    issues_url: string;
    keys_url: string;
    label_search_url: string;
    notifications_url: string;
    organization_url: string;
    organization_repositories_url: string;
    organization_teams_url: string;
    public_gists_url: string;
    rate_limit_url: string;
    repository_url: string;
    repository_search_url: string;
    current_user_repositories_url: string;
    starred_url: string;
    starred_gists_url: string;
    user_url: string;
    user_organizations_url: string;
    user_repositories_url: string;
    user_search_url: string;
}
export type usableMyTest = Promise<{ myTest: Ref<Myest[] | undefined> }>;
export default async function useMyTest(): usableMyTest {
    const { response: myTest, request } = useApi<Myest[]>('https://api.github.com/');
    const loaded = ref(false);
    if (!loaded.value) {
        await request();
        loaded.value = true;
    }
    return { myTest };
}
