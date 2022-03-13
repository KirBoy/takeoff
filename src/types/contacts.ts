export enum ContactsActionTypes {
    GET_CONTACTS = 'GET_CONTACTS',
    ADD_CONTACT = 'ADD_CONTACT',
    DELETE_CONTACT = 'DELETE_CONTACT',
    SEARCH_CONTACTS = 'SEARCH_CONTACTS',
    EDIT_COMMENT = 'EDIT_COMMENT',
    IS_FETCHING = 'IS_FETCHING',
}

export type ContactsAction =
    UserContactAction
    | AddUsersContactAction
    | DeleteUsersContactAction
    | EditContactAction
    | SearchUsersContactAction
    | IsFetchingAction

export type UserContactAction = {
    type: ContactsActionTypes.GET_CONTACTS,
    allContacts: UsersContacts[]
}

export type IsFetchingAction = {
    type: ContactsActionTypes.IS_FETCHING,
}

export type EditContactAction = {
    type: ContactsActionTypes.EDIT_COMMENT,
    editedContact: UsersContacts
}

export type AddUsersContactAction = {
    type: ContactsActionTypes.ADD_CONTACT,
    contact: UsersContacts
}

export type DeleteUsersContactAction = {
    type: ContactsActionTypes.DELETE_CONTACT,
    contactId: string
}

export type SearchUsersContactAction = {
    type: ContactsActionTypes.SEARCH_CONTACTS,
    search: string
}


export type UsersContacts = {
    fullName: string
    phone: string
    userId: string,
    id: string
}

export type UpdateContacts = {
    fullName: string
    phone: string
}

export type ContactsInitialState = {
    filteredContacts: UsersContacts[],
    searchFilter: string,
    allContacts: UsersContacts[],
    isFetching:boolean
}
