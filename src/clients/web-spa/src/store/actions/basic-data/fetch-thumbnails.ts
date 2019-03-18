import { ThunkAction, apiClient } from "../common";
import { selectBaiscDataLoading, selectArticle } from "../../selectors";



type ThumbnailsDto = string[];

export interface FetchThumbnailsBeginAction{
    type: 'FETCH_THUMBNAILS_BEGIN';
    ids: number[];
    width: number;
}

export interface FetchThumbnailsSuccessAction{
    type: 'FETCH_THUMBNAILS_SUCCESS';
    ids: number[];
    width: number;
    data: ThumbnailsDto;
}

export interface FetchThumbnailsErrorAction{
    type: 'FETCH_THUMBNAILS_ERROR';
    ids: number[];
    width: number;
}

export type FetchThumbnailsActions = FetchThumbnailsBeginAction | FetchThumbnailsSuccessAction | FetchThumbnailsErrorAction;


export const fetchThumbnails = (ids: number[], width: number) : ThunkAction => (dispatch, getState) => {
    // only load those that do not have a thumbnail yet
    const actualIds = ids.filter(i => {
        const article = selectArticle(getState(), i);
        return article !== undefined && article.thumbnailLocation === undefined;
    });
    if(actualIds.length === 0)
        return;

    dispatch(createBeginAction(actualIds, width));
    apiClient.get<ThumbnailsDto>(`/v1/basic-data/thumbnails?${actualIds.map(i => "ids="+i).join('&')}&targetWidth=${width || 200}`)
        .then(response => {
            dispatch(createSuccessAction(actualIds, width, response.data));
        })
        .catch(() => {
            dispatch(createErrorAction(actualIds, width));
        });
}

function createBeginAction(ids: number[], width: number) : FetchThumbnailsBeginAction{
    return {
        type: 'FETCH_THUMBNAILS_BEGIN',
        ids,
        width
    };
}
function createSuccessAction(ids: number[], width: number, data: ThumbnailsDto) : FetchThumbnailsSuccessAction{
    return {
        type: 'FETCH_THUMBNAILS_SUCCESS',
        ids,
        width,
        data
    };
}
function createErrorAction(ids: number[], width: number) : FetchThumbnailsErrorAction{
    return {
        type: 'FETCH_THUMBNAILS_ERROR',
        ids,
        width
    };
}