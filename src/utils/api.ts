import {TodoType} from "../screens/sandBox";

export async function getApi<T>(method: string): Promise<T> {
    const result = await fetch(`/api/${method}`);
    if (result.status !== 200) {
        throw Error(result.statusText);
    }
    return await result.json();
}

export async function postApi<T>(method: string, body: any): Promise<T> {
    const result = await fetch(`api/${method}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    });

    if (result.status !== 200) {
        throw Error(result.statusText);
    }
    return await result.json();
}

export const getMainHeader = async (): Promise<string> => {
    try {
        const response = await getApi<{ text: string }>('headerText');
        return response.text;
    } catch (e) {
        return `server error ${e}`
    }
};

export const getMainPost = async (param: {text: string}): Promise<string> => {
    const response = await postApi<{text: string}>('headerPost', {param});
    return response.text;
};

export const getTodos = async (): Promise<Array<TodoType>> => {
    try {
        const response = await getApi<{ todos: Array<TodoType> }>('getTodos');
        return response.todos;
    } catch (e) {
        return [{id: 0, text: `server error ${e}`, checked: false}]
    }
};

export const setTodos = async (param: {todosArray: Array<TodoType>}): Promise<Array<TodoType>> => {
    const response = await postApi<{todos: Array<TodoType>}>('setTodos', {param});
    return response.todos;
};