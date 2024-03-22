import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TableItem = ({ data }) => (
    <View style={styles.row}>
        {data.map((item, index) => (
            <Text key={index} style={styles.cell}>{item}</Text>
        ))}
    </View>
);

const TableView = ({ headers, rows }) => (
    <View style={styles.container}>
        <TableItem data={headers} />
        {rows.map((rowData, index) => (
            <TableItem key={index} data={rowData} />
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 0,
        borderBottomColor: '',
        paddingVertical: 10,
        justifyContent: "space-between"
    },
    cell: {
        flex: 1,
        textAlign: '',
        justifyContent: "space-between"
    },
});

export default TableView;
