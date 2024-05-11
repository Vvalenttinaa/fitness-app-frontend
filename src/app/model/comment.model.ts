import Reply from "./reply.model";

export default interface Comment{
    id: number,
    content: string,
    userUsername: string,
    programId: number,
    replies: Reply[]
}