export const useRouter = () => ({
    asPath: '/work',
    defaultLocale: 'lt',
    locale: 'en',
    push: jest.fn(),
    query: { requestId: 'test' },
});
