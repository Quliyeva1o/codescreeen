import { nanoid } from 'nanoid'

class User {
    constructor(email, password, firstName, lastName, mobile, birthDate, postCode, gender, terms) {
        this.id = nanoid() 
        this.email = email,
            this.password = password,
            this.firstName = firstName,
            this.lastName = lastName,
            this.mobile = mobile,
            this.birthDate = birthDate,
            this.postCode = postCode,
            this.gender = gender,
            this.terms = terms,
            this.tickets = []
    }
}
export default User  