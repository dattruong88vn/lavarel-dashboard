import _ from 'lodash';

export const transformWithKeyMap = (array: any[], keyMap: { [x: string]: unknown; }) => {
    return array.map(function(obj) {
        return _.mapKeys(obj, function(value, key) {
            return keyMap[key];
        });
    });
}

export const transformSuggestionToTag = (array: any[], keyMap: { [x: string]: unknown; }) => {
    return array.map(function(obj) {
        return {
            categoryId: obj.categoryId,
            comments: obj.comments.map(function(obj2: any) {
                delete obj2.commentUsed;
                delete obj2.createdDate;
                delete obj2.unsignedComment;
                return _.mapKeys(obj2, function(value, key) {
                    return keyMap[key];
                });
            })
        }

    });
}

