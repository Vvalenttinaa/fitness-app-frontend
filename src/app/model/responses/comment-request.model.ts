export default interface CommentRequest{
    content: string | null,
    userId: number | undefined,
    programId: number | undefined,
}