import { MapToProps } from './wrapMapToProps';
export declare function whenMapStateToPropsIsFunction(mapStateToProps?: MapToProps): ((dispatch: import("redux").Dispatch<import("redux").AnyAction>, { displayName }: {
    displayName: string;
}) => {
    (stateOrDispatch: {
        [key: string]: any;
    } | import("redux").Dispatch<import("redux").AnyAction>, ownProps?: {
        [key: string]: any;
    } | undefined): MapToProps<{
        [key: string]: any;
    }>;
    dependsOnOwnProps: boolean;
    mapToProps(stateOrDispatch: {
        [key: string]: any;
    } | import("redux").Dispatch<import("redux").AnyAction>, ownProps?: {
        [key: string]: any;
    } | undefined): MapToProps<{
        [key: string]: any;
    }>;
}) | undefined;
export declare function whenMapStateToPropsIsMissing(mapStateToProps?: MapToProps): ((dispatch: import("redux").Dispatch<import("redux").AnyAction>) => {
    (): import("redux").ActionCreatorsMapObject<any> | import("redux").ActionCreator<any> | {
        dispatch?: import("redux").Dispatch<import("redux").AnyAction> | undefined;
        dependsOnOwnProps?: boolean | undefined;
    };
    dependsOnOwnProps: boolean;
}) | undefined;
declare const _default: (typeof whenMapStateToPropsIsFunction | typeof whenMapStateToPropsIsMissing)[];
export default _default;
