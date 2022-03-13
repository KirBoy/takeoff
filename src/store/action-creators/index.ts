import * as AuthActionCreators from './auth'
import * as AuthContactsCreators from './contacts'


export default {
    ...AuthActionCreators,
    ...AuthContactsCreators
}