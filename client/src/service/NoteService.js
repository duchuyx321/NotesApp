import * as request from "~/util/httpsRequest";

// create note
export const create = async (title, content) => {
    try {
        const res = await request.post("note/create", { title, content });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

// delete note
export const deleteNote = async (noteIds = []) => {
    try {
        const res = await request.del("note/delete", { noteIds });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
