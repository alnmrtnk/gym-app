import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DataTable } from 'react-native-paper';
import Colors from '../../assets/Colors';

const styles = StyleSheet.create({
  container: {
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
      display: 'flex',
      width: 'fit-content',
      justifyContent: 'center',
      alignItems: 'center',
  },
  button: {
    padding: 2, 
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.BUTTONS_BACKGROUND_COLOR,
    borderRadius: 5, 
  },
  buttonText: {
    color: '#ffffff',  
    fontFamily: "nunito-regular",
    fontSize: 12,
  },
  selectedRow: {
    backgroundColor: Colors.PRIMARY_COLOR,
  }
});

const ProductsContainer = ({ products, productId, setProductId }) => {
  const [page, setPage] = React.useState(0);
  const [from, setFrom] = React.useState(0);
  const [to, setTo] = React.useState(8);

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
            </DataTable.Title>
          </DataTable.Header>
          {products.length ? products.slice(from, to).map((product) => (
           <DataTable.Row key={product._id} style={product._id === productId ? styles.selectedRow : null}>

              <DataTable.Cell style={styles.tableCell}>
                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{product.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.tableCell}>
                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{product.calories}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.tableCell}>
                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{product.protein}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.tableCell}>
                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{product.fat}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={styles.tableCell}>
                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{product.carbs}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell}>
                <Text style={{ fontFamily: "nunito-regular", fontSize: 12, height: 'fit-content' }}>{product.amount} {product.unit}</Text>
              </DataTable.Cell>
              <TouchableOpacity style={styles.button} onPress={() => setProductId(product._id)}>
                  <Text style={styles.buttonText}>Select</Text>
                </TouchableOpacity>
            </DataTable.Row>
          )) : null}
        </View>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(products.length / 8)}
          onPageChange={(page) => {
            setPage(page);
            setFrom(page * 8);
            setTo(Math.min((page + 1) * 8, products.length));
          }}
          label={`${from + 1}-${to} of ${products.length}`}
          numberOfItemsPerPage={8}
          showFastPaginationControls
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>

    </View>
  )
}

export default ProductsContainer