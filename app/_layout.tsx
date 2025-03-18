import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";


const queryClient = new QueryClient();




// Ce fichier englobe l'ensemble des éléments qui sont au même niveau ou à l'intérieur
// Notons qu'on peut aussi définir des layouts dans les sous-dossiers

export default function RootLayout() {
  // Le composant Stack est un composant qui permet de gérer les routes
  // Il permet de gérer les routes de manière simple. Il précise qu'on utilisera une navigation en stack
  // C'est-à-dire qu'on empile les écrans les uns sur les autres

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false
        }}
      />
    </QueryClientProvider>
  )

}
