import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../Color';

export default TodoList = ({ list }) => {
    const completedCount = list.todos.filter(todo => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;
    
    return (
        <View style={ styles.listContainer, {backgroundColor: list.color}}>
            <Text style={styles.listTitle} numberOfLines={1}>
                {list.name}
            </Text>

            <View style={{ alignItems: "center" }}>
                <Text style={ styles.count}> { completedCount }</Text>
                <Text style={ styles.subtitle }>Remaining</Text>
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={ styles.count}>{ remainingCount }</Text>
                <Text style={ styles.subtitle }>Completed</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    listContainer: {
        // paddingVertical: 32,
        // paddingHorizontal: 16,
        // borderRadius: 6,
        // marginHorizontal: 12,
        // alignItems: "center",
        // width: 200,
    },
    listTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18,
        padding: 20,
        width: 200,
    },
    count: {
        fontSize: 40,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        fontWeight: 20,
        fontWeight: "700",
        color: Colors.white
    }
});