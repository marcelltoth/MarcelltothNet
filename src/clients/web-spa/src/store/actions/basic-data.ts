import { TagDto } from "../state/tags";
import { ArticleDto } from "../state/articles";
import { ThunkAction, apiClient } from "./common";
import { selectBaiscDataLoading } from "../selectors";



interface BasicDataDto{
    tags: ReadonlyArray<TagDto>;
    articles: ReadonlyArray<ArticleDto>;
}


export interface FetchBasicDataBeginAction{
    type: 'FETCH_BASIC_DATA_BEGIN';
}

export interface FetchBasicDataSuccessAction{
    type: 'FETCH_BASIC_DATA_SUCCESS';
    data: BasicDataDto;
}

export interface FetchBasicDataErrorAction{
    type: 'FETCH_BASIC_DATA_ERROR';
}

export type FetchBasicDataActions = FetchBasicDataBeginAction | FetchBasicDataSuccessAction | FetchBasicDataErrorAction;


export const fetchBasicData = () : ThunkAction => (dispatch, getState) => {
    if(!selectBaiscDataLoading(getState())){
        dispatch(createBeginAction());
        apiClient.get<BasicDataDto>('/v1/basic-data')
            .then(response => {
                dispatch(createSuccessAction(response.data));
            })
            .catch(() => {
                dispatch(createErrorAction());
            });
    }
}

function createBeginAction() : FetchBasicDataBeginAction{
    return {
        type: 'FETCH_BASIC_DATA_BEGIN'
    };
}
function createSuccessAction(data: BasicDataDto) : FetchBasicDataSuccessAction{
    return {
        type: 'FETCH_BASIC_DATA_SUCCESS',
        data
    };
}
function createErrorAction() : FetchBasicDataErrorAction{
    return {
        type: 'FETCH_BASIC_DATA_ERROR'
    };
}