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
// edit not (find note through slug)
export const editNote = async (slug) => {
    try {
        const res = await request.get("note/edit", {
            params: {
                slug,
            },
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

// update note
export const updateNote = async (noteId, title, content) => {
    try {
        const res = await request.put(`note/update/${noteId}`, {
            title,
            content,
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

// delete note
export const deleteNote = async (noteId) => {
    try {
        const res = await request.del("note/deleteNote", { noteId });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

// delete notes
export const deleteNotes = async (noteIds = []) => {
    try {
        const res = await request.del("note/delete", { data: { noteIds } });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

// destroy note

// RestoreNotes note [find note with delete]
export const restoreNotes = async () => {
    try {
        const res = await request.get("note/restoreNotes");
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
