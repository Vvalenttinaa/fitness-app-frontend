export default interface StatusRequest{
    programId: number,
    userId: number,
    paymentMethodId: number,
    paid: boolean
}