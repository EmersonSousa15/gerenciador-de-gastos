import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Home } from "./pages"

const client = new QueryClient()

function App() {

  // Renderiza a aplicação, utiliza os providers para compartilhar o client do react-query
  return (
    <QueryClientProvider client={client}>
        <Home />
    </QueryClientProvider>

  )
}

export default App
