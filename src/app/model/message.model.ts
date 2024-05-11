import { User } from "./user.model"

export default interface Message{
    id:number
    content: String
    dateAndTime: string
    sender: User //TO DO VRATITI NA USER
    receiver: User
}