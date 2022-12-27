import Header from "./components/Header";
import Brands from "./components/Brands";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Brands />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
