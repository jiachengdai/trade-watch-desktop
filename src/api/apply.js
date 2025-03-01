import request from '@/utils/request.js'
export const newApplyService = (
    file,
    currentItem,
    selectedAlgorithm,
    allowDataRecord
) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('currentItem', currentItem);
    formData.append('multialgo', selectedAlgorithm);
    formData.append('datawrite', allowDataRecord);

    return request.post('/apply/new', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
