import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import PlusSVG from '../../../assets/plus.svg';
import DeleteSVG from '../../../assets/delete.svg';
import Colors from '../../../assets/Colors';

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        borderRadius: 15,
        backgroundColor: Colors.SECONDARY_BACKGROUND_COLOR,
        minHeight: 300,
        display: 'flex',
        justifyContent: 'space-between'
    },
    tableHeader: {
        backgroundColor: '#f5f5f5',
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
    },
    tableCell: {
        fontFamily: "nunito-regular",
        width: 'fit-content',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Consumptions = ({ openAddForm, deleteConsumption, consumptions }) => {
    const [page, setPage] = React.useState(0);
    const [from, setFrom] = React.useState(0);
    const [to, setTo] = React.useState(4);

    return (
        <View>
            <DataTable style={styles.container}>
                <View>
                    <DataTable.Header>
                        <DataTable.Title style={styles.tableCell}>Name</DataTable.Title>
                        <DataTable.Title numeric style={styles.tableCell}>Calories</DataTable.Title>
                        <DataTable.Title numeric style={styles.tableCell}>Protein</DataTable.Title>
                        <DataTable.Title numeric style={styles.tableCell}>Fat</DataTable.Title>
                        <DataTable.Title numeric style={styles.tableCell}>Carbs</DataTable.Title>
                        <DataTable.Title style={styles.tableCell}>Amount</DataTable.Title>
                        <DataTable.Title style={styles.tableCell}>
                            <Pressable onPress={openAddForm}>
                                <PlusSVG width={20} height={20} />
                            </Pressable>
                        </DataTable.Title>
                    </DataTable.Header>
                    {consumptions.length ? consumptions.slice(from, to).map((consumption) => (
                        <DataTable.Row key={consumption._id}>
                            <DataTable.Cell style={styles.tableCell}>
                                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{consumption.name}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric style={styles.tableCell}>
                                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{consumption.calories.toFixed(1)}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric style={styles.tableCell}>
                                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{consumption.protein.toFixed(1)}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric style={styles.tableCell}>
                                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{consumption.fat.toFixed(1)}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric style={styles.tableCell}>
                                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{consumption.carbs.toFixed(1)}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell}>
                                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{consumption.unit === 'ml' ? (consumption.amount.toFixed(0)) : consumption.amount.toFixed(1)} {consumption.unit}</Text>
                            </DataTable.Cell>
                            <DataTable.Cell style={styles.tableCell} onPress={() => deleteConsumption(consumption)}>
                                <DeleteSVG width={20} height={20} />
                            </DataTable.Cell>
                        </DataTable.Row>
                    )): null}
                </View>
                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(consumptions.length / 4)}
                    onPageChange={(page) => {
                        setPage(page);
                        setFrom(page * 4);
                        setTo(Math.min((page + 1) * 4, consumptions.length));
                    }}
                    label={`${from + 1}-${to} of ${consumptions.length}`}
                    numberOfItemsPerPage={4}
                    showFastPaginationControls
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>

        </View>
    )
}

export default Consumptions;