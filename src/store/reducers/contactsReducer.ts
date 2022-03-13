import {ContactsAction, ContactsActionTypes, ContactsInitialState} from "../../types/contacts";

const initialState: ContactsInitialState = {
    filteredContacts: [],
    searchFilter: '',
    allContacts: [],
    isFetching: false
}

export const contactsReducer = (state = initialState, action: ContactsAction): ContactsInitialState => {

    switch (action.type) {

        case ContactsActionTypes.GET_CONTACTS:
            return {...state, allContacts: action.allContacts, filteredContacts: action.allContacts}


        case ContactsActionTypes.ADD_CONTACT:
            return {
                ...state,
                isFetching: false,
                allContacts: [action.contact, ...state.allContacts,]
            }

        case ContactsActionTypes.DELETE_CONTACT:
            return {
                ...state,
                allContacts: state.allContacts.filter(el => el.id !== action.contactId)
            }


        case ContactsActionTypes.EDIT_COMMENT:
            return {
                ...state,
                isFetching: false,
                allContacts: state.allContacts.map(el => {
                    if (el.id === action.editedContact.id) {
                        return {
                            ...action.editedContact
                        }
                    } else {
                        return el
                    }
                })
            }

        case ContactsActionTypes.SEARCH_CONTACTS:
            return {
                ...state,
                searchFilter: action.search,
                filteredContacts: state.allContacts.filter(el => el.fullName.toLowerCase().includes(action.search.trim().toLowerCase()))
            }

        case ContactsActionTypes.IS_FETCHING:

            return {...state, isFetching: true}

        default:
            return state
    }
}