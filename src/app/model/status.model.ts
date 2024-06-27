import PaymentMethod from "./paymentmethod.model";
import { Program } from "./program.model";
import { User } from "./user.model";

export default interface Status{
    createdAt: string,
    programId: number,
    userId: number,
    paymentMethodId: number,
    paid: boolean,
    id: number,
    programByProgramId:Program,
    userByUserId:User
    paymentMethodByPaymentMethodId:PaymentMethod,
    paymentMethodName: string,
    state: String
}