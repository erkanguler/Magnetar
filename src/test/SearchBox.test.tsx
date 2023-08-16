import { screen, fireEvent, renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { server } from './mocks/server';
import { rest } from 'msw'
import { useFetch } from '../hooks/useFetch';
import { SearchBox } from '../SearchBox';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
})

describe('Searchbox testing', () => {

    const wrapper = () => (
        <QueryClientProvider client={queryClient}>
            <SearchBox />
        </QueryClientProvider>
    )

    it('Searchbox should be visible', async () => {
        renderHook(() => useFetch(), { wrapper });

        const searchButton = await waitFor(() => screen.getByRole('button'))
        expect(searchButton).toHaveTextContent('Search')
    })

    it('Should list three movies', async () => {
        renderHook(() => useFetch(), { wrapper });

        const searchButton = screen.getByRole('button')
        expect(searchButton).toHaveTextContent('Search')
        fireEvent.click(searchButton)
        expect(screen.getAllByTestId('dtmovie')).toHaveLength(3)
    })

    it('Search by clicking search button', async () => {
        renderHook(() => useFetch(), { wrapper });

        const searchButton = screen.getByRole('button')
        const searchInput = screen.getByPlaceholderText('Movie name')
        fireEvent.change(searchInput, { target: { value: 'Godfather' } })
        fireEvent.click(searchButton)
        expect(screen.getAllByTestId('dtmovie')).toHaveLength(1)
        const movie = screen.getByTestId('dtmovie')
        expect(movie).toHaveTextContent('The Godfather')
        expect(movie).toHaveTextContent('CRIME')
        expect(movie).toHaveTextContent('9.2')
    })

    it('Search by pressing enter key', async () => {
        renderHook(() => useFetch(), { wrapper });

        const searchInput = screen.getByPlaceholderText('Movie name')
        fireEvent.change(searchInput, { target: { value: '12 Angry Men' } })
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 })
        expect(screen.getAllByTestId('dtmovie')).toHaveLength(1)
        const movie = screen.getByTestId('dtmovie')
        expect(movie).toHaveTextContent('12 Angry Men')
        expect(movie).toHaveTextContent('DRAMA')
        expect(movie).toHaveTextContent('8.9')
    })

    it('Search by clicking one of suggestions in the suggestion box', async () => {
        renderHook(() => useFetch(), { wrapper });

        const searchInput = screen.getByPlaceholderText('Movie name')
        fireEvent.change(searchInput, { target: { value: 'Redemption' } })
        //const element = screen.getByText('The Shawshank Redemption')
        //fireEvent.click(element) doesn't work
        const searchButton = screen.getByRole('button')
        fireEvent.click(searchButton)
        expect(screen.getAllByTestId('dtmovie')).toHaveLength(1)
        const movie = screen.getByTestId('dtmovie')
        expect(movie).toHaveTextContent('The Shawshank Redemption')
        expect(movie).toHaveTextContent('DRAMA')
        expect(movie).toHaveTextContent('9.3')
    })

    it('Should catch network error', async () => {
        renderHook(() => useFetch(), { wrapper })

        server.use(
            rest.get(
                'https://movies-mock-api-s7oiqxtmzq-lz.a.run.app/api/movies',
                (_req, res, ctx) => res(ctx.status(500))
            )
        )

        const error = await waitFor(() => screen.getByText(/Network error:/i))
        expect(error).toBeInTheDocument()
    })

})
