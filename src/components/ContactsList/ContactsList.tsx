import React, {useEffect, useState} from 'react';
import './contacts.css'
import {styled, TextField, alpha, debounce} from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
// @ts-ignore
import InputMask from 'react-input-mask';
import {useActions} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import Button from "@mui/material/Button";
import {UsersContacts} from "../../types/contacts";
import set = Reflect.set;

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginBottom: '15px',
    width: '100%',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

type Contacts = {
    fullName: string,
    phone: string
}

export type EditMode = {
    userId: string,
    id: string
}

const ContactsList: React.FC = () => {
    const [fields, setFieldsValue] = useState<Contacts>({
        fullName: '',
        phone: ''
    })
    const [editContactMode, setEditContactMode] = useState<EditMode | null>(null)
    const [error, setError] = useState<string>('')
    const {fetchUsersContacts, AddUsersContact, DeleteUsersContact, EditUsersContact, SearchUsersContacts} = useActions();

    const id = useTypedSelector(state => state.auth.id)
    const {filteredContacts, allContacts, searchFilter, isFetching} = useTypedSelector(state => state.contacts)

    useEffect(() => {
        fetchUsersContacts(id)
    }, [])

    useEffect(() => {
        SearchUsersContacts(searchFilter)
    }, [allContacts])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError('')
        }

        setFieldsValue(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const deleteContact = (e: React.MouseEvent, id: string) => {
        DeleteUsersContact(id)
    }

    const searchContacts = (e: React.ChangeEvent<HTMLInputElement>) => {
        SearchUsersContacts(e.target.value)
    }

    const debouncedOnChange = debounce(searchContacts, 300)

    const editContact = (e: React.MouseEvent, contact: UsersContacts) => {
        setEditContactMode({
            userId: contact.userId,
            id: contact.id
        })

        setFieldsValue({
            fullName: contact.fullName,
            phone: contact.phone
        })
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!fields.fullName || !fields.phone || fields.phone.includes('_')) {
            setError('error')
            return
        }

        if (!editContactMode) {
            AddUsersContact(fields, id)
        } else {
            EditUsersContact(fields, editContactMode)
        }

        setFieldsValue(
            {
                fullName: '',
                phone: ''
            }
        )

        setEditContactMode(null)
    }

    return (
        <div className='contacts'>

            <form className="contacts_add" onSubmit={onSubmit}>
                <div>
                    <TextField id="outlined-basic"
                               label="Имя и Фамилия"
                               variant="outlined"
                               name='fullName'
                               sx={{
                                   width: '300px',
                                   marginBottom: '15px'
                               }}
                               onChange={onChange}
                               value={fields.fullName}
                    />
                    <InputMask mask="+7(999)-999-99-99" onChange={onChange} value={fields.phone}>
                        {() => <TextField name='phone' type="tel" label="Телефон" sx={{
                            width: '300px'
                        }}/>}
                    </InputMask>
                </div>
                {error && <span className='contacts__error'>Поля не заполнины</span>}
                <Button variant="contained" type='submit' disabled={isFetching}>{editContactMode ? 'Сохранить' : 'Добавить'}</Button>
            </form>

            <div className='contacts__contacts'>
                <Search className='contacts__search' onChange={debouncedOnChange}>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                    />
                </Search>
                {!filteredContacts.length && allContacts.length ? 'Ничего не найдено': ''}
                {!allContacts.length && 'У вас пока нету записей'}
                <List sx={{width: '300px', bgColor: 'background.paper',}}>
                    {filteredContacts?.map(el =>
                        <ListItem sx={editContactMode?.id === el.id ? {
                            borderBottom: '1px solid black',
                            marginBottom: '15px',
                            border: '1px solid #c4c4c4',
                        } : {borderBottom: '1px solid black', marginBottom: '15px'}} key={el.id}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AccountBoxIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={el.fullName} secondary={el.phone}/>
                            <ClearIcon onClick={e => deleteContact(e, el.id)}/>
                            <EditIcon onClick={e => editContact(e, el)}/>
                        </ListItem>
                    )}
                </List>
            </div>
        </div>
    );
};

export default ContactsList;