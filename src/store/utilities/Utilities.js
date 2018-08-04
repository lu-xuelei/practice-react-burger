export const updateObject = (oldObject, updatedProperteis) => {
    return {
        ...oldObject,
        ...updatedProperteis
    }
}