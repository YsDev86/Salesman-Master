import { apiSlice } from '../api/apiSlice';

export const userSliceApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.mutation({
			query: () => ({
				url: `/users/me`,
				method: 'GET',
			}),
		}),
		getCurrentUser: builder.query({
			query: () => ({
				url: `/users/me`,
				method: 'GET',
			}),
		}),
		getUserEmployee: builder.query({
			query: () => ({
				url: `/users/employees`,
				method: 'GET',
			}),
		}),
		getUserEmployeeWithId: builder.query({
			query: (id) => ({
				url: `/users/employees/${id}`,
				method: 'GET',
			}),
		}),
		submitApplication: builder.mutation({
			query: (data) => ({
				url: `/users/submitApplication`,
				method: 'POST',
				body: data,
			}),
		}),
		payoutMethod: builder.mutation({
			query: (data) => ({
				url: `/users/payoutMethod`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Payouts'],
		}),
		deletePayoutMethod: builder.mutation({
			query: (id) => ({
				url: `/users/payoutMethod/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Payouts'],
		}),
		getPayoutMethod: builder.query({
			query: () => ({
				url: `/users/payoutMethod`,
				method: 'GET',
			}),
			providesTags: ['Payouts'],
		}),
		updateUserCurrency: builder.mutation({
			query: (data) => ({
				url: `/users/currency`,
				method: 'PUT',
				body: data,
			}),
		}),
		updateNotificationSettings: builder.mutation({
			query: (data) => ({
				url: `/users/notifications`,
				method: 'POST',
				body: data,
			}),
			invalidatesTags: ['Notifications'],
		}),
		getNotificationSettings: builder.query({
			query: (expoPushToken) => ({
				url: `/users/notifications/${expoPushToken}`,
				method: 'GET',
			}),
			providesTags: ['Notifications'],
		}),
		getReferralCode: builder.query({
			query: (period) => ({
				url: !period ? `/users/referral` : `/users/referral?period=${period}`,
				method: 'GET',
			}),
		}),
	}),
	overrideExisting: true,
});

export const {
	useSubmitApplicationMutation,
	useGetUserMutation,
	useGetCurrentUserQuery,
	usePayoutMethodMutation,
	useGetPayoutMethodQuery,
	useDeletePayoutMethodMutation,
	useUpdateUserCurrencyMutation,
	useGetUserEmployeeQuery,
	useGetUserEmployeeWithIdQuery,
	useUpdateNotificationSettingsMutation,
	useGetNotificationSettingsQuery,
	useGetReferralCodeQuery,
} = userSliceApi;
