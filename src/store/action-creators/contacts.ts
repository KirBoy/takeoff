import {Dispatch} from "redux";
import axios from "axios";
import {
    ContactsAction,
    ContactsActionTypes,
    UpdateContacts,
    UsersContacts
} from "../../types/contacts";
import {EditMode} from "../../components/ContactsList/ContactsList";

export const fetchUsersContacts = (userId: string) => {
    return async (dispatch: Dispatch<ContactsAction>) => {
        try {
            const response = await axios.get<UsersContacts[]>('http://localhost:5656/contacts')
            const usersContacts = response.data.filter(el => el.userId == userId)

            if (usersContacts.length) {
                dispatch({type: ContactsActionTypes.GET_CONTACTS, allContacts: usersContacts})
            } else {
                throw new Error()
            }
        } catch (e) {

        }
    }
}

export const AddUsersContact = (data: UpdateContacts, userId: string) => {
    return async (dispatch: Dispatch<ContactsAction>) => {
        dispatch({type: ContactsActionTypes.IS_FETCHING})
        try {
            const response = await axios.post('http://localhost:5656/contacts', {...data, userId: userId})
            dispatch({type: ContactsActionTypes.ADD_CONTACT, contact: response.data})
        } catch (e) {
            alert('something went wrong')
        }
    }
}

export const DeleteUsersContact = (contactId: string) => {
    return async (dispatch: Dispatch<ContactsAction>) => {

        try {
            await axios.delete('http://localhost:5656/contacts/' + contactId)
            dispatch({type: ContactsActionTypes.DELETE_CONTACT, contactId: contactId})
        } catch (e) {
            alert('something went wrong')
        }
    }
}

export const EditUsersContact = (fields: UpdateContacts, contactId: EditMode) => {
    return async (dispatch: Dispatch<ContactsAction>) => {
        dispatch({type: ContactsActionTypes.IS_FETCHING})

        try {
            await axios.patch('http://localhost:5656/contacts/' + contactId.id, {...fields, ...contactId})
            dispatch({type: ContactsActionTypes.EDIT_COMMENT, editedContact: {...fields, ...contactId}})
        } catch (e) {
            alert('something went wrong')
        }
    }
}

export const SearchUsersContacts = (searchFilter: string): ContactsAction => {
    return {type: ContactsActionTypes.SEARCH_CONTACTS, search: searchFilter}
}