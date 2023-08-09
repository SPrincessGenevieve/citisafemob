import React, { useState } from "react";
import { Modal, Portal, Text, Button, PaperProvider, View } from "react-native-paper";


function Records(props) {
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true)
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return(
        <PaperProvider>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
            <Text>Example Modal.  Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <Button style={{marginTop: 30}} onPress={showModal}>
          1234 ABCD
        </Button>
      </PaperProvider>
    )
}

export default Records;