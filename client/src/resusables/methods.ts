/**
 * Reusable methods for entire application
 */

import axios from "axios";

/**
 * This fuction checks if the element exists in the given array
 * @param array 
 * @param id 
 * @returns boolean
 */
export const checkIfExist = (array: Array<any>, id: number | string): boolean => array.some((obj: any) => obj.id === id)

/**
 * Get a dialog html element and show or hide it
 * @param bool boolean
 * @returns 
 */
export const dialog = (bool: boolean, classname: string): HTMLElement => {
    const dialog = (<HTMLElement>document.querySelector(`.${classname}`));
    // @ts-ignore
    if (bool) return dialog?.showModal();
    // @ts-ignore
    return dialog.close();
}


export const getSingleItem = async (id: number | string, path: string, data?: object[]) => {

    if (data && Object.keys(data || {}).length) {
        return data.find((item: any) => item.id === id)
    }

    return axios.get(path, { withCredentials: true }).then((res) => res.data)
}


export const convertDate = (date: string, option: string): string => new Date(date).toLocaleString(option)