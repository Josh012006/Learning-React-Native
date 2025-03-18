import Card from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import ThemedText from "@/components/ThemedText";
import { getPokemonId } from "@/functions/pokemons";
import { useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { Text, View, FlexAlignType, StyleSheet, Image, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// export default function Index() {
//   return (
//     // View is like a div and Text is like a p tag
//     // We can't write text if not in the Text tag

//     // We use SafeAreaView to make sure that the content is not hidden by the status bar
//     // We can also use SafeAreaView in the _layout.tsx file
//     <SafeAreaView style={styles.container as {alignItems: FlexAlignType}}>
//       <Text>Edit app/index.tsx to edit this screen.</Text>

//       {/* Link is like an a tag */}
//       <Link href="/about">A propos</Link>
//       <Link href={{pathname: "/pokemon/[id]", params: {id: 3}}}>Pokemon 3</Link>
//     </SafeAreaView>
//   );
// }



export default function Index() {

  const colors = useThemeColors();

  const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery("/pokemon?limit=21");
  const pokemons = data?.pages.flatMap(page => page.results) ?? [];
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint}]}>
      <View style={ styles.header }>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24} />
        <ThemedText variant="headline" color="grayLight">Pokédex</ThemedText>
      </View>
      <Card style={styles.body}>
        <FlatList 
          data = {pokemons} 
          renderItem={({ item }) => (
            <PokemonCard
              id={getPokemonId(item.url)}
              name={item.name}
              style={{ flex: 1/3 }} />
          )} 
          keyExtractor={(item) => item.url}
          numColumns={3}
          columnWrapperStyle={styles.gridGap}
          contentContainerStyle={[styles.gridGap, styles.list]}
          ListFooterComponent={isFetching ? <ActivityIndicator color={colors.tint} /> : null}
          onEndReached={()=>fetchNextPage()}
          />
      </Card>
    </SafeAreaView>
  );
}




// In all the tags, we can write style by using style prop
// We need to be careful because it's a particular way of writing styles
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 4,
    fontFamily: "Times New Roman",
  },

  header :{
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 12
  },

  body: {
    flex: 1
  },
  gridGap: {
    gap: 8
  },
  list: {
    padding: 12
  }
});