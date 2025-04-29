import { View, Text, StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9c2ff'
    }
})

const RepositoryItem = ({repository}) => {
    return (
        <View style={styles.container}>
            <Text>Full Name: {repository.fullName}</Text>
            <Text>Description: {repository.description}</Text>
            <Text>Language: {repository.language}</Text>
            <Text>Stars: {repository.stargazersCount}</Text>
            <Text>Forks: {repository.forksCount}</Text>
            <Text>Reviews: {repository.reviewCount}</Text>
            <Text>Rating: {repository.ratingAverage}</Text>
        </View>
    )
}

export default RepositoryItem