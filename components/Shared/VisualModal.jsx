import * as React from "react";
import { Fragment } from "react";
import { Image, View } from "react-native";
import { Modal, Portal, Text, Button, PaperProvider } from "react-native-paper";
import { modalStyles } from "../../styles/modal";
import { color } from "../../constants/colors";
const successIcon = require("../../assets/icons/success.png");

const VisualModal = ({
  chidren,
  modalIsVisible,
  text,
  onDismiss,
  onModalPress,
}) => {
  return (
    <View style={modalStyles.base}>
      <Portal>
        <Modal
          visible={modalIsVisible}
          onDismiss={onDismiss}
          contentContainerStyle={modalStyles.containerStyle}
        >
          <View>
            {chidren}
            <Image source={successIcon} style={modalStyles.image} />
          </View>
          <Text style={{ fontSize: 17, color: color.primary, fontWeight: 600 }}>
            {text}
          </Text>

          <Button
            style={modalStyles.button}
            mode="contained"
            buttonColor={color.primary}
            uppercase
            shouldRasterizeIOS
            onPress={onModalPress}
          >
            Continue
          </Button>
        </Modal>
      </Portal>
    </View>
  );
};

export default VisualModal;
