import {FilterActionTypes} from "./filter-types";
import {IFilterCriteria, IItems} from "../../model/IItems";
import {ActionCreator, AnyAction, Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {FiltersService} from "../../services/filters-service";

export interface IPostByFilterAction {
    type: FilterActionTypes.POSTBYFILTER,
    items: IItems
}

export interface IGetAllItemsAction {
    type: FilterActionTypes.GETALL,
    items: IItems
}

export interface ICreateFilterAction {
    type: FilterActionTypes.CREATEFILTER,
    filter: IFilterCriteria
}

export interface IClearItemsAction {
    type: FilterActionTypes.CLEARITEMS
}

export type FilterActions = IGetAllItemsAction | ICreateFilterAction | IPostByFilterAction | IClearItemsAction;

export interface IFilterState {
    readonly items: IItems;
    readonly filter: IFilterCriteria;
}

export const getItems: ActionCreator<ThunkAction<Promise<AnyAction>, IFilterState, null, IGetAllItemsAction>> = () => {
    return async (dispatch: Dispatch) => {
        // @ts-ignore
        const items: IItems = await FiltersService.getItemsDefault(); // change to API or axios calls
        return dispatch({
            items,
            type: FilterActionTypes.GETALL
        });
    };
}

export const getItemsByFilter: ActionCreator<ThunkAction<Promise<AnyAction>, IFilterState, IFilterCriteria, IPostByFilterAction>> = (filter: IFilterCriteria) => {

    return async(dispatch: Dispatch) => {
        const items: IItems = await FiltersService.getFilterCategories(filter);
        return dispatch({
            items,
            type: FilterActionTypes.POSTBYFILTER
        });
    }
}

export const createFilter: ActionCreator<ICreateFilterAction> = (filter: IFilterCriteria) => ({
    type: FilterActionTypes.CREATEFILTER,
    filter
})


export const clearItems: ActionCreator<IClearItemsAction> = () => ({
    type: FilterActionTypes.CLEARITEMS
});