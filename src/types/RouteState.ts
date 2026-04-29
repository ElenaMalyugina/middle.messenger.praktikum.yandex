export interface RouteState{
    path: string;
    params: Record<string, unknown>;
    queryString: URLSearchParams;
}
