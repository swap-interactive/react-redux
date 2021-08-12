import { ActionCreatorsMapObject, Dispatch } from 'redux';
import { FixTypeLater } from '../types';
export declare function whenMapDispatchToPropsIsFunction(mapDispatchToProps: ActionCreatorsMapObject | FixTypeLater): ((dispatch: Dispatch<import("redux").AnyAction>, { displayName }: {
    displayName: string;
}) => {
    (stateOrDispatch: {
        [key: string]: any;
    } | Dispatch<import("redux").AnyAction>, ownProps?: {
        [key: string]: any;
    } | undefined): import("./wrapMapToProps").MapToProps<{
        [key: string]: any;
    }>;
    dependsOnOwnProps: boolean;
    mapToProps(stateOrDispatch: {
        [key: string]: any;
    } | Dispatch<import("redux").AnyAction>, ownProps?: {
        [key: string]: any;
    } | undefined): import("./wrapMapToProps").MapToProps<{
        [key: string]: any;
    }>;
}) | undefined;
export declare function whenMapDispatchToPropsIsMissing(mapDispatchToProps: undefined): ((dispatch: Dispatch<import("redux").AnyAction>) => {
    (): ActionCreatorsMapObject<any> | import("redux").ActionCreator<any> | {
        dispatch?: Dispatch<import("redux").AnyAction> | undefined;
        dependsOnOwnProps?: boolean | undefined;
    };
    dependsOnOwnProps: boolean;
}) | undefined;
export declare function whenMapDispatchToPropsIsObject(mapDispatchToProps: ActionCreatorsMapObject): ((dispatch: Dispatch<import("redux").AnyAction>) => {
    (): ActionCreatorsMapObject<any> | import("redux").ActionCreator<any> | {
        dispatch?: Dispatch<import("redux").AnyAction> | undefined;
        dependsOnOwnProps?: boolean | undefined;
    };
    dependsOnOwnProps: boolean;
}) | undefined;
declare const _default: (typeof whenMapDispatchToPropsIsFunction | typeof whenMapDispatchToPropsIsMissing | typeof whenMapDispatchToPropsIsObject)[];
export default _default;
