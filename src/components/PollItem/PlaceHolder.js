import React from "react";
import { View, Text } from "react-native";
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Progressive,
} from "rn-placeholder";

const PlaceHolder = () => {
  return (
    <View style={{ alignItems: "center", paddingHorizontal: "5%" }}>
      <Placeholder
        Animation={Progressive}
        Left={() => (
          <PlaceholderMedia
            isRound={true}
            style={{ backgroundColor: "#CCC", marginRight: 10 }}
          />
        )}
      >
        <PlaceholderLine width={40} style={{ backgroundColor: "#CCC" }} />
        <PlaceholderLine width={30} style={{ backgroundColor: "#CCC" }} />
      </Placeholder>
      <Placeholder Animation={Progressive} style={{ height: 250 }}>
        <PlaceholderLine
          width={100}
          height={250}
          style={{
            backgroundColor: "#CCC",
            borderRadius: 10,
          }}
        />
      </Placeholder>
      <Placeholder Animation={Progressive} style={{ marginTop: 15 }}>
        <PlaceholderLine width={100} style={{ backgroundColor: "#CCC" }} />
        <PlaceholderLine width={50} style={{ backgroundColor: "#CCC" }} />
        <PlaceholderLine width={70} style={{ backgroundColor: "#CCC" }} />
        <View style={{ alignItems: "center" }}>
          <PlaceholderLine
            width={80}
            height={50}
            style={{ backgroundColor: "#CCC" }}
          />
        </View>
      </Placeholder>
    </View>
  );
};

export default PlaceHolder;
