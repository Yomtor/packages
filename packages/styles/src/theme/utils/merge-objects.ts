import { cloneDeep, mergeWith, isArray, isEqual, uniqWith } from 'lodash'

export const mergeObjects = (...objects: any[]) => {
    if (objects.length === 1) {
        objects.push(cloneDeep(objects[0]))
    }

    return mergeWith({}, ...objects, (obj: any, src: any): any => {
        if (isArray(obj)) {
            return uniqWith(obj.concat(src), isEqual)
        }
    })
}
