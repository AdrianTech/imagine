/**
 * Reusable methods for entire application
 */

import { Setup } from "@/interfaces/methods";
import { useEventStore } from "@/stores/event";
import { useTranslationStore } from "@/stores/translation";
import axios, { AxiosRequestHeaders } from "axios";


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


export const convertDate = (date: string, option: string): string => new Date(date).toLocaleString(option);


export const httpRequester = async (setup: Setup): Promise<object> => {
    const instance = axios.create({
        withCredentials: true,
        method: setup.method,
        headers: setup.headers as AxiosRequestHeaders,
    })
    return await instance(setup.path, { data: setup.body });
}

export const handleSubmitData = (data: any): Object | void => {
    Object.keys(data).forEach((key) => {
        if (!data[key]) delete data[key];
    });

    if (!Object.keys(data).length) {
        useEventStore().eventMessageHelper(useTranslationStore().t("Wypełnił przynajmniej jedno pole"), true)
        return false
    }
    return data;
}

export const errorMessagesHelper = (code: number) => {
    const { eventMessageHelper } = useEventStore();
    const { t } = useTranslationStore();

    switch (code) {
        case 403:
            eventMessageHelper(t('Nie masz wystarczających uprawnień'), true)
            break;
        default:
            eventMessageHelper(t('Coś poszło nie tak'), true)
    }
}