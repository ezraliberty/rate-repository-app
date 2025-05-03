import { useApolloClient, useMutation } from "@apollo/client"
import { AUTHENTICATE_USER } from "../graphql/mutations"
import useAuthStorage from "./useAuthStorage"

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const [mutate, result] = useMutation(AUTHENTICATE_USER)
    const apolloClient = useApolloClient()

    const signIn = async ({username, password}) => {
        const { data } = await mutate({
            variables: {
                credentials: {
                    username,
                    password
                }
            }
        })

        if (data) {
            await authStorage.setAccessToken(data.authenticate.accessToken)
            apolloClient.resetStore()
            return data.authenticate.accessToken
        }

        return null
    }

    return [signIn, result]
}

export default useSignIn;

// import { useMutation } from "@apollo/client"
// import { AUTHENTICATE_USER } from "../graphql/mutations"

// const useSignIn = () => {
//     const [mutate, result] = useMutation(AUTHENTICATE_USER)

//     const signIn = async ({username, password}) => {
//         const result = await mutate({
//             variables: {
//                 credentials: {
//                     username,
//                     password
//                 }
//             }
//         })

//         if (result) {
//             console.log("result in usesignin", result)
//             console.log("data in usesignin", result.authenticate.accessToken)
//             return result.authenticate.accessToken
//         }

//         return null
//     }

//     // console.log("result in useSignIn", result)

//     return [signIn, result]
// }

// export default useSignIn;