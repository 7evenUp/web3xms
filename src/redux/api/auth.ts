import { api } from "./core"

export interface WalletReqParams {
  address: string
  signature: string
  message: string
  email?: string
  profile_username?: string
  referral_code?: string
  redirect_url?: string
  utmData?: string
}

export interface MailRegParams {
  email: string
  profile_username: string
  referral_code?: string
  redirect_url: string
  utmData?: string
}

type AuthTokensResponse = { accessToken: string; refreshToken: string }

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    obtain: build.mutation<AuthTokensResponse, { idToken: string }>({
      query: ({ idToken }) => ({
        url: "api/token/obtain",
        method: "GET",
        headers: { Authorization: idToken },
      }),
    }),
    refresh: build.mutation<AuthTokensResponse, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: "api/token/refresh",
        method: "GET",
        headers: { Authorization: refreshToken },
      }),
    }),
    // ====================================================
    // requests for <id-dev>.crypton.xyz
    // ====================================================
    getIdToken: build.mutation<{ token: string }, void>({
      query: (body) => ({
        url: `api/v1/users/get-jwt/`,
        method: "GET",
        body,
      }),
    }),
    checkIdToken: build.query<{ token: string }, void>({
      query: () => ({
        url: `api/v1/users/get-jwt/`,
        method: "GET",
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: `api/v1/users/logout/`,
        method: "GET",
      }),
    }),
    authByWallet: build.mutation<void, WalletReqParams>({
      query: (body) => ({
        url: "api/v1/users/authenticate-by-wallet/",
        method: "POST",
        body,
      }),
    }),
    registerByWallet: build.mutation<void, WalletReqParams>({
      query: (body) => ({
        url: "api/v1/users/register-web-wallet/",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        code: response.data?.code,
      }),
    }),
    registerByWalletMobile: build.mutation<void, WalletReqParams>({
      query: (body) => ({
        url: "api/v1/users/register-web-wallet/?use_verification_code=true",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        code: response.data?.code,
      }),
    }),
    login: build.mutation<void, { email: string; redirect_url: string }>({
      query: (body) => ({
        url: "api/v1/users/login/",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        message: response.data?.detail,
      }),
    }),
    loginMobile: build.mutation<void, { email: string; redirect_url: string }>({
      query: (body) => ({
        url: "api/v1/users/login/?use_verification_code=true",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        message: response.data?.detail,
      }),
    }),
    authMobile: build.mutation<void, { code: string }>({
      query: ({ code }) => ({
        url: `api/v1/users/authenticate/?code=${code}`,
        method: "GET",
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        message: response.data?.detail,
      }),
    }),
    register: build.mutation<void, MailRegParams>({
      query: (body) => ({
        url: "api/v1/users/register-web/",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        message: response.data?.detail,
      }),
    }),
    registerMobile: build.mutation<void, MailRegParams>({
      query: (body) => ({
        url: "api/v1/users/register-web/?use_verification_code=true",
        method: "POST",
        body,
      }),
      transformErrorResponse: (response) => ({
        status: response.status,
        // @ts-expect-error No-Error-Types
        message: response.data?.detail,
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetIdTokenMutation,
  useCheckIdTokenQuery,
  useLazyCheckIdTokenQuery,
  useLogoutMutation,
  useObtainMutation,
  useRefreshMutation,
  useLoginMutation,
  useLoginMobileMutation,
  useAuthMobileMutation,
  useRegisterMutation,
  useRegisterMobileMutation,
  useAuthByWalletMutation,
  useRegisterByWalletMutation,
  useRegisterByWalletMobileMutation
} = authApi
