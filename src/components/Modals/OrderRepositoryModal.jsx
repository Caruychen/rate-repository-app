import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Text from '../Text';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  picker: {
    width: 350
  },
  button: {
    marginBottom: 20
  }
});

const OrderRepositoryModal = ({ visibility, setModalVisible, orderPrinciple, setOrderPrincple, principles }) => {
  return (
    <Modal
      transparent="true"
      visible={visibility}
      onRequestClose={() => {
        setModalVisible(!visibility);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Picker
            selectedValue={orderPrinciple}
            onValueChange={(itemValue) => setOrderPrincple(itemValue)}
            style={styles.picker}
          >
            {principles.map((principle, index) =>
              <Picker.Item key={index} label={principle.label} value={index} />
            )}
          </Picker>
          <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
            <Text fontWeight="bold" fontSize="subheading" buttonStyle="primary">Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default OrderRepositoryModal;