import React from 'react';
import { StyleSheet, Text, View, FlatList, Pressable, Image, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import movies from '../data/movies'; // Assuming you have a movies data file
import Header from './Header';

interface Movie {
    name: string;
    image: string;
    language: string;
    genre: string;
}

interface MovieCardsProps {
    movies: Movie[];
}

const MovieCards: React.FC<MovieCardsProps> = ({ movies }) => {
    const navigation = useNavigation();

    const renderItem: ListRenderItem<Movie> = ({ item }) => (
        <Pressable style={styles.pressable}>
            <Image style={styles.image} source={{ uri: item.image }} />
            <Text style={styles.title}>
                {item.name.substr(0, 16)}
            </Text>
            <Text style={styles.language}>
                U/A • {item.language}
            </Text>
            <Text style={styles.genre}>
                {item.genre}
            </Text>
            <Pressable
                onPress={() => navigation.navigate("Movies", {
                    name: item.name,
                    image: item.image,
                })}
                style={styles.bookButton}
            >
                <Text style={styles.bookButtonText}>BOOK</Text>
            </Pressable>
        </Pressable>
    );

    return (
        <View>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                ListHeaderComponent={Header}
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
};

export default MovieCards;

const styles = StyleSheet.create({
    pressable: {
        margin: 10,
        marginHorizontal: 15,
    },
    image: {
        aspectRatio: 2 / 3,
        height: 240,
        borderRadius: 6,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        width: 170,
        marginTop: 10,
    },
    language: {
        marginTop: 4,
        fontSize: 15,
        color: "gray",
    },
    genre: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: "500",
    },
    bookButton: {
        backgroundColor: "#ffc40c",
        padding: 10,
        borderRadius: 6,
        marginRight: 10,
        width: 100,
        marginTop: 10,
    },
    bookButtonText: {
        fontSize: 14,
        fontWeight: "500",
        textAlign: "center",
    },
});
